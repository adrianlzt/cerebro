http://docs.ansible.com/setup_module.html

Esto es como los facts de puppet:
ansible all -m setup
ansible localhost -m setup | less

Nos devuelve todas las varibables que luego podremos usar en los plays como {{ ansible_devices.sda.model }}

También nos devuelve las variables del propio facter

Creo que no devuelve las variables puestas en el inventario (estatico), groups vars o host vars.

Si ejecutamos un playbook y limitamos por tags, si una máquina no tiene ninguna tarea que ejecutar, no se recoletarán sus facts.

No obtener los facts de facter:
ansible all -m setup -a 'gather_subset=!facter'

  si ponemos !all aun tendremos unos cuanto de ansible_*, los del subset "min"

También se le puede espicificar un gather_timeout (por cada grupo de facts)

Grupos: all, min, hardware, network, virtual, ohai, and facter


Tambien podemos filtrar:
-a "filter=facter_*"



Si queremos filtrar de esta manera en un playbook tendremos que desactivar la captura de facts:
gather_facts: False

Y luego poner un primer play que solo haga esto. O un pre_tasks:
    - name: obtener facts
      setup: gather_subset="!facter"



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



# Reload facts
- name: reload facts
  setup: filter='*'




# Local facts
http://docs.ansible.com/ansible/latest/user_guide/playbooks_variables.html#local-facts-facts-d

/etc/ansible/facts.d/preferences.fact
[general]
asdf=1
bar=2

Tambien podemos hacer {{ansible_local.something}}:
echo "true" > /etc/ansible/facts.d/something.fact
O también {{ansible_local.something.hola}}:
echo '{"hola": 123}' > /etc/ansible/facts.d/something.fact


ansible <hostname> -m setup -a "filter=ansible_local"
"ansible_local": {
        "preferences": {
            "general": {
                "asdf" : "1",
                "bar"  : "2"
            }
        }
 }

{{ ansible_local.preferences.general.asdf }}

Cuidado si no hemos declarado los facts e intentamos usarlos!
Si no existe el fichero preferences, ese template fallará.
Meter dentro de un block-rescue

- block:
    - import_tasks: test2.yml
      when: ansible_local.icinga.general.monitored == "True"
  rescue:
    - debug: msg="nodo ya registrado"


También podemos usar (en caso de haber metido "true" en el fichero icinga.fact):
when: ansible_local.icinga is defined and ansible_local.icinga


Crear facts locales:
- hosts: webservers
  tasks:
    - name: create directory for ansible custom facts
      file: state=directory recurse=yes path=/etc/ansible/facts.d
    - name: install custom impi fact
      copy: src=ipmi.fact dest=/etc/ansible/facts.d
    - name: re-read facts after adding custom fact
      setup: filter=ansible_local



# Custom facts
https://medium.com/@jezhalford/ansible-custom-facts-1e1d1bf65db8

/etc/ansible/facts.d/name.fact
  usar nombres con guiones bajos: ejemplo_de_nombre

Tiene que ser un ejecutable que devuelva un json. Ejemplo:
#!/bin/bash
DATE=`date`
echo "{\"date\" : \"${DATE}\"}"

Accesible en:
hostvars.host.ansible_local.nombre_fichero.*
Para el caso anterior sería:
hostvars.host.ansible_local.name.date


Crear custom facts al desplegar:
- name: "Create custom fact directory"
  file:
    path: "/etc/ansible/facts.d"
    state: "directory"
- name: "Insert custom fact file"
  copy:
    src: files/custom.fact
    dest: /etc/ansible/facts.d/custom.fact
    mode: 0755



# ansible_os_family
ansible_os_family == 'RedHat'
ansible_os_family == 'Suse'


# ansible_system
HP-UX
AIX
Linux
Darwin
Java
Win32NT

Sale de platform.system()
https://github.com/python/cpython/blob/2.7/Lib/platform.py#L1154:5


# Cache
mirar cache.md



# Obtener facts de hosts que no están en la list del playbook
https://gist.github.com/aliusmiles/e32a7296dda81438e56fff01d95d669b
```
- name: gather facts from group1
  setup:
  delegate_to: "{{ item }}"
  delegate_facts: True
  with_items: "{{ groups['group1'] }}"
```
