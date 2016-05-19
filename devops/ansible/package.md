http://docs.ansible.com/list_of_packaging_modules.html

- name: install foo package
  yum: name=foo state=latest update_cache=yes

Instalar varios paquetes:
  - name: install Visual software
    yum: name={{item}} state=installed
    with_items:
     - wxmacmolplt
     - dia
     - veusz

- name: install foo package
  yum: name=foo-1.0-1.el6.x86_64 state=present

- name: install foo package
  yum: name=http://www.web.com/foo-1.0-1.el6.x86_64 state=present

- name: install foo package
  yum: name=/tmp/foo-1.0-1.el6.x86_64 state=present

- name: install foo package
  yum: name=foo-1.0-1.el6.x86_64 state=absent

Instalar groups:
- name: install the 'Development tools' package group
  yum: name="@Development tools" state=present

update_cache=yes
   Force updating the cache. Has an effect only if state is present or latest.

enablerepo=nombre
para activar un repo desactivado solo para esta instalación

disablerepo=nombre,otro


Ad-Hoc
ansible -s MAQUINAS -m yum -a "name=screen"
