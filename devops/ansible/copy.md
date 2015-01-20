http://docs.ansible.com/copy_module.html

# Mirar tambien synchronize (por ejemplo para copia manteniendo permisos y usuarios)

Copia ficheros entre la máquina local donde se ejecuta ansible y la máquina remota.

- copy: src=/srv/myfiles/foo.conf dest=/etc/foo.conf owner=foo group=foo mode=0644

Si el dest es un diretorio, se copiará con el nombre del src. Si no, usará el nombre allí declarado

- copy: content="contenido del fichero" dest=/tmp/prueba

No consigo pasar a content el valor de una variable tipo content="{{variable}}"
Me dice que:
msg: this module requires key=value arguments (

- name: icinga repo
  copy: src=ICINGA-release.repo
        dest=/etc/yum.repos.d/
        owner=root group=root mode=0644


Si uso copy en un playbook, buscará el fichero en el path donde esté el fichero yaml.



copia recursiva:
- name: set configuration basic files
  copy: src=icinga/conf.d/ dest=/etc/icinga/conf.d
        owner=icinga group=icinga mode=0644 directory_mode=0755
