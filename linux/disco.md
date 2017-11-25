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



# Desconectar disco duro
yum install hdparm -y
hdparm -y /dev/sdx
  ponerlo en modo standby
hdparm -Y /dev/sdx
  ponerlo en modo sleep (reiniciar para recuperar el disco)

Tras esto los sigo viendo en fdisk


http://www.redhatgeek.com/linux/remove-a-disk-from-redhatcentos-linux-without-rebooting-the-system
echo "offline" > /sys/block/sda/device/state
echo "1" > /sys/block/sda/device/delete

Tras esto ya no aparecen en fdisk
