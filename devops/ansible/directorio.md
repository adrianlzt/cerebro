- name: create needed directory
  file: dest=/tmp/ansible state=directory

- name: create needed directory
  file: dest=/tmp/ansible state=directory
        owner=mdehaan group=mdehaan mode=0755

Creará los directorios intermedios necesarios


- name: create icinga conf directories
  file: dest={{ item }} state=directory
        owner=icinga group=icinga mode=0755
  with_items:
    - /etc/icinga/conf.d/commands
    - /etc/icinga/conf.d/templates
    - /etc/icinga/conf.d/timeperiods


- name: make sure the installer directory exists
  stat: path={{ oracle_tmp }}/database
  register: install_dir
  failed_when: not install_dir.stat.exists or not install_dir.stat.isdir

