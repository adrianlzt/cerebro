advanced multi layered unification filesystem implements a union mount for Linux file systems.
Aufs is a stackable unification filesystem such as Unionfs, which  unifies  several  directories  and provides a merged single directory.
http://aufs.sourceforge.net/

Para RedHat-like mirar funionfs.d


Ejemplo, montar el contenido de dos directorios (files1/ y files2/) en un único directorio files/
mount -t aufs -o dirs=/tmp/files1:/tmp/files2 none /tmp/files

En el fstab:
  none    /tmp/files     aufs    dirs=/tmp/files1:/tmp/files2 0 0




Crear una capa sobre un directorio, y usar copy-on-write para almacenar los cambios
mkdir /tmp/aufs/home <- los ficheros de mi home que no quiero modificar
mkdir /tmp/aufs/write <- donde se almacenarán los cambios
mkdir /tmp/aufs/nuevhome <- donde deberé trabajar

mount -t aufs -o br=/tmp/aufs/write:/tmp/aufs/home none /tmp/aufs/nuevohome

Los ficheros que creemos o modifiquemos en nuevohome/ realmente se crearán en write/, de manera que home/ no se verá modificado.



Usos:

Meter una configuración nueva pero no queremos tocar la estructura de ficheros que hay por debajo.

Montar un fs por encima para ver que ficheros toca una instalación automática
