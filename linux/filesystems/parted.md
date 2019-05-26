http://www.gnu.org/software/parted/manual/html_chapter/parted_2.html

Utilidad para manejar particiones

gparted -> x11


Mostrar discos:
parted -l

parted -lm
 salida parseable

Primero definir el tipo de partition table a usar, luego crear una particion linux que ocupe todo el disco
parted -a optimal /dev/sdb mklabel gpt
parted -a optimal /dev/sdb mkpart primary ext4 0% 100%
mkfs.ext4 /dev/sdb1
  si no tenemos ese comando: yum install e2fsprogs

parted -a optimal mkpart primary 0% 600G
  partición primaria de 600GB sin especificar tipo de FS


parted -a minimal /dev/sdb mkpart primary xfs 0% 100%
  crear una partición primaria en sdb tipo xfs que ocupe todo el disco y esté alineada de manera minimal


Parece que a parted no podemos decirle que cree una partición en el siguiente espacio libre y siempre tenemos que darle un start y un end.
Lo más sencillo es hacer un "print free" y empezar donde empieza el hueco libre.



Modo interactivo:
parted /dev/sda
  entramos en modo interactivo para editar el disco sda


Comandos dentro de parted:

print
  mostrar particiones
unit MB print free
  mostrar en MB y enseñando los huecos libre

rm 2
  borrar particion 2

resizepart
  cambiar tamaño de una partición

quit
  salir


Crear una nuea table/label en un disco:
parted> mktable gpt
