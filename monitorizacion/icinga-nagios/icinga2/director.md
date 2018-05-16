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
Si queremos pasar parametros a un service tendremos que ir a "Icinga Director -> Define data fields" (si no, tendremos los de por defecto al definir el command).
Hay crearemos los fields que se llamen igual que como estén definidos en los commands (los commands si los pilla de los ya definidos en /etc/icinga2).
-> No se hace asi, hay que ir a la sección "Fields" del command y crearlos desde allí.

Ejemplo, para poder definir un check_procs para un proceso:
  - miraremos el command "procs", veremos que la variable "procs_command" es la que se usa para pasar al parámetro -C
  - crearemos un "data field" con ese nombre
  - en el service que use procs, iremos a Fields y agregaremos el recien creado
  - cuando usemos ese service nos aparecerá un nuevo campo para poder definir esa variable (o dejarla en blanco para no poner el parametro)


Tambien podemos crear "Data lists". Es una lista que ofrece una serie de opciones.
Por ejemplo, la lista datacenter podria tener valores: LugarX, LugarY.
Podemos asignar esa lista a un data field, asi cuando creamos un nuevo host, elegimos en que datacenter esta.

Para poder asignar fields a hosts tenemos que hacerlo en el template. Ahí pondremos que fields aplican (sin definir el valor del campo)


## Clients
Si queremos que los checks se ejecuten en un client de icinga2 deberemos especificarlo en el host y en el service (si un host esta configurado para se ejecute por client, pero no sus services, los services se ejecutaran normalmente, asi que terminaran dándonos la info del nodo donde se ejecute icinga).
Lo que hago es crear una template de service "Generic Service Client" y todos los services hacemos que hereden de ahí.


# Commands
Al instalar icinga crea un monton de commands.
Los commands ahora llevan una variable por cada parámetro del check.
De esta manera, si queremos que el check_procs ejecute -C xxx, tendremos que definir un argument para "-C" y asignarle una variable.
En el que ya viene creado esto es por ejemplo:
        "-C" = {
            description = "Only scan for exact matches of COMMAND (without path)"
            value = "$procs_command$"
        }

Podemos tambien crear nuevos commands con el Director (aunque parece que no les podemos poner un Description).
Generalmente serán del tipo "Plugin Check Command" (diferenciando estos de las notificaciones y ¿eventos?)
Command pondremos: PluginDir + "/check_procs"
Donde PluginDir es una constante que viene con la instalacion y vale, en centos, /usr/lib64/nagios/plugins

Podemos crear un "Generic Command" donde especificar el timeout por defecto para el resto de commands que creemos.

Luego tendremos que crear los arguments:

Si por ejemplo tenemos que definir un argumento sin parámetros, por ejemplo -r en check_load, que debe o no ponerse para marcar si dividir el load entre el numero de CPUs.
En Argument name pondremos "-r"
En "Condition (set_if)" pondremos "percpu".

Ahora deberemos crear un "Data field" que se llame "percpu".
Si queremos poner el parámetro "-r", al implementar el service (o en el template), activaremos ese field.

Esto de crear un data field por cada parametro que queremos definir en un command me parece un poco infumable.




# CLI
cli_director.md
https://github.com/Icinga/icingaweb2-module-director/blob/master/doc/60-CLI.md

Podemos usar icingacli para generar hosts, services, etc


# API
https://github.com/Icinga/icingaweb2-module-director/blob/master/doc/70-REST-API.md

Tambien nos da una API con la que podemos consultar o crear objectos.

Obtener host
rector.md
url -u ansible:xxx -H "Accept: application/json" http://icinga.us/icingaweb2/director/host\?name\=store-0

Crear host:
curl -u ansible:xxx -H "Accept: application/json" http://icinga.us/icingaweb2/director/host -d '{"object_name": "store-0", "address": "1.1.1.1", "object_type": "object", "imports": ["Linux Server Icinga2 Agent"}}'


Con PUT y url: director/host\?name\=store-0 podemos actualizar



# Demo
https://www.icinga.com/demo/

Podemos coger ideas



# Errores
Unable to authenticate, please check your API credentials (RestApiClient.php:182)
Tenemos que meter un user/pass de icinga2 en el director. Suele estar el user root definido en conf.d/api-users.conf
