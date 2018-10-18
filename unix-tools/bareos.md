https://www.bareos.org

Fork de bacula
Enterprise backup



# Config
Diagramas para enteder la config:
http://www.bacula.org/2.4.x-manuals/en/main/Conf-Diagram.png
http://wiki.defcon.no/_media/guides/bacup/bacula-config-relations.png?w=499


# Install
## Ansible
https://github.com/bashrc666/ansible-role-bareos

Por defecto usa mysql.
Hay un parámetro para poner "postgresql"

http://10.0.2.2/bareos-webui/



# Config

## Server
Ficheros que enlazan con los clientes:
/etc/bareos/bareos-dir.conf
/etc/bareos/clientdefs/HOSTNAME_CLIENTE.conf


## Cliente
/etc/bareos/bareos-fd.conf
Aqui pondremos la password que tendra que usar el server para contactarnos

Para desplegar los clientes necesitamos la password del dir y del mon. Las podemos encontrar aqui:
bareos-sd.d/director/bareos-mon.conf
bareos-sd.d/director/bareos-dir.conf
