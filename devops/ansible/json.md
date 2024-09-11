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

- debug: var={{ [cluster_uuid.stdout|from_json](0).uuid}}

# Pasar un JSON literal a un módulo

<https://stackoverflow.com/a/41145279/1407722>

Añadir un espacio en blanco antes del JSON entre single quotes para que no lo interprete:

```ansible
- name: Start {{service_name}}
  shell: "<<starting springboot jar>> --server.port={{service_port}}\""
  environment:
    - SPRING_APPLICATION_JSON: ' {"test-host.1":"{{test_host_1}}","test-host.2":"{{test_host_2}}"}'
```
