http://blog.creativeitp.com/posts-and-articles/linux/disk-analysis-with-fdisk-mmls-fsstat-and-fls/
https://help.ubuntu.com/community/DataRecovery
sleuthkit.md
testdisk.md
debugfs.md
mirar analisis_forense/
https://www.cs.montana.edu/courses/309/topics/4-disks/debugfs_example.html
  buscar "# You inadvertently delete a file you want back"

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
el fs (sin montar)


# XFS
http://jftp.inai.de/hxtools/
xfs_irecover(1) – recover lost inodes from XFS filesystems. (Not that XFS would be unstable - but it provides crucial measures to simplify extraction compared to other popular filesystems.)

xfs_irecover -D /dev/mapper/centos-root -o /mnt/

No recupera file names.



https://github.com/salviati/xfsr
no probado

https://github.com/ianka/xfs_undelete
The filename cannot be recovered
No probado


# photorec
http://www.cgsecurity.org/wiki/PhotoRec
recuperar ficheros borrados
No recupera nombres de fichero.

https://www.cgsecurity.org/wiki/PhotoRec_Step_By_Step

Tiene un menú ncurses que nos deja configurar la recuperación
photorec /dev/sdb1

Podemos recuperar de extN/XFS/etc

Podemos seleccionar que tipos de ficheros queremos recuperar.
