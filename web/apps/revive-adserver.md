# Install
https://www.revive-adserver.com/support/installation/

Meter el .tar.gz en el root dir de un server web
Crear una base de datos, tipo revive_adserver_4 en mysql o postgresql.

CREATE DATABASE 'revive_adserver_4';
CREATE USER 'revive'@'%' IDENTIFIED BY 'XXXXX';
GRANT ALL ON revive_adserver_4.* TO 'revive'@'%';

Arrancar un server web con soporte php y apuntarlo al directorio de la app.
Comenzará una instalacion web.

Requiere php 5.5.9 o mayor
Usar los repos de ius e instalar
php56u
