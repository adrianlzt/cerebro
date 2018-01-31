http://www.gnu.org/software/parted/manual/html_chapter/parted_2.html

Utilidad para manejar particiones


Mostrar discos:
parted -l

parted -lm
 salida parseable


parted -a minimal /dev/sdb mkpart primary xfs 0 100%
  crear una partición primaria en sdb tipo xfs que ocupe todo el disco y esté alineada de manera minimal


Comandos dentro de parted:

print
  mostrar particiones

rm 2
  borrar particion 2

resizepart
  cambiar tamaño de una partición

quit
  salir


Crear una nuea table/label en un disco:
parted> mktable gpt
