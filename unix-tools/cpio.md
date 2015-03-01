Extraer un rpm:
rpm2cpio paquete.rpm | cpio -idv
  -i: extract
  -d: generate directories
  -v: verbose

Mostrar contenido del paquete
cpio -t


Empaquetar:
ls | cpio -ov > directory.cpio
  -o: create. run in copy-out mode

find . -print | cpio -ov > tree.cpio

Con compresion:
find . -print | cpio -o | pbzip2 -c > imagen.cpio.bz
  pbzip es rapido
