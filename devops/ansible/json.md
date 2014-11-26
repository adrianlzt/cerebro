Mirar variables.md


- hosts: 127.0.0.1
  connection: local
  gather_facts: False
  vars_files:
    - "config.json"

  tasks:
    - name: escupe var
      debug: msg={{NETWORKING.fixed_virtual_ip}}


config.json:
{
    "NETWORKING": {
        "shared_external_net_id": "AAAA",
        "shared_management_net_id": "BBB",
        "fixed_virtual_ip": "CCCC",
        "dns_server_1": "10.9.7.6",
        "dns_server_2": "10.9.4.6"
    }
}

