http://docs.ansible.com/setup_module.html

Esto es como los facts de puppet:
ansible all -m setup
ansible localhost -m setup | less

Nos devuelve todas las varibables que luego podremos usar en los plays como {{ ansible_devices.sda.model }}

También nos devuelve las variables del propio facter 

Si ejecutamos un playbook y limitamos por tags, si una máquina no tiene ninguna tarea que ejecutar, no se recoletarán sus facts.

# Fact caching
Podemos usar facts caching (version >= 1.8) para almacenar estos valores entre ejecuciones
http://docs.ansible.com/playbooks_variables.html#fact-caching
sudo apt-get install redis-server
sudo pip install redis
  esto es para tener la ultima libreria python para redis

~/.ansible.cfg
[defaults]
fact_caching = redis
fact_caching_timeout = 86400
# in seconds

Ahora si ejecutamos un playbook, los facts se almacenarán en la redis.


Para obtener un fact en particular:
ansible nagiosmaster -m setup -a filter=ansible_all_ipv4_addresses
ansible localhost -m setup -a 'filter=*uptime'

The filter option filters only the first level subkey below ansible_facts.


Una variable cualquier la metemos como:
nombre.valor.cosa

Ejemplo, ip de la interfaz 'docker0':
ansible_docker0.ipv4.address

Usando una variable para definir la interfaz:
{{hostvars[inventory_hostname][iface].ipv4.address}}



# Set fact
Definir un fact en un playbook:
http://docs.ansible.com/set_fact_module.html
Las variables definidas así sobreviven a distintos plays dentro de un mismo playbook (mirar ejemplo debajo)

- set_fact:
  "virtual_ip": "{{ virtual_ip_raw.stdout|from_json }}"

Luego la podremos usar como {{ virtual_ip }}


---
- hosts: localhost
  connection: local
  gather_facts: False
  tasks:
    - set_fact:
        adri_pepe: 12345
        otra_variable: pepito grillo

- hosts: localhost
  connection: local
  gather_facts: False
  tasks:
    - name: escupe variables
      debug: msg={{adri_pepe}}


Asignar un id a cada maquina de un grupo
- name: Assign id for each zookeeper host
  set_fact:
    "id": "{% for host in groups['broker'] %}{% if host == inventory_hostname %}{{ loop.index }}{% endif %}{% endfor %}"
