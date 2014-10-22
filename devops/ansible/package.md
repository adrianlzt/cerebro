http://docs.ansible.com/list_of_packaging_modules.html

- name: install foo package
  yum: name=foo state=latest

Instalar varios paquetes:
  - name: install Visual software
    yum: pkg={{item}} state=installed
    with_items:
     - wxmacmolplt
     - dia
     - veusz

- name: install foo package
  yum: name=foo-1.0-1.el6.x86_64 state=present

Ad-Hoc
ansible -s MAQUINAS -m yum -a "name=screen"
