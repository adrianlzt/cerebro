http://www.combodo.com/spip.php?page=rubrique&id_rubrique=8

CMDB

Base de datos con los sistemas que tiene una organización.



# Docker
docker run -d -p 6010:80 --name=my-itop vbkunin/itop:2.3.3


Al iniciar la conf, en database:
localhost
root
sin password


# Api
Ejemplos
https://github.com/jaimevalero78/itop-utilities


# Backup
iTop tiene un sistema para realizar automaticamente backups.
Mirar en la config para ver si lo tenemos activo.
Lo que hace es almacenar la config y un dump de la bbdd.

Restauración
https://wiki.openitop.org/doku.php?id=2_1_0:admin:backup#restoring_a_backup

Restaurar usando la imagen docker
docker run -d -p 7010:80 --name=test-itop vbkunin/itop:2.3.3
Proceder con una instalacion normal de iTop (creará el resto de ficheros necesarios).
Usar como nombre de base de datos "itop"
"Install a new iTop"
"Sample data" -> production
docker cp itop-2017-04-23_17_52.zip test-itop:/mnt
docker exec -it test-itop /bin/bash
d$ cd /mnt
d$ unzip *.zip
d$ mysql -e "DROP DATABASE itop; CREATE DATABASE itop"
d$ mysql itop < itop-dump.sql
d$ install -o www-data -g www-data -m 0444 config-itop.php /app/conf/production/
En la interfaz web ir a "/env-production/itop-config/config.php" y dar a "Apply"
