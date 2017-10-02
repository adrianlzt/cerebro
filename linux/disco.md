Mirar escrituras y lecturas a los discos
# vmstat -d
# vmstat -p /dev/sda1  (se puede restringir a una sola partición)

Resumen sobre la escritura a disco
# vmstat -D


Para conocer los nombres de los discos cuando son tipo dev...
lsblk
/proc/diskstats

dm10 corresponderá al disco TYPE=dm MIN=10 (creo)
/dev/dm-9

Nombres uuid:
sudo blkid
