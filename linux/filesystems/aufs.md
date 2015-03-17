advanced multi layered unification filesystem implements a union mount for Linux file systems.
Aufs is a stackable unification filesystem such as Unionfs, which  unifies  several  directories  and provides a merged single directory.
http://aufs.sourceforge.net/

Para RedHat-like mirar funionfs.d

Esto mismo pero a nivel de bloques: virtualizacion/qemu/qcow2.md

Copy-on-write file-system level VS block level:
  En AUFS, si modificamos un fichero de la capa base, este se copia entero a la capa c-o-w. Si estamos trabajando creando muchos ficheros, aufs estará bien, pero si estamos modificando varios ficheros muy grandes, perderá eficiencia.
  qcow2 al trabajar con bloques no se trae el nuevo fichero entero, solo modifica en la caap c-o-w el bloque necesario. En este caso, si trabajamos con muchos ficheros pequeños, podremos estar perdiendo eficiencia, porque se estarán copiando cada vez bloques de 4k/512b o lo que sea.


Ejemplo, montar el contenido de dos directorios (files1/ y files2/) en un único directorio files/
mount -t aufs -o dirs=/tmp/files1:/tmp/files2 none /tmp/files

En el fstab:
  none    /tmp/files     aufs    dirs=/tmp/files1:/tmp/files2 0 0




Crear una capa sobre un directorio, y usar copy-on-write para almacenar los cambios
mkdir -p /tmp/aufs/home <- los ficheros de mi home que no quiero modificar
mkdir /tmp/aufs/write <- donde se almacenarán los cambios
mkdir /tmp/aufs/nuevohome <- donde deberé trabajar

mount -t aufs -o br=/tmp/aufs/write:/tmp/aufs/home none /tmp/aufs/nuevohome
  br viene de branches, que es como le llaman en vez de dirs
  Montamos la branch "/tmp/aufs/write" como rama de "/tmp/aufs/home"

Los ficheros que creemos o modifiquemos en nuevohome/ realmente se crearán en write/, de manera que home/ no se verá modificado.



Usos:

Meter una configuración nueva pero no queremos tocar la estructura de ficheros que hay por debajo.

Montar un fs por encima para ver que ficheros toca una instalación automática


Montar recubrimiento para /etc
mkdir -p /tmp/aufs/etc
mount -t aufs -o br=/tmp/aufs/write:/etc none /etc


Crear recubrimiento sobre todos los dirs del sistema (debian 7.7)
for i in bin/ boot/ etc/ home/ lib lib64/ media/ mnt/ opt/ root/ sbin/ srv/ tmp/ usr/ var/; do
mkdir -p /aufs/$i
mount -t aufs -o br=/aufs/$i:/$i none /$i
done

Ahora podemos hacer una instalación, por ejemplo:
apt-get install vsftpd

Y en /aufs veremos todo lo que ha cambiado en el sistema.

Para dejar el sistema como estaba haremos (si no paramos vsftpd y utilizamos una copia de umount, no nos dejará desmontar ni /usr ni /bin):
pkill vsftpd
cp /bin/umount /aufs/
cd /aufs
for i in bin/ boot/ etc/ home/ lib lib64/ media/ mnt/ opt/ root/ sbin/ srv/ tmp/ usr/ var/; do
./umount /$i
done

Con esto dejaremos al sistema en su estado inicial.
