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
