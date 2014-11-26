http://docs.ansible.com/setup_module.html

Esto es como los facts de puppet:
ansible all -m setup

Nos devuelve todas las varibables que luego podremos usar en los plays.

También nos devuelve las variables del propio facter (si está instalado):
facter_*


Para obtener un fact en particular:
ansible nagiosmaster -m setup -a filter=ansible_all_ipv4_addresses
ansible localhost -m setup -a 'filter=*uptime'

The filter option filters only the first level subkey below ansible_facts.



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

