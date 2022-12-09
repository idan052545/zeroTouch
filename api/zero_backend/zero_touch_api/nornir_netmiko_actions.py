from genie.libs.parser.utils import get_parser_commands
from nornir_netmiko.tasks import netmiko_send_command


ip_list = []
duplicates = {}
target_list = []
failed_list = []


def show_ip_int_br(task):
    interfaces_result = task.run(
        task=netmiko_send_command,
        command_string="show ip interface brief",
        use_genie=True
        # use_textfsm=True,
        # //"show ip interface br"
    )
    task.host["facts"] = interfaces_result.result
    # print(json.dumps(interfaces_result.result, indent=4, sort_keys=True))
    # print(interfaces_result.result[0]["intf"])
    # print(task.host["facts"])


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
