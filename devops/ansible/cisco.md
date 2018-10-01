Ejemplo inventario:
router1 ansible_connection=network_cli ansible_network_os=ios ansible_host=10.0.0.1 ansible_user=admin

Ejemplo playbook:
- hosts: router1
  gather_facts: False
  tasks:
    - ios_config:
       lines: hostname pepe
