- name: create needed directory
  file: dest=/tmp/ansible state=directory

- name: create needed directory
  file: dest=/tmp/ansible mode=755 owner=mdehaan group=mdehaan state=directory

Creará los directorios intermedios necesarios
