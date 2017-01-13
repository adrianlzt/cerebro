Mirar escrituras y lecturas a los discos
# vmstat -d
# vmstat -p /dev/sda1  (se puede restringir a una sola partición)

Resumen sobre la escritura a disco
# vmstat -D


Para conocer los nombres de los discos cuando son tipo dev...
lsblk
/proc/diskstats


Nombres uuid:
sudo blkid
