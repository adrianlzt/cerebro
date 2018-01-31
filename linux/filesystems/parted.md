http://www.gnu.org/software/parted/manual/html_chapter/parted_2.html

Utilidad para manejar particiones


Mostrar discos:
parted -l

parted -lm
 salida parseable


Comandos dentro de parted:

print
  mostrar particiones

rm 2
  borrar particion 2

quit
  salir


Crear una nuea table/label en un disco:
parted> mktable gpt
