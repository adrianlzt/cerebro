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
