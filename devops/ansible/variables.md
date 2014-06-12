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

Ejemplo:
kibana_nginx_config_path: /etc/nginx/sites-enabled

- name: set custom facts for interface
  template: src=interface.json.j2 dest="{{ kibana_nginx_config_path }}/interface.json" backup=yes


Almacenar variable en fichero:
  - name: comando
    ...
    register: releases

  - name: copiar a fichero
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
 - [ "vars/{{ ansible_os_family }}.yml", "vars/os_defaults.yml" ]
	  


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
