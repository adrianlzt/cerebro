http://docs.ansible.com/selinux_module.html

Si la máquina cliente tiene selinux, meter al comienzo del main.yaml del role:

- include: selinux.yml


selinux.yml:
- name: be sure libselinux-python are installed
  yum: name=libselinux-python state=present

- name: poner en permissive
  selinux: policy=targeted state=permissive



Para centos 7:
- name: be sure libselinux-python are installed
  yum: name=libselinux-python state=present

- name: create selinux config if it doesn't exists
  file: dest=/etc/selinux/config state=touch
        owner=root group=root mode=0644

- name: disable selinux (permissive)
  selinux: policy=targeted state=permissive

