- name: create needed directory
  file: dest=/tmp/ansible state=directory

- name: create needed directory
  file: dest=/tmp/ansible mode=755 owner=mdehaan group=mdehaan state=directory

Creará los directorios intermedios necesarios


- name: create icinga conf directories
  file: dest={{ item }} state=directory
        mode=0755 owner=icinga group=icinga 
  with_items:
    - /etc/icinga/conf.d/commands
    - /etc/icinga/conf.d/templates
    - /etc/icinga/conf.d/timeperiods

