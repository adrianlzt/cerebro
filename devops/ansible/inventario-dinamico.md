http://docs.ansible.com/intro_dynamic_inventory.html
Usar un script para generar dinámicamente el inventario

http://docs.ansible.com/list_of_inventory_modules.html

vbox: virtualbox


Crear hosts y hostgroups "al vuelo"

# add host to group 'just_created' with variable foo=42
- add_host: name={{ ip_from_ec2 }} groups=just_created foo=4

- name: create node host group
  add_host: name={{ item.id }} ansible_ssh_host={{ item.address }}
            ansible_ssh_user=root lb_id={{ lb.balancer.id }}
            groups=web
  with_items: lb.balancer.nodes


# Usar un primer play para decidir dinámicamente donde se ejecutará el segundo play
- hosts: localhost
  tasks:
    - add_host: name="xxx" ansible_ssh_host="{{servidor}}"

- hosts: xxx
  tasks:
    - name: prueba uname
      shell: uname -a

ansible-playbook -e "servidor=server.com" check.yml



# Crear script
Tiene que ser un archivo ejecutable y que empieze con el shebang (#!/).
Tiene que devolver un json con los grupos y sus nodos.
Si queremos meter variables irán al final del json.
Ejemplo de salida:

{
    "load_balancer": {
        "hosts": [
            "172.16.1.23"
        ]
    }, 
    "management": {
        "hosts": [
            "manage_node"
        ]
    }, 
    "icinga": {
        "hosts": [
            "172.16.1.201"
        ]
    },
    "_meta" : {
       "hostvars" : {
          "manage_node"     : { "ansible_ssh_host" : "192.168.213.86" },
          "llama.example.com"      : { "asdf" : 5678 }
       }
    }
}



# Parsear un fichero normal de inventory a format json
>>> from ansible.inventory import Inventory
>>> from ansible.parsing import DataLoader
>>> from ansible.vars import VariableManager
>>> d = DataLoader()
>>> vm = VariableManager()
>>> i = Inventory(d,vm,"inventory-dsn")
>>> i.get_hosts()
[nodo1, nodo2]
