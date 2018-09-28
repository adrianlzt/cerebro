https://theforeman.org/manuals/1.19/index.html#4.4Provisioning
https://www.youtube.com/watch?v=eHjpZr3GB6s

Ir a Hosts -> Operating System
Dar a nuevo e ir eligiendo las opciones en el menú.
Para ubuntu, en release name, poner la que aparezca aqui: http://archive.ubuntu.com/ubuntu/dists/ porque se usará para bajar los ficheros


Los templates son los "scripts" que se usan para arrancar por PXE, provisionar, post-instal, etc


Tendremos que crear una subnet (en "Infrastructure") para poder provisionar maquinas.


Asocio el template "Preseed default PXELinux" al sistema operativo Ubuntu que he creado.
Tras esto volveremos al operating system, pestaña templates y seleccionaremos el template de pxe que hemos añadido.

Haremos lo mismo para los templates:
Preseed default
Preseed default finish



Crear un host "unattended".
  Deploy On: Bare metal
  Rellenar tambien environment, puppet master y puppet ca
  En la pestaña operating system seleccionar el SO que hemos creado y las opciones que correspondan
  Pass rootroot
  Agregaremos una interfaz, poniendo la MAC de la tarjeta de red que arrancara el pxe

Tras dar a guardar se bajará la info de ubuntu y creará los ficheros para PXE necesarios.
/var/lib/tftpboot/pxelinux.cfg/MAC-QUE-HAYAMOS-PUESTO-MINUSCULAS



Nos falta tener el server dhcp. Lo podemos instalar con:
puppet module install theforeman-dhcp

La configuración que le he aplicado:
classes:
  concat::setup: 
  dhcp:
    hosts:
      unattended.usync.us:
        mac: 01:08:00:27:b4:6a:4d
        ip: 10.0.2.161
    interface:
    - eth1
    nameservers:
    - 10.0.2.51
    - 8.8.8.8
    - 8.8.4.4
    pools:
      10_2_net:
        network: 10.0.2.0
        mask: 255.255.255.0
        range: 10.0.2.170 10.0.2.190
        gateway: 10.0.2.51
    pxefilename: "${dhcp::params::pxefilename}"
    pxeserver: 10.0.2.117




El servidor obtendrá una ip por DHCP.
Se bajará unos ficheros con tftp, el importante será: /var/lib/tftpboot/pxelinux.cfg/01-08-00-27-b4-6a-4d (con la mac que hayamos registrado al crear el host en foreman)
Ahi pone de donde se bajará el siguiente fichero de configuracion a aplicar.
