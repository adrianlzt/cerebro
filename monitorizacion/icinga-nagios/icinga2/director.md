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
