# Install
https://www.revive-adserver.com/support/installation/

Meter el .tar.gz en el root dir de un server web
Crear una base de datos, tipo revive_adserver_4 en mysql o postgresql.

CREATE DATABASE 'revive_adserver_4';
CREATE USER 'revive'@'%' IDENTIFIED BY 'XXXXX';
GRANT ALL ON revive_adserver_4.* TO 'revive'@'%';

