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
