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

Para empezar tendremos que crear un template. Al crearlo nos preguntará si tendra un agente de icinga.

Luego podremos crear un host.



# Errores
Unable to authenticate, please check your API credentials (RestApiClient.php:182)
Tenemos que meter un user/pass de icinga2 en el director. Suele estar el user root definido en conf.d/api-users.conf
