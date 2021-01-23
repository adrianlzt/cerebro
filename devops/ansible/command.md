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

Si queremos hacer algo con el output del comando:
https://docs.ansible.com/ansible/latest/plugins/lookup/lines.html
- name: We could read the file directly, but this shows output from command
  debug: msg="{{ item }} is an output line from running cat on /etc/motd"
  with_lines: cat /etc/motd

- name: More useful example of looping over a command result
  shell: "/usr/bin/frobnicate {{ item }}"
  with_lines:
    - "/usr/bin/frobnications_per_host --param {{ inventory_hostname }}"


También podemos ejecutar con lookup:
https://docs.ansible.com/ansible/latest/plugins/lookup/pipe.html


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


# Idempotencia
- name: Put docker package on hold
  shell: >
         apt-mark showholds | grep -q docker-ce
         && echo -n HOLDED
         || apt-mark hold docker-ce
  register: docker_hold
  changed_when: docker_hold.stdout != 'HOLDED'



# Ejecutar segundo comando si el primero ha ido bien
    - name: test
      shell: "ps -ef | grep 123a[s]d"
      register: foo
      ignore_errors: true

    - name: ejecutada si el comando de arriba termina bien
      debug:
        msg: ejecutado
      when: foo.rc == 0
