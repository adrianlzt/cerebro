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

# Arquitectura
bareos-dir: director, punto central de control
bareos-sd: el que almacena la info.


El director crea una configuración "Storage" donde apunta a un sd, con un nombre de "Device" específico (debe matchear el Name y el Media Type)
El sd tiene creado un "Device" con ese nombre y en la config se decide que tipo de almacenamiento usar (por ejemlo, File y un directorio)


## Almacenamiento
Podemos tener varios "Devices" de almacenamiento.
Luego tenemos los "Pools", que definen la retención, máximo espacio usado y máximo número de volumenes que se van crear
Estos pools se concretan en volúmenes y estos volumenes son ficheros que podemos ver en el sistema de ficheros (formato especial de bacula).

Parece que los JobDefs son quien seleccionan que Pool y que Device usar.


# Config

## Server
Ficheros que enlazan con los clientes:
/etc/bareos/bareos-dir.conf
/etc/bareos/clientdefs/HOSTNAME_CLIENTE.conf

En este fichero se creará el job de monitorización y se dirá de que se va a hacer backup.
Esta job será disparada por un scheduler (que estará definido en otro sitio)

## Cliente
/etc/bareos/bareos-fd.conf
Aqui pondremos la password que tendra que usar el server para contactarnos

Para desplegar los clientes necesitamos la password del dir y del mon. Las podemos encontrar aqui:
bareos-sd.d/director/bareos-mon.conf
bareos-sd.d/director/bareos-dir.conf



## Crear la config de un nuevo cliente con la consola
$ bconsole
*configure add client name=client2-fd address=192.168.0.2 password=secret

Generará el fichero del server (/etc/bareos/bareos-dir.d/client/client2-fd.conf) y el fichero que debemos poner en el cliente (/etc/bareos/bareos-dir-export/client/client2-fd/bareos-fd.d/director/bareos.conf)


