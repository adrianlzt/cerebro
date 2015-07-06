http://docs.ansible.com/list_of_commands_modules.html

- name: exec puppet agent
  command: /usr/bin/puppet agent -t --noop


Ejecutar el comando, guardar la salida y imprimirla por pantalla (será necesario pasar -v al ansible-playbook)
- name: exec puppet agent
  command: /usr/bin/puppet agent -t --noop
  register: puppet

Para que no de error cuando salga un return code distinto de 0
ignore_errors: True


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


# Ad Hoc
ansible -s tidcampus -m command -a "id"


# Long
- name: Install Drupal.
  command: >
    drush si -y
    --site-name="{{ drupal_site_name }}"
    --account-name=admin
    --account-pass={{ drupal_admin_pass }}
    --db-url=mysql://root@localhost/{{ domain }}
    chdir={{ drupal_core_path }}
    creates={{ drupal_core_path }}/sites/default/settings.php

Creates: no ejecuta el command si el fichero existe
