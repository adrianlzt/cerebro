http://www.gnu.org/software/parted/manual/html_chapter/parted_2.html

Utilidad para manejar particiones


Mostrar discos:
parted -l

parted -lm
 salida parseable


parted -a minimal /dev/sdb mkpart primary xfs 0 100%
  crear una partición primaria en sdb tipo xfs que ocupe todo el disco y esté alineada de manera minimal

Parece que a parted no podemos decirle que cree una partición en el siguiente espacio libre y siempre tenemos que darle un start y un end.



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
