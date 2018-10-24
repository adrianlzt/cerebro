http://linux-nfs.org/wiki/index.php/Main_Page

# Doc para ubuntu: http://revartm.wordpress.com/2007/03/06/servidor-nfs-bajo-ubuntu/
https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Storage_Administration_Guide/s2-nfs-methodology-portmap.html
https://www.centos.org/docs/5/html/Deployment_Guide-en-US/s1-nfs-server-config-exports.html

When the nfs service starts, the /usr/sbin/exportfs command launches and reads this file, passes control to rpc.mountd (if NFSv2 or NFSv3) for the actual mounting process, then to rpc.nfsd where the file systems are then available to remote users.

NFSv2  NFSv3
Cuando un cliente desea montar un volumen nfs, primero contacta con el puerto 111/TCP del cliente. Detrás de este puerto se encuentra rpcbind
rpcbind une procesos RPC con puertos, y publica la lista a los clientes.
La lista la podemos consultar con:
rpcinfo [host] 
RedHat/CentOS intenta montar nfsv2/3 por defecto. Usar mount.nfs4

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


Para definir los exports se puede usar el comando exportfs:
http://linux.die.net/man/8/exportfs
Si agregamos así no permanecen a un reinicio del proceso nfs
exportfs -o opciones 1.2.3.4:/path
exportfs -o rw,nohide,insecure,no_subtree_check :/path
  opciones típicas:
    se esta exportando a todo el mundo (al no poner ip)
    estará activado por defecto all_squash, que mapea todos los usuarios al anon user y group a nfsnobody:nfsnobody (todos los ficheros con nfsnobody)
    las opciones que pongo (nohide,insecure,no_subtree_check) son recomendadas siempre (mirar más abajo)
exportfs -a
  sync /etc/exports para que empiezen a estar exportados


Para quitar un path: 
exportfs -u host:/path
exportfs -r
  sincronizar. Es como "reiniciar" el server nfs para que coja las nuevas opciones.


o el fichero /etc/exports:
/etc/exports:
	directorio equipo1(opcion11,opcion12) equipo2(opcion21,opcion22)
	/home/usuario/datos 192.168.0.0(ro,sync,root_squash)
	/tmp 192.168.0.0(rw,sync,no_root_squash)
  /home/sysadmin/nfs *(rw,sync,insecure,fsid=0)

Tras modificar el exports, reiniciar: nfs-kernel-server
RedHat: service nfs restart

Para ver los directorios exportados: 
exportfs -v

Los hosts (clientes que pueden montar estos exports) se pueden especificar de muchas maneras:
*.cs.foo.edu
nodo?.tr.es
192.168.4.0/24


## Cliente ##
RedHat6:
yum install nfs-utils
/etc/init.d/rpcbind start
/etc/init.d/nfslock start
/etc/init.d/nfs start
chkconfig rpcbind on
chkconfig nfslock on
chkconfig nfs on

RHEL7:
yum isntall -y nfs-util
mount ..

Ubuntu:
apt-get install nfs-common


Mostrar recursos exportados de otro nodo
showmount -e 192.168.1.4

Este comando manda tráfico UDP al puerto 111 (portmapper).

mount -t nfs servernfs:/tmp /home/cliente/temp
/etc/fstab:
	servernfs:/tmp /home/cliente/temp nfs defaults,rw 0 0
	servernfs:/tmp /home/cliente/temp nfs4 defaults,rw 0 0

Forzar un umount
umount -lf /mnt


## Opciones para el exports
http://linux.die.net/man/5/exports
Con esto podemos por ejemplo hacer que todos los usuarios que monten la unidad NFS aparezcan como si fuesen el uid/gid que digamos.

root_squash
Map requests from uid/gid 0 to the anonymous uid/gid. Note that this does not apply to any other uids or gids that might be equally sensitive, such as user bin or group staff.

no_root_squash
Turn off root squashing. This option is mainly useful for diskless clients.
Cada usuario escribe los ficheros con el UID que tenga asignado en su máquina.
Si varios procesos van a compartir el nfs tenemos que asegurarnos de que sus usuarios tengan el mismo uid.

all_squash
Map all uids and gids to the anonymous user. Useful for NFS-exported public FTP directories, news spool directories, etc. The opposite option is no_all_squash, which is the default setting.

anonuid and anongid
These options explicitly set the uid and gid of the anonymous account. This option is primarily useful for PC/NFS clients, where you might want all requests appear to be from one user. As an example, consider the export entry for /home/joe in the example section below, which maps all requests to uid 150 (which is supposedly that of user joe).

nohide
Si exportamos dos filesystem distintos, montado uno debajo del otro:
/mnt
/mnt/otrofs
Con la opción "nohide", al montar /mnt el usuario verá montados los dos de forma transparente.

insecure
allows clients with NFS implementations that don't use a reserved port for NFS
Para los MAC

no_subtree_check
mejor ponerlo, puede producir problemas si no lo ponemos



# Iptables
http://www.cyberciti.biz/faq/centos-fedora-rhel-iptables-open-nfs-server-ports/
http://www.cyberciti.biz/faq/centos-fedora-rhel-nfs-v4-configuration/
Para NFSv3 mirar más abajo, en "# Servidor NFS"

Para NFSv4 solo 2049/UDP  (client 701 <---TCP---> 2049 server)
-A INPUT -s 192.168.1.0/24 -m state --state NEW -p tcp --dport 2049 -j ACCEPT


Algunos puertos se asignan dinámicamente


# Receta exportar directorio
Exportar un directorio por NFS

# Servidor NFS
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


NFS v2 y v3:
Configurar NFS (fichero /etc/sysconfig/nfs) para que los puertos sean estáticos (y se puedan abrir por iptables). Descomentar las líneas:
Si no forzamos estos puertos, cada vez que arranque el demonio NFS elegirá unos dinámicamente (se pueden consultar con rpcinfo -p)
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
-A INPUT -m state --state NEW -m tcp -p tcp --dport 875 -j ACCEPT
-A INPUT -m state --state NEW -m udp -p udp --dport 875 -j ACCEPT
-A INPUT -m state --state NEW -m tcp -p tcp --dport 32803 -j ACCEPT
-A INPUT -m state --state NEW -m udp -p udp --dport 32769 -j ACCEPT
-A INPUT -m state --state NEW -m tcp -p tcp --dport 892 -j ACCEPT
-A INPUT -m state --state NEW -m udp -p udp --dport 892 -j ACCEPT
-A INPUT -m state --state NEW -m tcp -p tcp --dport 662 -j ACCEPT
-A INPUT -m state --state NEW -m udp -p udp --dport 662 -j ACCEPT
-A INPUT -m state --state NEW -m tcp -p tcp --dport 2020 -j ACCEPT
-A INPUT -m state --state NEW -m udp -p udp --dport 2020 -j ACCEPT


NFSv4:
fsid=0 selecciona lo que se montará en caso de no especificar mountpoint.
Por defecto (sin fsid=0 especificado) montará todos los puntos de montaje disponibles.

/etc/exports 
/mnt *(rw,sync,insecure,all_squash,anonuid=501,anongid=501)
/srv *(rw,sync,insecure,all_squash,anonuid=501,anongid=501)

# mount -t nfs 192.168.50.4:/ /mnt
    monta todos los puntos de montaje disponibles en /mnt
# ls /mnt
mnt  srv


/etc/exports 
/mnt *(rw,sync,insecure,all_squash,anonuid=501,anongid=501)
/srv *(rw,fsid=0,sync,insecure,all_squash,anonuid=501,anongid=501)

# mount -t nfs 192.168.50.4:/ /nfs/mnt
# ls /mnt
fileSRV-nfs1


## Configuraciones avanzadas
/etc/sysconfig/nfs
/etc/nfsmount.conf


## idmapd
rpc.idmapd is the NFSv4 ID <-> name mapping daemon. It provides functionality to the NFSv4 kernel client and server, to which it communicates via upcalls, by translating user and group IDs to names, and vice versa.


## Problemas
Todos los ficheros se ponen a nobody:nobody
https://www.novell.com/support/kb/doc.php?id=7014266
Parece que es porque en el servidor no existe el uid que está creando los ficheros en el cliente.
Esto tiene que ver con /etc/idmapd.conf
En el log veremos trazas:
rpc.idmapd[3053]: nss_getpwnam: name '497' does not map into domain 'localdomain'

NFSv4 doesn't use UIDs (http://serverfault.com/questions/98741/files-mounted-over-nfsv4-are-owned-by-4294967294-uids-and-gids-match)
Check that domain in /etc/idmapd.conf is the same on the client and server. Check that rpc.idmapd is running on the client and the server. And, of course, user should exist on the client and server. NFSv4 uses user principals on the wire and it's responsibility the client and server to provide a propper mapping. As you use AUTH_SYS local uid/gid propogated to the server on create, but 'ls' rquires mapping to work.

Debe estar deshabilitado el nfsv4 id mapping.
En los clientes (lo veo desactivado por defecto en CentOS 6.5)
cat /sys/module/nfs/parameters/nfs4_disable_idmapping
Y

En el servidor (activado por defecto):
cat /sys/module/nfsd/parameters/nfs4_disable_idmapping 
Y

Para desactivarlo en el servidor (por si estuviese a 'N'. Tiene que haber arrancado al menos una vez el server nfs):
echo "1" > /sys/module/nfsd/parameters/nfs4_disable_idmapping

Para marcarlo en el arranque:
# cat /etc/modprobe.d/nfsd.conf 
options nfsd nfs4_disable_idmapping=1



# Autofs
daemon which automatically mounts filesystems when you use them, and unmounts them later when you are not using them.  This can include network filesystems, CD-ROMs, floppies, and so forth.
/etc/auto.master
/nfs   /etc/auto.nfs

/etc/auto.nfs
assets       -rw,noatime 10.0.2.2:/export/assets

Cuando hagamos ls /nfs/assets se montará automáticamente el volumen

El directorio /nfs se montará al cargar autofs
