# Doc para ubuntu: http://revartm.wordpress.com/2007/03/06/servidor-nfs-bajo-ubuntu/

Server
Instalar nfs-common y nfs-kernel-server.
/etc/exports:
	directorio equipo1(opcion11,opcion12) equipo2(opcion21,opcion22)
	/home/usuario/datos 192.168.0.0(ro,sync,root_squash)
	/tmp 192.168.0.0(rw,sync,no_root_squash)
Tras modificar el exports, reiniciar: nfs-kernel-server

Para ver los directorios exportados: #exportfs

Los hosts se pueden especificar de muchas maneras:
*.cs.foo.edu
nodo?.tr.es
192.168.4.0/24


Cliente
mount -t nfs mi_equipo:/tmp /home/cliente/temp
/etc/fstab:
	mi_equipo:/tmp /home/cliente/temp nfs defaults,rw 0 0


root_squash
Map requests from uid/gid 0 to the anonymous uid/gid. Note that this does not apply to any other uids or gids that might be equally sensitive, such as user bin or group staff.

no_root_squash
Turn off root squashing. This option is mainly useful for diskless clients.

all_squash
Map all uids and gids to the anonymous user. Useful for NFS-exported public FTP directories, news spool directories, etc. The opposite option is no_all_squash, which is the default setting.

anonuid and anongid
These options explicitly set the uid and gid of the anonymous account. This option is primarily useful for PC/NFS clients, where you might want all requests appear to be from one user. As an example, consider the export entry for /home/joe in the example section below, which maps all requests to uid 150 (which is supposedly that of user joe).
