Delegar una tarea a un host en particular.
Ejemplo, sacar un nodo de un Load Balancer:

    tasks:
      - name: remove host from LB
        shell: /usr/local/bin/remove_host {{ ansible_hostname }}
        delegate_to: loadbalancer.example.com

# Ejecutar una tarea en los nodos de un grupo
- name: disable nagios alerts for this host webserver service
  nagios: action=disable_alerts host={{ inventory_hostname }} services=webserver
  delegate_to: "{{ item }}"
  with_items: groups.monitoring


Crear en cada máquina del grupo replication_servers un directorio por cada máquina del grupo
- name: create data directory for mongodb
  file: path={{ mongodb_datadir_prefix }}/mongo-{{ inventory_hostname }} state=directory owner=mongod group=mongod
  delegate_to: '{{ item }}'
  with_items: groups.replication_servers


El primer elemento de un grupo:
delegate_to: "{{ groups.domain_controllers[0] }}" 

Uno random de un grupo:
delegate_to: "{{ groups.domain_controllers|random}}" 

