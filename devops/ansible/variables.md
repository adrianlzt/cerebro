http://docs.ansible.com/playbooks_variables.html
http://docs.ansible.com/intro_inventory.html#group-variables

From highest precedence to lowest:

"Facts" derived from the setup module.
Passed from the command line using the -e switch. (these variables always win)
Set in playbook.
Role variables. (More on roles later)
Variables passed from inventory.
Host variables. (from /etc/ansible/host_vars/<HOSTNAME>)
Group variables. (from /etc/ansible/group_vars/<GROUPNAME>)
Site default variables. ( from /etc/ansible/group_vars/all)
Role "default" variables.

No usar guiones (-) en los nombres de las varibables, porque jinja2 piensa que son restas.

Ejemplo:
kibana_nginx_config_path: /etc/nginx/sites-enabled

- name: set custom facts for interface
  template: src=interface.json.j2 dest="{{ kibana_nginx_config_path }}/interface.json" backup=yes


Almacenar variable en fichero:
  - name: comando
    ...
    register: releases

  - name: copiar {{releases}} a fichero
    shell: echo "{{releases}}" > /tmp/otro/pruebas-assets/REGISTER


Si una variable devuelta es un json podemos navegar por ella:
  - uri: url=https://api.github.com/repos/adrianlzt/pruebas-assets/releases
         HEADER_Authorization="token XXXX"
    register: releases

  - debug: msg='{{releases.json[0]["url"]}}'


Se puede pasar un fichero json como variables:
ansible-playbook -e "@fichero.json" ...

O un json a pelo:
--extra-vars '{"pacman":"mrs","ghosts":["inky","pinky","clyde","sue"]}'


vars_files:
 - "vars/common.yml"
 - "vars/other.json"
 - [ "vars/{{ ansible_os_family }}.yml", "vars/os_defaults.yml" ]
	  
vars:
  contents: "{{ lookup('file', '/etc/foo.txt') }}"
  cosa: "blabla"

Se pueden pasar funciones jinja a las variables
{{ variable.replace('a','b') }}
Mirar jinja.md


Se pueden obtener variables de otro host
hostvars.localhost.rpm_name.stdout
También vale para obtener variables de otro play dentro del mismo playbook (por ejemplo un register de un nodo que se ha ejecutado antes)
Parece que no vale para variables obtenidas con "vars_prompt"

Hack para solucionarlo. Hacer un echo de la variable y guardarla en un registro:
- name: hack, copy dsn_branch to puppet play
  shell: echo "{{ dsn_branch }}"
  register: dsn_br
Mejor, guardarla como fact, asi perdurará entre playbooks.

# Variables de entorno
Para el primer caso hacen falta los facts, para el segundo no.

  vars:
    platon_home: "{{ ansible_env.THING_HOME }}"

  gather_facts: false
  vars:
    platon_home: "{{ lookup('env','THING_HOME') }}"


# Variables reservadas
hostvars
group_names
groups
environment

# Magic variables
http://docs.ansible.com/playbooks_variables.html#magic-variables-and-how-to-access-information-about-other-hosts

## hostvars
lets you ask about the variables of another host, including facts that have been gathered about that host. If, at this point, you haven’t talked to that host yet in any play in the playbook or set of playbooks, you can get at the variables, but you will not be able to see the facts.

{{ hostvars['test.example.com']['ansible_distribution'] }}


## group_names 
a list (array) of all the groups the current host is in.

{% if 'webserver' in group_names %}


## groups
list of all the groups (and hosts) in the inventory

{% for host in groups['app_servers'] %}


{% for host in groups['app_servers'] %}
  {{ hostvars[host]['ansible_eth0']['ipv4']['address'] }}
{% endfor %}


# Usar variables del inventario de un grupo:
- name: "Build hosts file"
  lineinfile: dest=/etc/hosts regexp='.*{{ hostvars[item].ansible_hostname }}$' line="{{ hostvars[item].ansible_default_ipv4.address }} {{ hostvars[item].ansible_hostname }}" state=present
  when: hostvars[item].ansible_default_ipv4.address is defined
  with_items: groups['nginx']

Respuesta del inventario dinámico:
{
    "nginx": {
        "hosts": [
            "172.16.1.24", 
            "172.16.1.23"
        ]
    }, 
...

