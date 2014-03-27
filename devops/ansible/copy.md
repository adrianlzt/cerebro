http://docs.ansible.com/copy_module.html

Copia ficheros entre la máquina local donde se ejecuta ansible y la máquina remota.

- copy: src=/srv/myfiles/foo.conf dest=/etc/foo.conf owner=foo group=foo mode=0644
