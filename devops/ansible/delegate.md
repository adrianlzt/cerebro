Delegar una tarea a un host en particular.
Ejemplo, sacar un nodo de un Load Balancer:

    tasks:
      - name: remove host from LB
        shell: /usr/local/bin/remove_host {{ ansible_hostname }}
        delegate_to: loadbalancer.example.com
