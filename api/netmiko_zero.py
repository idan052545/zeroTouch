from netmiko import ConnectHandler

cisco_881 = {
    "device_type": "cisco_ios",
    "host": "192.168.19.251",
    "username": "admin",
    "password": "Aa123456",
    "port": 22,  # optional, defaults to 22
    "secret": "Aa123456",  # optional, defaults to ''
}

net_connect = ConnectHandler(**cisco_881)
output = net_connect.send_command("show ip int brief")
print(output)
