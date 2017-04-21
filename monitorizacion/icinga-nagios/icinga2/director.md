https://www.icinga.com/2016/03/24/icinga-director-released/
https://github.com/Icinga/icingaweb2-module-director/blob/master/doc/01-Introduction.md
https://github.com/Icinga/icingaweb2-module-director/blob/master/README.md


# Install
https://github.com/Icinga/icingaweb2-module-director/blob/master/doc/02-Installation.mdo

Crear bbdd y usuario en mysql o postgres

mysql -e "CREATE DATABASE director CHARACTER SET 'utf8';
   GRANT ALL ON director.* TO director@localhost IDENTIFIED BY 'some-password';"

Crear un nuevo database resouce en la interfaz web (Configuration / Application / Resources)
Elegir utf8 como el encoding.

Instalar el modulo. Tenemos que copiar el repo https://github.com/Icinga/icingaweb2-module-director en /usr/share/icingaweb2/modules/director
cd /usr/share/icingaweb2/modules/
git clone https://github.com/Icinga/icingaweb2-module-director.git director

Activarlo desde la interfaz web: Configuration, Modules, director - and enable the module

Veremos un nuevo elemento en el menu. Vamos a él y seguimos los pasos que nos indica.

Antes de meter el director configure para usar agentes (con icinga2 node wizard). Esto creo que me creó algunas partes que me pide ahora.
El "Endpoint" creo que es el CN del master.
api user y pass lo tengo en features-enabled/api.conf


# Configuracion
El director no hace uso del dir /etc/icinga2
El envia mediante la API configuraciones "packages" que se almacenan en /var/lib/icinga2/api/packages

Para configurar cosas primero tendremos que crear templates (parece que no pilla los que puedan venir definidos en /etc/icinga2).
Por ejemplo, definiremos un "Linux Server", y luego otro que herede de este para los que usan el cliente de icinga "Linux Server Client".
Haremos de forma parecida con los services.

Crearemos un host a partir de un template de host.

Cuando queremos crear un service, lo haremos a partir de un template.
Luego, en un host, aplicaremos ese service.
Si queremos pasar parametros a un service tendremos que ir a "Icinga Director -> Define data fields".
Hay crearemos los fields que se llamen igual que como estén definidos en los commands (los commands si los pilla de los ya definidos en /etc/icinga2).

Ejemplo, para poder definir un check_procs para un proceso:
  - miraremos el command "procs", veremos que la variable "procs_command" es la que se usa para pasar al parámetro -C
  - crearemos un "data field" con ese nombre
  - en el service que use procs, iremos a Fields y agregaremos el recien creado
  - cuando usemos ese service nos aparecerá un nuevo campo para poder definir esa variable (o dejarla en blanco para no poner el parametro)



# CLI
https://github.com/Icinga/icingaweb2-module-director/blob/master/doc/60-CLI.md

Podemos usar icingacli para generar hosts, services, etc


# API
https://github.com/Icinga/icingaweb2-module-director/blob/master/doc/70-REST-API.md

Tambien nos da una API con la que podemos consultar o crear objectos.




# Demo
https://www.icinga.com/demo/

Podemos coger ideas



# Errores
Unable to authenticate, please check your API credentials (RestApiClient.php:182)
Tenemos que meter un user/pass de icinga2 en el director. Suele estar el user root definido en conf.d/api-users.conf
