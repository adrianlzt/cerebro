http://blog.creativeitp.com/posts-and-articles/linux/disk-analysis-with-fdisk-mmls-fsstat-and-fls/
https://help.ubuntu.com/community/DataRecovery
sleuthkit.md
testdisk.md
debugfs.md
mirar analisis_forense/
https://www.cs.montana.edu/courses/309/topics/4-disks/debugfs_example.html
  buscar "# You inadvertently delete a file you want back"

http://www.cgsecurity.org/wiki/PhotoRec  recuperar ficheros borrados
Scalpel
foremost
  usan la técnica carving. Va analizando el contenido de los inodos e identificando el tipo de fichero (analiza los magic files)
  no suelen recuperar el nombre (ext*), porque se almacena en la tabla de inodos
  tampoco la estructura de directorios


Si tenemos problemas para montar una partición, podemos escanear las particiones con mmls (de sleuthkit.md) y luego montarlas definiendo el offset:
$ mmls -t gpt /dev/sdb
...
Units are in 512-byte sectors
...
05:  01      0000004096   0073404415   0073400320   Linux filesystem
...

4096*512=2097152

mount -o loop,offset=2097152 -t ext4 /dev/sdb /mnt


# NTFS

sudo mmls -t gpt /dev/sdb
     Slot    Start        End          Length       Description
07:  03      0001845248   0941760511   0939915264   Basic data partition

1845248*512=944766976

sudo mount --ro -o loop,offset=944766976 -t ntfs /dev/sdb /mnt


Recuva (de la gente de CCleaner) si recupera NTFS con la estructura de directorios.



disk_stat: muestra si hay HPA (https://en.wikipedia.org/wiki/Host_protected_area) en el disco


sorter -f <filetype> -d <dir_out> image/fs
  nos hace un resumen de lo que contiene la imagen o el fs (sin montar)
