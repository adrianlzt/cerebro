Mostrar dispositivos de bloques

Mirar tambien device-mapper.md para sacar los registrados en device-mapper

Tal vez buscamos blkid?

Ver los file systems en los dispositivos:
lsblk -f

Si queremos ver el LUN:
lsblk -o NAME,HCTL,SIZE,MOUNTPOINT
