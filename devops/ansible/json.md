Mirar variables.md
Mirar filters.md para ver como filtrar usando json-path


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


Extraer info de un json devuelto por un comando:
# maas root node-groups list
[   
    {   
        "cluster_name": "Cluster master",
        "status": 1,
        "name": "maas",
        "uuid": "bb1748f7-a612-48d4-ae55-92db2d7579a2"
    }
]


- name: obtain cluster uuid
  command: /usr/bin/maas root node-groups list
  register: cluster_uuid

- debug: var={{ (cluster_uuid.stdout|from_json)[0].uuid}}
