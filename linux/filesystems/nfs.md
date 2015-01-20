# Doc para ubuntu: http://revartm.wordpress.com/2007/03/06/servidor-nfs-bajo-ubuntu/
https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Storage_Administration_Guide/s2-nfs-methodology-portmap.html

NFSv2  NFSv3
Cuando un cliente desea montar un volumen nfs, primero contacta con el puerto 111/TCP del cliente. Detrás de este puerto se encuentra rpcbind
rpcbind une procesos RPC con puertos, y publica la lista a los clientes.
La lista la podemos consultar con:
rpcinfo -e 

NFSv4
/etc/sysconfig/nfs
MOUNTD_NFS_V2="no"
MOUNTD_NFS_V3="no"
RPCNFSDARGS="-N 2 -N 3"

When you use only NFSv4, none of these services are required:
/etc/rc.d/init.d/nfslock
/etc/rc.d/init.d/rpcgssd
/etc/rc.d/init.d/rpcidmapd
/etc/rc.d/init.d/rpcsvcgssd


## Server ##
Instalar 
apt-get install nfs-common nfs-kernel-server

RedHat:
yum install nfs-utils

/etc/exports:
	directorio equipo1(opcion11,opcion12) equipo2(opcion21,opcion22)
	/home/usuario/datos 192.168.0.0(ro,sync,root_squash)
	/tmp 192.168.0.0(rw,sync,no_root_squash)

Tras modificar el exports, reiniciar: nfs-kernel-server
RedHat: service nfs restart

Para ver los directorios exportados: 
exportfs

Los hosts (clientes que pueden montar estos exports) se pueden especificar de muchas maneras:
*.cs.foo.edu
nodo?.tr.es
192.168.4.0/24


## Cliente ##
RedHat:
yum install nfs-utils
/etc/init.d/rpcbind start
/etc/init.d/nfslock start
/etc/init.d/nfs start
chkconfig rpcbind on
chkconfig nfslock on
chkconfig nfs on

Ubuntu:
apt-get install nfs-common


Mostrar recursos exportados de otro nodo
showmount -e 192.168.1.4

mount -t nfs mi_equipo:/tmp /home/cliente/temp
/etc/fstab:
	mi_equipo:/tmp /home/cliente/temp nfs defaults,rw 0 0


Opciones para el exports:
Con esto podemos por ejemplo hacer que todos los usuarios que monten la unidad NFS aparezcan como si fuesen el uid/gid que digamos.

root_squash
Map requests from uid/gid 0 to the anonymous uid/gid. Note that this does not apply to any other uids or gids that might be equally sensitive, such as user bin or group staff.

no_root_squash
Turn off root squashing. This option is mainly useful for diskless clients.

all_squash
Map all uids and gids to the anonymous user. Useful for NFS-exported public FTP directories, news spool directories, etc. The opposite option is no_all_squash, which is the default setting.

anonuid and anongid
These options explicitly set the uid and gid of the anonymous account. This option is primarily useful for PC/NFS clients, where you might want all requests appear to be from one user. As an example, consider the export entry for /home/joe in the example section below, which maps all requests to uid 150 (which is supposedly that of user joe).


# Iptables
http://www.cyberciti.biz/faq/centos-fedora-rhel-iptables-open-nfs-server-ports/

Algunos puertos se asignan dinámicamente


# Receta exportar directorio
Exportar un directorio por NFS

Servidor NFS
Editar el fichero
/etc/exports donde se incluirán los directorios
 a compartir, qué hosts pueden acceder a ellos y una lista de opciones:
$ cat /etc/exports
/home/sysadmin/nfs *(rw,sync,insecure,fsid=0)
En este caso, se exporta el directorio /home/sysadmin/nfs en modo lectura/escritura a cualquier host (*). La opción insecure es importante para que lo pueda importar un mac.

Con las opciones de exportación anterior, hay conflictos de permisos cuando 2 clientes tratan de escribir en el mismo directorio compartido. Para evitarlo, se puede indicar un uid y gid determinado al usuario anónimo con el que se conectarían los clientes, junto con el all_squash:
/home/sysadmin/nfs *(rw,sync,insecure,fsid=0,all_squash,anonuid=501,anongid=501)
Ejecutar el siguiente comando:
$ sudo exportfs -ra
para que nfs tome los cambios en el fichero
/etc/exports.

Configurar NFS (fichero
/etc/sysconfig/nfs) para que los puertos
 sean estáticos (y se puedan abrir por iptables). Descomentar las líneas:
RQUOTAD_PORT=875
LOCKD_TCPPORT=32803
LOCKD_UDPPORT=32769
MOUNTD_PORT=892
STATD_PORT=662
STATD_OUTGOING_PORT=2020

Abrir los puertos en iptables (/etc/sysconfig/iptables o /etc/sysconfig/ip6tables) para el servicio
 NFS:
-A INPUT -m state --state NEW -m udp -p udp --dport 2049 -j ACCEPT
-A INPUT -m state --state NEW -m tcp -p tcp --dport 2049 -j ACCEPT
