dd if=/dev/zero of=file count=2048
  crear fichero de 1MB

Se puede pasar un parámetro para escribir con O_DIRECT (sin caches ni readahead)


Crear fichero de 1GB
fallocate -l 1G test.img


Copia de una partición (copia tambien el espacio libre):
dd if=/dev/sda1 of=/srv/boot.img

Restaurar:
dd if=/srv/boot.img of=/dev/sda1


Con compresión:
dd if=/dev/sda1 | bzip2 -9f >/srv/boot2.img.bz2
bunzip2 -dc /srv/boot2.img.bz2 | dd of=/dev/sda1
