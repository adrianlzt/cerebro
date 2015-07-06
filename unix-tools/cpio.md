Extraer un rpm:
rpm2cpio paquete.rpm | cpio -idv
  -i: extract
  -d: generate directories
  -v: verbose

Mostrar contenido del paquete
cpio -t


Empaquetar:
find . -print | cpio -ov > tree.cpio
  -o: create. run in copy-out mode

Con compresion:
find . -print | cpio -o | pbzip2 -c > imagen.cpio.bz
  pbzip es rapido
