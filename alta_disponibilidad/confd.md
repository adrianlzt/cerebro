https://github.com/kelseyhightower/confd

Manage local application configuration files using templates and data from etcd

confd is a lightweight configuration management tool focused on:

keeping local configuration files up-to-date by polling etcd and processing template resources.
reloading applications to pick up new config file changes



Demonio que mantiene via etcd (cluster que mantiene pares clave-valor) ficheros de configuración. Y si se modifica alguno, chequea la nueva configuración y reinicia el demonio indicado.


# Install
No parece estar en muchos repos (alpine, centos), por lo que solemos bajar el binario directamente (chequear cual es la última versión)
wget https://github.com/kelseyhightower/confd/releases/download/v0.16.0/confd-0.16.0-linux-amd64


# Ejemplo con variables de entorno
El directorio por defecto es /etc/confd. Si lo metemos en otro sitio habrá que especificar -confdir


conf.d/telegraf.conf.toml
[template]
  src = "telegraf.conf.tmpl"
  dest = "telegraf.conf"

templates/telegraf.conf.tmpl
[redis]
  server = {{getenv "server"}}

server=abc confd -onetime -backend env -confdir .

Nos genera el fichero telegraf.conf donde ha cambiado el template por "abc"


Ejemplo para usarlo dentro de un Dockerfile
https://github.com/m-richo/docker-confd-example/blob/master/Dockerfile
