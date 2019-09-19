Los usuarios y los grupos son roles.
Los roles pueden agruparse jerárquicamente (un rol contienen otros roles)
Son "nombres" que tienen permisos.
La diferencia entre un grupo y un usuario sería que los usuarios pueden logearse (LOGIN privilege).

Generalmente tendremos roles genéricos, por ejemplo "developer", "admin", etc, que se los asignaremos a usuarios que se logean.
Los permisos generalemnte los asignaremos a esos "grupos".
Podemos evitar la herencia de permisos de los grupos si ponemos NOINHERIT
Esto se puede mezclar con "set role", para ir cambiando del rol que tenemos. Ejemplo:
 logueamos como pepe
 hacemos set role a "admin" (ahora tendremos el session role, "pepe", más el role "admin")
 reset rol, ahora solo somos "pepe"

Un role por usuario y por app.
"Group" roles, uno por funcionalidad.
Y asignar esos roles con permisos a los usuarios/aplicaciones.

Por defecto, los roles tendrán acceso al schema "public" en todas las db.
Podemos modificar los privileges por defecto:
ALTER DEFAULT PRIVILEGES ...


Ownership: cuando creas un objeto (ej.: tabla), te pertenece, tienes todos los permisos sobre él.
El ownership solo puede tenerlo un role, el que crea la tabla. Se puede cambiar: ALTER TABLE foo OWNER TO otherUser;
Solo el owner puede DROP/ALTER/GRANT


Los superusers pueden hacer cualquier cosa. Incluso pueden borrar las trazas de lo que han hecho.
No se puede hacer REVOKE a superadmins.



Para consultar los usuarios y sus roles
\du+
SELECT * FROM pg_roles; <- se puede ejecutar estando en cualquier bd


## Crear usuarios (roles con login privilege)
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
CREATE USER pepe PASSWORD 'blabla';

Por defecto tendrá permisos de escritura en la base de datos que se llame como el usuario.
Será necesario crearla previamente: CREATE DATABASE pepe;


## Modificar usuarios ##
http://www.postgresql.org/docs/devel/static/sql-alteruser.html

ALTER USER 'pepe' ...

### cambiar password
alter user postgres password 'xxx';

### dar roles a posteriori:
alter user usuario createdb;


## Privilegios / Permisos ##
https://www.postgresql.org/docs/current/sql-grant.html

Chequear permisos de una bbdd:
\dp

Explicación output:
rolename=xxxx -- privileges granted to a role
        =xxxx -- privileges granted to PUBLIC

            r -- SELECT ("read")
            w -- UPDATE ("write")
            a -- INSERT ("append")
            d -- DELETE
            D -- TRUNCATE
            x -- REFERENCES
            t -- TRIGGER
            X -- EXECUTE
            U -- USAGE
            C -- CREATE
            c -- CONNECT
            T -- TEMPORARY
      arwdDxt -- ALL PRIVILEGES (for tables, varies for other objects)
            * -- grant option for preceding privilege

        /yyyy -- role that granted this privilege

Tenemos distintos privilegios según el tipo de objeto (schema, tabla, function, etc).
Un usuario con acceso a un schema puede crear objetos en él.
Privilegios para schemas:
  CREATE
  USAGE
  ALL

Tipos de privilegios para tablas:
  SELECT (tambien permite COPY TO)
  INSERT (tambien permite COPY FROM)
  UPDATE, DELETE (posiblemente necesite SELECT)
  REFERENCES (para poder hacer referencia a otras columas de tablas a las que no tienes permisos, generalemente porque tendremos una columna referenciada a esa tabla que no tenemos acceso)
  TRIGGER

GRANT roleX to roleY;
REVOKE roleX to roleY;

La opción "WITH GRANT OPTION" es para que un role pueda dar ese privilegio a otros roles.

CUIDADO! Si quitamos a un role la opción de hacer INSERT, pero ese role pertenece a otro "grupo" que si le da el permiso, lo seguirá teniendo.
Siempre que tengas un camino con permiso con alguno de los roles, podras hacer las cosas.


Permiso para acceder a una database:
GRANT CONNECT ON DATABASE NombreDatabase to "user";

Permiso para leer una tabla:
GRANT SELECT ON nombreTabla to user;

Permiso para editar una tabla.
GRANT UPDATE ON accounts TO joe;

Todos los permisos para una db.
GRANT ALL ON DATABASE basededatos TO joe;

Quitar permisos a un role:
REVOKE SELECT ON public.events FROM auditor;



## Borrar usuarios ##
http://www.postgresql.org/docs/8.4/static/sql-dropuser.html
http://www.postgresql.org/docs/8.4/interactive/app-dropuser.html

dropuser nombre
  comando unix

DROP USER 'nombre';


## Parámetros usuarios
Consultar:
\drds

### Limitar tiempo queries
Timeout: limitar a NOMBREROLE para que las ejecuciones no puedan durar más de 1s:
alter role NOMBREROLE set statement_timeout=1000;
Esto solo aplica cuando el user vuelve a conectar.



## Cerrar sesiones de usuario
select pg_terminate_backend(15705);
  mirar el pid en pg_stat_activity
  mirar status.md para notas sobre usar esta función



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
