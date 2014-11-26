Mirar copy.md para copiar ficheros de un role a la máquina.

Generar fichero con contenido:

- name: gen file
  file: dest=/tmp/fichero content="cosas"

En modo ad-hoc no me crea el fichero si no existe :?

- name: gen file
  lineinfile: dest=/tmp/ansible1/ficheroLine line="prueba contenido" create=yes

- name: icinga passwd
  file: dest=/etc/icinga/passwd
        content="cosas"
        owner=icinga group=apache mode=0644

# Permisos:
- name: fix mod_gearman_neb log perms
  file: dest=/var/log/mod_gearman/mod_gearman_neb.log state=touch
  owner=root group=root mode=0644


Borrar fichero
- name: delete custom fact for hostgroups if not defined
  file: dest="{{ facter_dir }}/hostgroup.json" backup=yes state=absent
  when: hostgroup != ""


Si hay definida una variable aplicamos un template, si no, nos aseguramos de que el fichero no exista:
- name: set custom fact for hostgroups if defined
  template: src=hostgroup.json.j2 dest="{{ facter_dir }}/hostgroup.json" backup=yes
  when: hostgroup is defined

- name: delete custom fact for hostgroups if not defined
  file: dest="{{ facter_dir }}/hostgroup.json" backup=yes state=absent
  when: hostgroup is not defined



## Descomprimir un fichero ##
http://docs.ansible.com/unarchive_module.html
# Example from Ansible Playbooks
- unarchive: src=foo.tgz dest=/var/lib/foo

# Unarchive a file that is already on the remote machine
- unarchive: src=/tmp/foo.zip dest=/usr/local/bin copy=no



## lineinfile - Modificar un archivo ##
http://docs.ansible.com/lineinfile_module.html

- name: open allowed hosts
  lineinfile: dest=/etc/nagios/nrpe.cfg regexp=^allowed_hosts= line=allowed_hosts=10.0.0.0/16

Meter una linea al final
- name: define custom host entry
  lineinfile: dest=/etc/hosts line=10.2.23.9 nombrenodo


# Ad-hoc
ansible -s maquina -m lineinfile -a "dest=/etc/nagios/nrpe.cfg regexp=^allowed_hosts= line=allowed_hosts=10.0.0.0/16"



## replace - usar regexp para cambiar el contenido de un fichero ##

# Ad-hoc
Quita "noexec," de las entradas de fstab
ansible maquina -s -m replace -a "dest=/etc/fstab regexp='(.*)noexec,(.*)' replace='\1\2' backup=yes"
