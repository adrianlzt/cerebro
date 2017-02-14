mirar guymager.md, gráfica

https://www.vidarholen.net/contents/blog/?p=479
  Want to simulate a lseek+execve? Use dd! Want to open a file with O_SYNC? Use dd! Want to read groups of three byte pixels from a PPM file? Use dd

mirar time.md (info sobre iowait)

dd if=/dev/zero of=file bs=1M count=1
  crear fichero de 1MB

Si usamos un bs alto, necesitaremos tanta memoria disponible como tamaño del bs.
Asi que mejor coger un bs pequeño y subir el count.

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

dd if=/dev/urandom of=500megabytes bs=1M count=500
524288000 bytes (524 MB) copied, 112.743 s, 4.7 MB/s

dd if=/dev/zero of=500megabytesbis bs=1M count=500
524288000 bytes (524 MB) copied, 1.33937 s, 391 MB/s


# Con barra de progreso
dd if=/lugar/de/origen | pv | dd of=/lugar/de/destino


# Crear sistema de ficheros en un fichero
dd if=/dev/zero of=file bs=1M count=1
mkfs.ext2 file
sudo mount file /mnt


# Montar una imagen .dd
mirar unix-tools/losetup.md

# Analizar una imagen .dd
fdisk -l imagen.dd
