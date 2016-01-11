http://fuse.sourceforge.net/sshfs.html

Montar el home de un servidor como un sistema de ficheros local.
lento


sudo apt-get install sshfs

mkdir directorio/
sshfs maquina: directorio/

Desmontar:
fusermount -u directorio/


sshfs vagrant@localhost: -p 2201 testmnt


If you use 'sshfs_mount' and suffer from disconnects, use '-o reconnect,workaround=truncate:rename'
