import pprint
from genie.libs.parser.utils import get_parser_commands
from nornir_netmiko.tasks import netmiko_send_command,netmiko_send_config
from nornir_utils.plugins.tasks.data import load_yaml
from nornir_jinja2.plugins.tasks import template_file
import logging
import threading
from typing import List, cast
from collections import OrderedDict
import json
import re
import math
import networkx as nx
from nornir.core.task import AggregatedResult, MultiResult, Result
from genie.conf import Genie
import pprint



ip_list = []
duplicates = {}
target_list = []
failed_list = []
final_string= ""
topology={}
interfaces = {}


LOCK = threading.Lock()



def send_show_command(task,command):
    
    result = task.run(
        task=netmiko_send_command,
        command_string=command,
        use_genie=True
        # use_textfsm=True,
        # //"show ip interface br"
    )
    task.host["facts"] = result.result



def show_ip_int_br(task):
    interfaces_result = task.run(
        task=netmiko_send_command,
        command_string="show ip interface brief",
        use_genie=True
        # use_textfsm=True,
        # //"show ip interface br"
    )
    task.host["facts"] = interfaces_result.result

def get_interfaces_dict(task):
    interfaces_result = task.run(
        task=netmiko_send_command,
        command_string="show ip interface brief",
        use_genie=True
        # use_textfsm=True,
        # //"show ip interface br"
    )
    parsed_interfaces_result = interfaces_result.result

    for intf_name, intf_info in parsed_interfaces_result['interface'].items():
        ip_address = intf_info.get('ip_address', None)
        if ip_address is not None:
            version_result = task.run(
                task=netmiko_send_command,
                command_string="show version",
                use_genie=True
            )
            task.host[
                "verfacts"
            ] = version_result.result
            serial = task.host["verfacts"]['version']['chassis_sn']
            data = task.host.data
            interfaces[ip_address] = {
                "hostname": task.host["verfacts"]['version']['hostname'],
                "intf": intf_name,
                "serial": serial,
                "primaryIP": task.host.hostname
            }
        else:
            # Check for VLAN interfaces
            for vlan_id, vlan_info in intf_info.get('vlan_id', {}).items():
                ip_address = vlan_info.get('ip_address', None)
                if ip_address is not None:
                    interfaces[ip_address] = intf_name

    # Print the interface names and IP addresses
    for ip_address, intf_name in interfaces.items():
        print(f"Interface name: {intf_name}, IP address: {ip_address}")




def get_all_ip(task):
    """
    Parse IP addresses from all interfaces and append to ip_list
    """
    response = task.run(
        task=netmiko_send_command,
        command_string="show ip interface brief",
        use_genie=True
    )
    task.host["facts"] = response.result
    interfaces = task.host["facts"]
    for intf in interfaces:
        try:
            ip_key = interfaces[intf]["ipv4"]
            for ip in ip_key:
                ip_addr = ip_key[ip]["ip"]
                ip_list.append(ip_addr)
        except KeyError:
            pass


def locate_ip(task, targets):
    """
    Pull all interfaces information
    Identify the interface and Device configured with duplicate address
    """
    response = task.run(
        task=netmiko_send_command,
        command_string="show interfaces",
        use_genie=True
    )
    task.host["facts"] = response.result
    interfaces = task.host["facts"]
    for intf in interfaces:
        try:
            ip_key = interfaces[intf]["ipv4"]
            for ip in ip_key:
                ip_addr = ip_key[ip]["ip"]
                if ip_addr in targets:
                    version_result = task.run(
                        task=netmiko_send_command,
                        command="show version",
                        use_genie=True
                    )
                    task.host[
                        "verfacts"
                    ] = version_result.result
                    serial = task.host["verfacts"]['version']['chassis_sn']
                    data = task.host.data
                    duplicates = {
                        "host": task.host,
                        "intf": intf,
                        "ip_address": ip_addr,
                        "serial": serial,
                        "hostname": task.host.hostname
                    }
                    for k, v in data.items():
                        if "facts" not in k:
                            duplicates[k] = v

        except KeyError:
            pass


def get_loopback_ip(task):
    result = task.run(task=netmiko_send_command,
                      command="show ip interface brief", use_genie=True)
    task.host["facts"] = result.result
    interfaces = task.host["facts"]["interface"]
    for intf in interfaces:
        if intf.startswith("Loop"):
            ip_addr = interfaces[intf]["ip_address"]
            target_list.append(ip_addr)


def ping_test(task, sorted_list):
    for ip_address in sorted_list:
        result = task.run(task=netmiko_send_command,
                          command="ping " + ip_address)
        response = result.result
        if not "!!!" in response:
            failed_list.append({"host": task.host, "ip_address": ip_address})


def load_ospf(task):
    data = task.run(task=load_yaml,file=f'../host_vars/{task.host}.yaml')
    task.host["OSPF"] = data.result["OSPF"]
    r = task.run(task=template_file, template="ospf.j2", path="../templates")
    task.host["config"] = r.result
    output = task.host["config"]
    send = output.splitlines()
    task.run(task=netmiko_send_config, name="zeroTouch command", config_commands=send)



def show_ip_ospf_database_router(task):
    interfaces_result = task.run(
        task=netmiko_send_command,
        command_string="show ip ospf database router",
        use_genie=True
        # use_textfsm=True,
        # //"show ip interface br"
    )
    task.host["facts"] = interfaces_result.result

interface_full_name_map = {
    'Eth': 'Ethernet',
    'Fa': 'FastEthernet',
    'Gi': 'GigabitEthernet',
    'Te': 'TenGigabitEthernet',
}

def if_fullname(ifname):
    for k, v in interface_full_name_map.items():
        if ifname.startswith(v):
            return ifname
        if ifname.startswith(k):
            return ifname.replace(k, v)
    return ifname

def if_shortname(ifname):
    for k, v in interface_full_name_map.items():
        if ifname.startswith(v):
            return ifname.replace(v, k)
    return ifname

def generate_node_and_edge_dictionaries(task):


    ospf_output = task.run(
    task= netmiko_send_command,
    command_string="show ip ospf database router",
    use_genie=True,
    )



    parsed_output = ospf_output.result

    nodes = {}
    edges = {}

    # extract the relevant information from the input dictionary
    for vrf in parsed_output["vrf"].values():
        for af in vrf["address_family"].values():
            for instance in af["instance"].values():
                for area in instance["areas"].values():
                    for lsa in area["database"]["lsa_types"].values():
                        for lsa_id, nodes_data in lsa["lsas"].items():
                            for link_id, link_data in nodes_data["ospfv2"]["body"]["router"]["links"].items():

                                nodes[link_id] = {}
                                
                                if link_data['link_data'] not in nodes.keys():
                                    nodes[link_data['link_data']] = {}
                                

                                if link_id not in edges.keys():
                                    edges[link_id]={
                                        "destination": [],
                                        "type": [],
                                        "cost" : [],
                                    }

                                edges[link_id]["destination"].append(link_data['link_data'])
                                edges[link_id]["type"].append(link_data['type'])
                                edges[link_id]["cost"].append(link_data['topologies'][0]['metric'])

    print(nodes)
    print(edges)

    # define the nodes and edges
    
    # create a graph from the nodes and edges
    G = nx.Graph()

    list_of_edges = []

    for source, data in edges.items():
        destinations = data['destination']
        costs = data['cost']

        for destination, cost in zip(destinations, costs):
            list_of_edges.append((source, destination, cost))


    G.add_nodes_from(list(nodes.keys()))
    for edge in list_of_edges:
        source, destination, cost = edge
        G.add_edge(source,destination, weight= cost)
    # G.add_edges_from(tuples_edges)

    # compute the x and y coordinates for each node using the Kamada-Kawai algorithm
    node_positions = nx.kamada_kawai_layout(G,scale = 250)
    pos = {node: {"x": x, "y": y} for node, (x, y) in node_positions.items()}
    print(pos)

    
    new_dict=[]
    
    for i, key in enumerate(pos.keys(), 1):
        # host = interfaces.get(key, {}).get("host", None)
        intf = interfaces.get(key, {}).get("intf", None)
        serial = interfaces.get(key, {}).get("serial", None)
        hostname = interfaces.get(key, {}).get("hostname", None)
        isExist= False


        for dictionary in new_dict:
            # Check if the dictionary with the matching id is present in the list
            if serial == dictionary['id']:
                 # Append the value to the dictionary
                 dictionary["data"]['intf'].append(intf)
                 dictionary["data"]['intfIP'].append(key)

                 isExist = True
                 break

        if(not isExist and serial):    
            buffer_dict = {
                    "id": serial,
                    "type": "ZeroTouchNode",
                    "position": {
                        "x": pos[key]["x"],
                        "y": pos[key]["y"]
                    },
                    "data": {
                        # "host": host,
                        "intf": [intf],
                        "intfIP": [key],
                        "serial": serial,
                        "hostname": hostname,
                        "value": key,
                        "img": "http://127.0.0.1:8000/images/router.png"
                    }
                }
            new_dict.append(buffer_dict)
    print(json.dumps(new_dict,indent=4))

    new_dict_edges = []

    for src, data in edges.items():
        for i, target in enumerate(data['destination']):
            src_intf = interfaces.get(src, {}).get("intf", None)  # Look up the source interface name using the source IP address
            target_intf = interfaces.get(target, {}).get("intf", None)   # Look up the target interface name using the destination IP address
            srcDevice = interfaces.get(src, {}).get("serial", None)
            tgtDevice = interfaces.get(target, {}).get("serial", None)

            buffer_dict = { 
                "id":f'{src}-{target}',
                "source": srcDevice,
                "target": tgtDevice,
                "sourceHandle": f'src-{src_intf}-{src}',
                "targetHandle": f'tgt-{target_intf}-{target}',
                "type": "ZeroTouchEdge",
                "data":{
                    'weight': data['cost'][i],
                    'type': data['type'][i],
                    'srcIfName': src_intf,
                    'srcDevice': srcDevice,
                    'tgtIfName': target_intf,
                    'tgtDevice': tgtDevice,
                    'srcIP' : src,
                    'tgtIP' : target,
                }
            }
            new_dict_edges.append(buffer_dict)
    
    print(json.dumps(new_dict_edges,indent=4))


icon_capability_map = {
    'router': 'router',
    'switch': 'switch',
    'bridge': 'switch',
    'station': 'host'
}

icon_model_map = {
    'CSR1000V': 'router',
    'Nexus': 'switch',
    'IOSXRv': 'router',
    'IOSv': 'switch',
    '2901': 'router',
    '2911': 'router',
    '2921': 'router',
    '2951': 'router',
    '4321': 'router',
    '4331': 'router',
    '4351': 'router',
    '4421': 'router',
    '4431': 'router',
    '4451': 'router',
    '2960': 'switch',
    '3750': 'switch',
    '3850': 'switch',
}

def get_icon_type(device_cap_name, device_model=''):
    """
    Device icon selection function. Selection order:
    - LLDP capabilities mapping.
    - Device model mapping.
    - Default 'unknown'.
    """
    if device_cap_name:
        icon_type = icon_capability_map.get(device_cap_name)
        if icon_type:
            return icon_type
    if device_model:
        # Check substring presence in icon_model_map keys
        # string until the first match
        for model_shortname, icon_type in icon_model_map.items():
            if model_shortname in device_model:
                return icon_type
    return 'unknown'







def kamada_kawai(nodes, edges):
    # Initialize the positions of the nodes
    for node in nodes:
        nodes[node]["x"] = 0
        nodes[node]["y"] = 0

    # Iterate until the positions of the nodes have converged
    while True:
        # Calculate the ideal length for each edge
        for node, neighbor in edges.items():
            distance = calculate_distance(nodes[node], nodes[neighbor])
            ideal_length = calculate_ideal_length(node, neighbor)

            # Calculate the spring force acting on each node
            spring_force = calculate_spring_force(distance, ideal_length)

            # Update the positions of the nodes
            nodes[node]["x"] += spring_force
            nodes[node]["y"] += spring_force

        # Check if the positions of the nodes have converged
        if has_converged(nodes):
            break

    # Return the final positions of the nodes
    return nodes
def calculate_distance(node1, node2):
    """Calculate the Euclidean distance between two nodes."""
    dx = node1["x"] - node2["x"]
    dy = node1["y"] - node2["y"]
    return math.sqrt(dx**2 + dy**2)

def calculate_ideal_length(node1, node2):
    """Calculate the ideal length for an edge between two nodes."""
    # The ideal length is based on the desired positions of the nodes
    dx = node1["desired_x"] - node2["desired_x"]
    dy = node1["desired_y"] - node2["desired_y"]
    return math.sqrt(dx**2 + dy**2)

def calculate_spring_force(distance, ideal_length):
    """Calculate the spring force acting on a node."""
    # The spring force is based on the difference between the current
    # distance between the nodes and the ideal length of the edge
    return (distance - ideal_length) / ideal_length

def has_converged(nodes):
    """Check if the positions of the nodes have converged."""
    # The positions have converged if the maximum change in the positions
    # of the nodes is below a certain threshold
    max_change = 0
    for node in nodes:
        dx = abs(node["x"] - node["prev_x"])
        dy = abs(node["y"] - node["prev_y"])
        max_change = max(max_change, dx, dy)

    return max_change < 100



# ///////////////////////////////////////////////////////////////////////////



def print_title(title: str) -> str:
    """
    Helper function to print a title.
    """
    msg = "**** {} ".format(title)
    return "{}{}".format(msg, "*" * (80 - len(msg)))


def _print_individual_result(
    result: Result,
    attrs: List[str],
    failed: bool,
    severity_level: int,
    final_string: str = "",
    task_group: bool = False,
    print_host: bool = False,
) -> str:
    if result.severity_level < severity_level:
        return

    subtitle = (
        "" if result.changed is None else " ** changed : {} ".format(result.changed)
    )
    level_name = logging.getLevelName(result.severity_level)
    symbol = "v" if task_group else "-"
    host = (
        f"{result.host.name}: "
        if (print_host and result.host and result.host.name)
        else ""
    )
    msg = "{}{}{}".format(symbol * 4, host, result.name, subtitle)
    final_string += '\n' + \
        "{}{}".format(
             msg, symbol * (80 - len(msg)), level_name
        )
    
    for attribute in attrs:
        x = getattr(result, attribute, "")
        if isinstance(x, BaseException):
            # for consistency between py3.6 and py3.7
                final_string += '\n' + (f"{x.__class__.__name__}{x.args}")
        elif x and not isinstance(x, str):
            if isinstance(x, OrderedDict):
                pretty_dict = pprint.pformat(x, indent=4)
                final_string += '\n'+pretty_dict
                # final_string += (json.dumps(x, indent=2))
            else:
                final_string += '\n'+ str(x)
        elif x:
            final_string += str(x)
    return "\n"+ final_string


def _print_result(
    result: Result,
    attrs: List[str] = None,
    failed: bool = False,
    severity_level: int = logging.INFO,
    final_string: str = "",
    print_host: bool = False,
) -> str:
    attrs = attrs or ["diff", "result", "stdout"]
    if isinstance(attrs, str):
        attrs = [attrs]

    if isinstance(result, AggregatedResult):
        msg = result.name
        final_string +=("{}{}".format(msg, "*" * (80 - len(msg))))
        for host, host_data in sorted(result.items()):
            title = (
                ""
                if host_data.changed is None
                else " ** changed : {} ".format(host_data.changed)
            )
            msg = "* {}{}".format(host, title)
            final_string += (
                "{}{}".format(msg, "*" * (80 - len(msg)))
            )
            final_string += _print_result(host_data, attrs, failed, severity_level,final_string)
    elif isinstance(result, MultiResult):
        _print_individual_result(
            result[0],
            attrs,
            failed,
            severity_level,
            final_string,
            task_group=True,
            print_host=print_host,
        )
        for r in result[1:]:
           final_string += _print_result(r, attrs, failed, severity_level,final_string)
        msg = "^^^^ END {} ".format(result[0].name)
        if result[0].severity_level >= severity_level:
            final_string +=("{}{}".format( msg, "^" * (80 - len(msg))))
    elif isinstance(result, Result):
        final_string += _print_individual_result(
            result, attrs, failed, severity_level,final_string, print_host=print_host
        )
    return "\n"+final_string

def string_result(
    result: Result,
    vars: List[str] = None,
    failed: bool = False,
    severity_level: int = logging.INFO,
) -> str:
    """
    Prints an object of type `nornir.core.task.Result`

    Arguments:
      result: from a previous task
      vars: Which attributes you want to print
      failed: if ``True`` assume the task failed
      severity_level: Print only errors with this severity level or higher
    """
    LOCK.acquire()
    try:
        return _print_result(result, vars, failed, severity_level,final_string, print_host=True)
    finally:
        LOCK.release()




