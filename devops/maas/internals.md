Se le pasan datos en la linea de boot, como la ip del server de los metadatos.
Mirar que dan los metadatos.
Squid le da acceso para bajarse cosas de ubuntu.
Se baja scripts.
Como sube los resultados?





http://www.syslinux.org/wiki/index.php/PXELINUX#Configuration_filename

1.- El cliente se conecta al servidor DHCP
2.- Este, además de la IP y conf de red, le da un servidor TFTP (Next Server), un path (boot file name, opción 210) y un fichero (configuration file, opción 20)
    Podemos ver que le dan ejecutando un programa que simule un cliente dhcp: networking/dhcp/python.md
3.- El servidor se conecta a TFTP
    El servicio maas-clusterd (pserv) es el que escucha tftp. Si queremos activar el log editar /etc/init/maas-pserv y poner un fichero en --logfile
    Se baja el fichero especificado por el path+fichero (maas no pone fichero, solo el path. Aqui http://www.syslinux.org/wiki/index.php/PXELINUX#Configuration_filename viene indicado el orden de fichero que se va probando a bajar))
    pserv pregunta a la API para ver que ficheros de configuración ofrecer al nodo (http://192.168.1.44/MAAS/api/1.0/pxeconfig/?cluster_uuid=2bd3cdb4-9bb9-4559-948a-a1f3f5c46b96&local=192.168.1.44&mac=00-9c-02-8e-02-6a&remote=192.168.1.205) dando como parámetros la MAC e IP del nodo.
    Si es un nodo desconocido se cogerá el fichero "default" (pserv no generará ningún otro, así que el nodo irá pidiendo hasta llegar al default).
    Si el nodo es conocido, cuando pregunte por el fichero de confiuuración que lleva su mac como nombre se le ofrecerá (pxelinux.cfg/01-00-9c-02-8e-02-6a, el primer 01 no pertenece a la MAC)
    $ tftp ip-del-server
    > get pxelinux.cfg/<FICHERO>
4.- En el <FICHERO> se especifica que entrada ejecutar (mediante DEFAULT). Si, por ejemplo, el nodo ya está instalado, este fichero le dirá que pase al arranque del disco local.
5.- Esta apuntará a ifcpu64.c32, programa (http://www.syslinux.org/wiki/index.php/Ifcpu64.c32) que mirará la CPU para saber la arquitectura y ejecutará la label que indiquemos primero en caso de 64 bits, la segunda en caso de 32. Mediante tftp se bajara el ifcpu64.c32
5.- Si somos 64 bits irá a la entrada amd64 y se bajará el kernel y el initrd con tftp (el fichero default dira donde buscar el root y el initrd, algo tipo ubuntu/amd64/generic/trusty/release/boot-kernel y boot-initrd)
6.- Se ejecutará el kernel con los parametros definidos en APPEND (http://www.syslinux.org/wiki/index.php/Config#APPEND) y "IPAPPEND 2", which passes the hardware address of the boot interface to the kernel as acommand-line option
7.- Opciones pasadas al kernel:
      - nomodeset
          not load video drivers and use BIOS modes instead until X is loaded
          http://askubuntu.com/questions/207175/what-does-nomodeset-do
      - iscsi_target_name=iqn.2004-05.com.ubuntu:maas:ephemeral-i386-generic-trusty-release
      - iscsi_target_ip=192.168.1.44
      - iscsi_target_port=3260
      - iscsi_initiator=maas-enlist
      - root=/dev/disk/by-path/ip-192.168.1.44:3260-iscsi-iqn.2004-05.com.ubuntu:maas:ephemeral-i386-generic-trusty-release-lun-1
          cargamos un disco mediante SCSI en red en la máquina
          http://backreference.org/2013/12/23/diskless-iscsi-boot-with-pxe-howto/
      - ip=::::maas-enlist:BOOTIF
          valor de la ip del servidor? ipv6?
      - ro
          mount root file system as read-only
      - overlayroot=tmpfs
          se monta una particion tmpfs encima de / para almacenar los cambios
          https://github.com/larsks/cloud-initramfs-tools/blob/master/overlayroot/etc/overlayroot.conf
      - cloud-config-url=http://192.168.1.44/MAAS/metadata/latest/enlist-preseed/?op=get_enlist_preseed
          parametro para cloud-init  - https://github.com/number5/cloud-init/blob/master/doc/sources/kernel-cmdline.txt
          cuando arranque cloud-init, este buscará ese parámetro en las opciones del kernel y hara un GET de esa url
          Ese GET le dará un fichero de cloud-config que procesará segun se especifica en https://help.ubuntu.com/community/CloudInit
          en este caso se pasa el endpoint del metadata url
          en http://192.168.1.44/MAAS/metadata/enlist/latest/user-data tendremos el script que se baja y ejecuta en la maquina
      - log_host=192.168.1.44
      - log_port=514
        Causes the installer to send log messages to a remote syslog on the specified host and port as well as to a local file. If not specified, the port defaults to the standard syslog port 514.
        Se guardan los mensajes en el region-controller /var/log/maas/rsyslog/%HOSTNAME%/%$YEAR%/%$MONTH%/%$DAY%/messages
        El problema es que la configuración para aceptar estas conexiones está en el cluster-controller.
        Parece que no funciona el tema del log

8.- Se sigue el proceso de boot: the boot process will load the kernel and an initial ramdisk; then the kernel converts initrd into a "normal" ramdisk, which is mounted read-write as root device; then /linuxrc is executed; afterwards the "real" root file system is mounted, and the initrd file system is moved over to /initrd; finally the usual boot sequence (e.g. invocation of /sbin/init) is performed. initrd is used to provide/load additional modules (device driver). For example, SCSI or RAID device driver loaded using initrd.
9.- El contenido de initrd se puede ver, mirar linux/initramfs.md. Se ejecuta el script init. Este ejecuta a su vez programas de /scripts/
    Estos scripts montan una unidad iSCSI con un ubuntu y le ponen un overlayfs (file system de recubrimiento en memoria) para poder escribir cambios.
10.- Al final de /init se llama a /bin/run-init que carga el sistema de verdad, la imagen iSCSI+overlayfs (algo tipo /var/lib/maas/boot-resources/snapshot-20150131-194329/ubuntu/i386/generic/trusty/release/root-image), que ya contiene todos los programas a correr, entre ellos cloud-init (/etc/init/cloud-init.conf)
11.- Se ejecuta cloud-init con el siguente user-data
            - se pasa un proxy para apt (http://192.168.1.44:8000/, en el 8000 escucha squid, configurado para cachear debian/ubuntu)
            - cosas de IPMI
              crear usuario ubuntu con password random
              configurar dhcp
            - se crea el script maas-enlist
              Obtiene la mac, arquitectura, hostname y power type.
              Con estos datos se lanza un curl para registrar el host (api sobre apache+mod_wsgi):
                        curl \
                          --data-urlencode "op=new" \
                          --data-urlencode "autodetect_nodegroup=1" \
                          --data-urlencode "hostname=${hostname}" \
                          --data-urlencode "architecture=${arch}" \
                          --data-urlencode "subarchitecture=${subarch}" \
                          --data-urlencode "power_type=${power_type}" \
                          --data-urlencode "power_parameters=${power_params}" \
                          ${macparms} http://192.168.1.44/MAAS/api/1.0/nodes/
             El nombre del host se intenta conseguir con resolución inversa de dns
               host=$(dig +short -x $ip)  && host=${host%.}
             Parece que el powertype aqui solo mira si es ipmi o moonshot. Las otras opciones, virsh y etherwake, no las configura.

             Si no consigue registrarse nos abre la shell para que investiguemos.


Cuando el nodo ya ha sido commisioned y se va a proceder a instalar, el parámetro cloud-config-url cambia para apuntar a una url específica para el nodo. En esa url se le devolverá el preseed adecuado a como se quiera instalar. Mirar curtin.md para el caso de fastpath

Cuando el nodo ya quiere cargar del disco local, habla con la API para decirle que el PXE que cargue sea el de carga de disco local.
Creo que esto era parte del preseed de la instalacion.
    in-target wget --no-proxy "http://192.168.1.44/MAAS/metadata/latest/by-id/node-3c0daaa0-9f31-11e4-8a23-080027201064/" --post-data "op=netboot_off" -O /dev/null && \

