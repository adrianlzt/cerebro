http://docs.ansible.com/service_module.html

Mirar handlers.md si queremos reiniciar un service cuando se cambie un fichero.

# Example action to start service httpd, if not running
- service: name=httpd state=started

# Example action to stop service httpd, if running
- service: name=httpd state=stopped

# Example action to restart service httpd, in all cases
- service: name=httpd state=restarted

- name: enable and run nrpe daemon
  service: name=nrpe state=started enabled=yes

- name: stop and disable iptables
  service: name=iptables state=stopped enabled=n

# Ad-hoc
# Desactivar puppet del inicio y pararlo
ansible MAQUINAS -s -m service -a "name=puppet state=stopped enabled=no"

