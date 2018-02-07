http://docs.ansible.com/intro_dynamic_inventory.html
http://docs.ansible.com/ansible/latest/dev_guide/developing_inventory.html
Usar un script para generar dinámicamente el inventario


A partir de ansible 2.4 debemos usar Inventory Plugins
Parece que hay unos cuantos cambios en la 2.5 de como se implementa
http://docs.ansible.com/ansible/devel/plugins/inventory.html
https://github.com/ansible/ansible/tree/devel/lib/ansible/plugins/inventory

Lista de plugins de inventario
ansible-doc -t inventory -l

Doc sobre un plugin:
ansible-doc -t inventory <plugin name>

Contenido del inventario:
ansible-inventory -i foo --list
  en el caso de un plugin de inventario, foo seguramente sea un yaml de configuración


## Dev inv plugin
Coger como ejemplo uno de los que tiene ansible.

https://github.com/ansible/ansible/blob/devel/lib/ansible/inventory/manager.py
  quien se encarga de llamar a los plugins de inventario
https://github.com/ansible/ansible/tree/devel/lib/ansible/plugins/inventory
  plugins de ejemplo y clase base (__init__.py)

A partir de la 2.5 se puede cachear el inventario:
https://github.com/ansible/ansible/commit/4a1cc661c417fee913c7fd8492f5b77170efa436

Parece que llaman a nuestra función parser()
Nos pasan:
  inventory=<ansible.inventory.data.InventoryData object at 0x7faf8184f8d0>
  loader=<ansible.parsing.dataloader.DataLoader object at 0x7faf842ec210>
  path=u'/home/adrian/Documentos/opensolutions/carrefour/cmdb/inventario_dinamico/ucmdb.yml' (lo que pongamos en -i)
  cache=False/True

Parece que podemos sacar las cosas llamando a:
inventory.add_host("server1", group="", port=n)
inventory.add_group("linux")
inventory.add_child("linux", "server1")
inventory.set_variable("linux", "key", "value")



donde deberemos terminar metiendo nuestra info en:
self.cache[cache_key]





# Lo antiguo (scripts que devuelven json)

http://docs.ansible.com/list_of_inventory_modules.html

vbox: virtualbox

Inventarios: https://github.com/ansible/ansible/tree/devel/contrib/inventory


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
