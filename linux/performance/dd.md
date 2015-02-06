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

Dump 6 bloques de 4k cada uno del comienzo del disco:
dd if=/dev/sdb of=sdb.part bs=4k count=6


# Probar performance
https://www.thomas-krenn.com/en/wiki/Linux_I/O_Performance_Tests_using_dd

dd if=/dev/zero of=/root/testfile bs=1G count=1 oflag=direct



I would not recommend using /dev/urandom because it's software based and slow as pig
