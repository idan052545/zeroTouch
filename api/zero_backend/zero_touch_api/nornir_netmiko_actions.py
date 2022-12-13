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


ip_list = []
duplicates = {}
target_list = []
failed_list = []
final_string= ""
LOCK = threading.Lock()


def show_ip_int_br(task):
    interfaces_result = task.run(
        task=netmiko_send_command,
        command_string="show ip interface brief",
        use_genie=True
        # use_textfsm=True,
        # //"show ip interface br"
    )
    task.host["facts"] = interfaces_result.result


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
        command="show interfaces",
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
                    serial = task.host["verfacts"]["serial_number"]
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

# /home/idansimantov/projects/zero_touch/api/host_vars/R1.yaml
# /home/idansimantov/projects/zero_touch/api/zero_backend/zero_touch_api/nornir_netmiko_actions.py
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
                                # nodes[link_id]["interface"] = "Unknown"  # assume interface is unknown unless specified
                                # nodes[link_id]["status"] = "up"  # assume status is up unless specified
                                # node_interface = list(nodes_data['ospfv2']['body']['router']['links'].keys())[0]
                                # nodes[link_id]["cost"] = nodes_data['ospfv2']['body']['router']['links'][node_interface]['topologies'][0]['metric']                           
                                
                            node_id = nodes_data['lsa_id']
                            node_links = nodes_data['ospfv2']['body']['router']['links']
                            for link_info in node_links.values():
                                if link_info['link_data'] not in nodes.keys():
                                    nodes[link_info['link_data']] = {}
                            edges[node_id] = {
                                "destination": [link_info['link_data'] for link_info in node_links.values()],
                                "type": [link_info['type'] for link_info in node_links.values()],
                                "cost": [link_info['topologies'][0]['metric']  for link_info in node_links.values()],
                            }
    # nodes_data = parsed_output['vrf']['default']['address_family']['ipv4']['instance']['1']['areas']['0.0.0.0']['database']['lsa_types'][1]['lsas']


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


    # for key, value in edges.items():
    # # For each key, get the 'destination' value and iterate over it
    #     for dest in value['destination']:
    #         # Create a new tuple with the key and the destination, and append it to the list
    #         tuples_edges.append((key, dest))
    #         G.add_edge(key, dest,value['cost'])

    G.add_nodes_from(list(nodes.keys()))
    for edge in list_of_edges:
        source, destination, cost = edge
        G.add_edge(source,destination, weight= cost)
    # G.add_edges_from(tuples_edges)

    # compute the x and y coordinates for each node using the Kamada-Kawai algorithm
    node_positions = nx.kamada_kawai_layout(G,scale = 100)
    pos = {node: {"x": x, "y": y} for node, (x, y) in node_positions.items()}
    print(pos)

    new_dict = {
        "node-" + str(i): {
            "type": "ZeroTouchNode",
            "position": {
                "x": pos[key]["x"],
                "y": pos[key]["y"]
            },
            "data": {
                "value": 123,
                "img": "https://symbols.getvecta.com/stencil_240/204_router.7b208c1133.png"
            }
        }
        for i, key in enumerate(pos.keys(), 1)
    }
    print(json.dumps(new_dict,indent=4))


    # nodes = []
    # edges = []
    # parsed_output= ospf_output.result
    # for vrf in parsed_output["vrf"].values():
    #         for af in vrf["address_family"].values():
    #             for instance in af["instance"].values():
    #                 for area in instance["areas"].values():
    #                     for lsa in area["database"]["lsa_types"].values():
    #                         for lsa_id, data in lsa["lsas"].items():
    #                             # Add the router that originated the LSA to the list of nodes
    #                             nodes.append(data["lsa_id"])
    #                             # Add the attached routers to the list of edges
    #                             for router in data["ospfv2"]["body"]["network"]["attached_routers"].keys():
    #                                 edges.append((data["adv_router"], router))


    # print(nodes)
    # print(edges)

    # Extract the nodes of the network topology
    # nodes = parsed_output['vrf']['default']['address_family']['ipv4']['instance']['1']['areas']['0.0.0.0']['database']['lsa_types'].get('1', {}).get('lsa_type', {}).get('lsas', {})

    # # Extract the edges of the network topology
    # edges = parsed_output['vrf']['default']['address_family']['ipv4']['instance']['1']['areas']['0.0.0.0']['database']['lsa_types'].get('2', {}).get('lsa_type', {}).get('lsas', {})
    # if not parsed_output:
    #     print("no ospf neighboor on this host")
    # else :
    #     nodes = {}
    #     edges = {}
    #     for host, task_result in ospf_output.dict().items():
    #     # Extract the OSPF neighbor information from the command output
    #         neighbors = task_result.result.strip().split("\n")[2:]
    #         nodes[host] = set()
    #         edges[host] = set()
    #         for neighbor in neighbors:
    #             # Add the current host and its neighbor to the nodes dictionary
    #             nodes[host].add(host)
    #             nodes[host].add(neighbor.split()[0])

    #             # Add the current host and its neighbor to the edges dictionary
    #             edges[host].add((host, neighbor.split()[0]))

        # for neighbor in parsed_output["neighbors"]:
        #     local_interface = neighbor["local_interface"]
        #     remote_interface = neighbor["neighbor_interface"]
        #     nodes[local_interface] = parsed_output["interfaces"][local_interface]["ipv4"]["address"]
        #     nodes[remote_interface] = parsed_output["interfaces"][remote_interface]["ipv4"]["address"]
        #     edges[(local_interface, remote_interface)] = neighbor["state"]

        # Use spring_layout from NetworkX to compute x and y coordinates for each node
    # G = nx.Graph()
    # G.add_nodes_from(nodes.keys())
    # G.add_edges_from(edges.keys())
    # node_positions = nx.kamada_kawai_layout(G)
    # for node, pos in node_positions.items():
    #     nodes[node] = {
    #         "ip_address": nodes[node],
    #         "x": pos[0],
    #         "y": pos[1],
    #     }
    # print(nodes)
    # print(edges)

    # return nodes, edges




# def show_ip_ospf_database_router_self_originiate(task):
#     interfaces_result = task.run(
#         task=netmiko_send_command,
#         command_string="show ip ospf database router self-originate",
#         use_genie=True
#         # use_textfsm=True,
#         # //"show ip interface br"
#     )
#     task.host["facts"] = interfaces_result.result
#     regex = re.compile(r"^Link connected to: (.*) \((.*)\)$")

#     # create a dictionary to store the nodes and edges
#     network = {}

#     # split the string into lines
#     lines = interfaces_result.result.split("\n")

#     # iterate over the lines and extract the information
#     for line in lines:
#         # get the link type and link data
#         match = regex.match(line)
#         if match is None:
#             # the line does not match the expected format, print an error message
#             print(f"Error: invalid line '{line}'")
#             continue

#         link_type = match.group(1)
#         link_data = match.group(2)

#         # handle the different link types
#         if link_type == "a Transit Network" and link_data.startswith("Link Data"):
#             # extract the link id and link data
#             link_id = link_data.split(" ")[0]
#             link_data = link_data.split("(Link Data)")[1].strip()

#             # add the link to the network dictionary
#             network[link_id] = {"type": "transit", "data": link_data}
#         elif link_type == "another Router (point-to-point)":
#             # extract the router id and add it to the network dictionary
#             router_id = link_data.split(" ")[0]
#             network[router_id] = {"type": "router", "data": {}}

#     print(network)


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
    final_string += \
        "{}{}".format(
             msg, symbol * (80 - len(msg)), level_name
        )
    
    for attribute in attrs:
        x = getattr(result, attribute, "")
        if isinstance(x, BaseException):
            # for consistency between py3.6 and py3.7
                final_string += (f"{x.__class__.__name__}{x.args}")
        elif x and not isinstance(x, str):
            if isinstance(x, OrderedDict):
                final_string += (json.dumps(x, indent=2))
            else:
                final_string += str(x)
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




