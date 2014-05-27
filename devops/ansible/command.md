http://docs.ansible.com/list_of_commands_modules.html

- name: exec puppet agent
  command: /usr/bin/puppet agent -t --noop


Ejecutar el comando, guardar la salida y imprimirla por pantalla (será necesario pasar -v al ansible-playbook)
- name: exec puppet agent
  command: /usr/bin/puppet agent -t --noop
  register: puppet

- debug: var=puppet

También podemos usar:
- debug: msg="{{ puppet.stdout }}"
- debug: msg="{{ puppet.stderr }}"

CUIDADO, si ponemos tags al command, poner la misma tag al debug!!

Ejecutando puppet agent -t no consigo que me de stdout ni stderr
Mirar /var/lib/puppet/state/resources.txt


Solo ejecutar un comando si no se ha ejecutado antes (el creates debe apuntar a algun fichero que genere el comando)
- name: If file don't exist run command
  command: /root/installer.sh creates=/usr/bin/wkhtmltopdf

