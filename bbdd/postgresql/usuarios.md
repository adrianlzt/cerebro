Para consultar los usuarios y sus roles
\du
SELECT * FROM pg_roles; <- se puede ejecutar estando en cualquier bd


## Crear usuarios ##
http://www.postgresql.org/docs/8.4/interactive/sql-createuser.html
http://www.postgresql.org/docs/8.4/interactive/app-createuser.html
postgre lo llama roles
sudo -u postgres /bin/bash
createuser -DRSP nombre
  -D: no podrá crear bbdd
  -R: no podrá crear otros usuarios (roles)
  -S: no superuser
  -P: nos pedirá interactivamente el password

También podemos crear usuarios en SQL con:
CREATE USER 'pepe' PASSWORD 'blabla';

Por defecto tendrá permisos de escritura en la base de datos que se llame como el usuario.
Será necesario crearla previamente: CREATE DATABASE pepe;


## Modificar usuarios ##
http://www.postgresql.org/docs/devel/static/sql-alteruser.html

ALTER USER 'pepe' ...


## Privilegios / Permisos ##
https://www.postgresql.org/docs/current/sql-grant.html

Chequear permisos de una bbdd:
\dp

Permiso para acceder a una database:
GRANT CONNECT ON DATABASE NombreDatabase to "user";

Permiso para leer una tabla:
GRANT SELECT ON nombreTabla to user;

Permiso para editar una tabla.
GRANT UPDATE ON accounts TO joe;

Todos los permisos para una db.
GRANT ALL ON DATABASE basededatos TO joe;

Para conectarse a una base de datos distinta al nombre del usuario deberemos especificarlo con el parámetro -d


## Borrar usuarios ##
http://www.postgresql.org/docs/8.4/static/sql-dropuser.html
http://www.postgresql.org/docs/8.4/interactive/app-dropuser.html

dropuser nombre

DROP USER 'nombre';


## pg_hba.conf ##
El control de acceso a la base de datos se realiza desde el fichero pg_hba.conf (hba = host-base auth)
http://www.postgresql.org/docs/devel/interactive/auth-pg-hba-conf.html

Each record specifies a connection type, a client IP address range (if relevant for the connection type), a database name, a user name, and the authentication method to be used for connections matching these parameters. The first record with a matching connection type, client address, requested database, and user name is used to perform authentication. There is no "fall-through" or "backup": if one record is chosen and the authentication fails, subsequent records are not considered. If no record matches, access is denied.

Fichero de ejemplo en este directorio.

Tras modificar el fichero deberemos recargar la config (no hace falta reiniciar la bbdd):
# SELECT pg_reload_conf();

O desde la consola:
pg_ctl reload



## pg_ident.conf ##
Mapeos entre usuarios del SO y de la base de datos
Aquí se define que usuarios del SO pueden conectarse a que usuarios de la BD
