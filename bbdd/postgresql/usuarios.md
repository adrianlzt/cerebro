https://www.postgresql.org/docs/12/user-manag.html

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


No se puede hacer REVOKE a superadmins.
Los superusers pueden hacer cualquier cosa. Incluso pueden borrar las trazas de lo que han hecho.



Para consultar los usuarios y sus roles
\du+
SELECT * FROM pg_roles; <- se puede ejecutar estando en cualquier bd
SELECT rolname, rolpassword FROM pg_authid;
  aqui vemos la pass en md5

Si queremos meter la pass directamente encriptada podemos generarla asi (el nombre de role debe ponerse como sufijo):
echo -n "CONTRASEÑAROLE" | md5sum | awk '{print "md5"$1;}'
Ejemplo, user=pepe contraseña=bla123, pondríamos:
echo -n "bla123pepe" ...

Con ansible: "{{ 'md5' + (password + user) | hash('md5') }}"



Consultar los grants en una db:
SELECT grantee as role, table_schema as schema, table_name as table, privilege_type FROM information_schema.role_table_grants;

SELECT grantee
      ,table_catalog
      ,table_schema
      ,table_name
      ,string_agg(privilege_type, ', ' ORDER BY privilege_type) AS privileges
FROM information_schema.role_table_grants
WHERE grantee != 'postgres'
--  and table_catalog = 'somedatabase' /* uncomment line to filter database */
--  and table_schema  = 'someschema'   /* uncomment line to filter schema  */
--  and table_name    = 'sometable'    /* uncomment line to filter table  */
GROUP BY 1, 2, 3, 4;


\z table
  para permisos de una tabla


Los usuarios tendrán los grants puestos directamente a él, a los roles heredados y los grants de public.


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

### cambiar password / contraseña
alter user postgres password 'xxx';
ALTER ROLE partman PASSWORD 'par3456man';

### dar roles a posteriori:
alter user usuario createdb;


## Privilegios / Permisos ##
https://www.postgresql.org/docs/current/sql-grant.html
https://www.postgresql.org/docs/current/functions-info.html#FUNCTIONS-INFO-ACCESS-TABLE
  comprobar si un usuario tiene determinados permisos, ejemplo has_any_column_privilege(user, table, privilege)


Como se chequean los permisos:
Antes de nada, no podemos conectar si no tenemos CONNECT
Do you have `USAGE` on the schema?
    No:  Reject access.
    Yes: Do you also have the appropriate rights on the table?
        No:  Reject access.
        Yes: Check column privileges.

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


Dar permiso de login a un role:
ALTER ROLE nombre LOGIN;


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


### Privilegios por defecto
Cuando un usuario crea tablas las crea siendo su dueño.
Podemos configurar el usuario para que cuando cree tablas de permisos a otros roles, a parte de a si mismo.

Consultar que privilegios por defecto da cada user:
\ddp

Ejemplo para que las tablas creadas por foo le den permisos de lectura a bar:
ALTER DEFAULT PRIVILEGES
FOR USER foo
IN SCHEMA schema_name
GRANT SELECT ON TABLES TO bar;


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



# PUBLIC
https://wiki.postgresql.org/images/d/d1/Managing_rights_in_postgresql.pdf

Role especial heradado por todos los otros roles.
Por defecto tiene permisos, sobre todos los public schema:
  USAGE: acceder a todos los objetos (puede listar, pero no hacer select)
  CREATE: crear nuevos objetos (puede crear, por ejemplo, nuevas tablas)


Con \dp podemos ver que permisos tiene.
Es el que aparece sin nombre, ejemplo:
=UC/postgres


Quitar permisos por defecto de PUBLIC:
REVOKE ALL ON DATABASE db_name FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM PUBLIC;

Los roles que creemos tendrán que tener los permisos CONNECT a la db y USAGE sobre el schema public.

