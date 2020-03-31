https://github.com/pgaudit/pgaudit

Extensión para poder logear a un fichero de texto las queries que se realizan en la bbdd.
Es necesario reiniciar la bbdd.

Tenemos RPM en https://yum.postgresql.org/12/redhat/rhel-7-x86_64/


Tendremos que compilarlo, necesitaremos los paquetes (https://github.com/theory/pg-semver/issues/35#issuecomment-440671985):
yum install -y centos-release-scl
yum install -y postgresql12-devel gcc openssl-devel llvm5.0 llvm-toolset-7 devtoolset-7 llvm-toolset-7-clang

git clone https://github.com/pgaudit/pgaudit.git
saltar a la tag que necesitemos según nuestra versión de postgres
export PATH=/usr/pgsql-12/bin/:$PATH
make install USE_PGXS=1

/usr/pgsql-12/lib/bitcode/pgaudit/pgaudit.bc
/usr/pgsql-12/lib/bitcode/pgaudit.index.bc
/usr/pgsql-12/lib/pgaudit.so
/usr/pgsql-12/share/extension/pgaudit--1.4.sql
/usr/pgsql-12/share/extension/pgaudit.control



psql> alter system set shared_preload_libraries = pgaudit;
  lo meterá en DATADIR/postgresql.auto.conf, parámetro shared_preload_libraries
  También podemos meterlo nosotros en /etc/postg.../postgresql.conf
  valores separados por coma. Comprobar antes si ya tenemos algún valor definido: show shared_preload_libraries ;
  para poner varios: alter system set shared_preload_libraries = pgaudit,pg_stat_statements;


systemctl restart postgresql-9.6

psql> create extension pgaudit;
Una vez ejecutado el create extension ya quedará cargado para siempre en esa db (aunque reiniciemos).


Hay dos tipos de logeo, de sesión y de objeto.


# Scope  settings
Podemos definir las settings a distintos niveles

Definiremos donde afecta el loggin según donde apliquemos el "SET pgaudit...".
> set pgaudit... , estamos aplicandolo solo en la sesión actual.
> alter database XXX set pgaudit... , lo estaremos aplicando para todas las sesiones de esa db
> alter role XXX set ... , a nivel de role
> alter system set ... , nivel de sistema

Las sesiones ya conectadas no se verán afectadas por los cambios (para alter database/system/role).
Podemos forzar terminar una sesión con:
select pg_terminate_backend(15705);
  mirar el pid en pg_stat_activity
  mirar status.md para notas sobre usar esta función


# Formato
Los logs se sacarán por el fichero que tenga configurado postgres (o journald en caso de usar systemd).
Podemos añadir más info útil modificando log_line_prefix. Un valor típico: '%m %u %d [%p]: '  (date/time, user name, database name, process id)
https://postgresqlco.nf/en/doc/param/log_line_prefix

ALTER SYSTEM SET log_line_prefix = '%m user=%u db=%d host=%r pid=%p sess=%c: ';
SELECT pg_reload_conf();

Ejemplo:
2019-09-19 10:51:34.796 CEST user=postgres db=adrian host=[local] pid=9352 sess=3: LOG:  AUDIT: OBJECT,4,1,READ,SELECT,TABLE,public.account,"select id,name from account ;",<not logged>

Si usamos journald una forma para sacarlo en formato grepeable:
journalctl -n 100 -u postgresql-9.6 -f -o cat

El logging de una query se produce en el momento en el que el cliente la manda, no se espera a la respuesta.


# Session login
Obtenemos logs de todo lo que haga la sesión a partir de configurar el pgaudit.log

Seleccionar lo que va a mostrar pgaudit
psql> set pgaudit.log = 'read, ddl';
  activamos el logging para SELECT/COPY y DDL (CREATE TABLE, etc)

READ: SELECT and COPY when the source is a relation or a query.
WRITE: INSERT, UPDATE, DELETE, TRUNCATE, and COPY when the destination is a relation.
FUNCTION: Function calls and DO blocks.
ROLE: Statements related to roles and privileges: GRANT, REVOKE, CREATE/ALTER/DROP ROLE.
DDL: All DDL that is not included in the ROLE class.
MISC: Miscellaneous commands, e.g. DISCARD, FETCH, CHECKPOINT, VACUUM, SET.
MISC_SET: Miscellaneous SET commands, e.g. SET ROLE.
ALL: Include all of the above.

Podemos hacer cosas tipo:
  "role,ddl,write"
  "all,-ddl"



# Object login
Logeamos lo que afecte a un determinado objeto, por ejemplo a una tabla.
Se hará uso del sistema de roles.
El logging verá lo que vea un role que nosotros elegiremos.
Por ejemplo, creamos un role y solo le damos permisos de "select" sobre una tabla:
set pgaudit.role = 'auditor';
create role auditor;
grant select on public.account to auditor;

Quitar permisos:
revoke delete,insert,update on public.ids from auditor;


Los permisos que le demos serán para la database a la que estemos conectados.
Los cambios de permisos afectan inmediatamente, no hace falta desconectar la sesión.


Mirar permisos del rol "auditor"

SELECT grantee
      ,table_catalog
      ,table_schema
      ,table_name
      ,string_agg(privilege_type, ', ' ORDER BY privilege_type) AS privileges
FROM information_schema.role_table_grants
WHERE grantee = 'auditor'
--  and table_catalog = 'somedatabase' /* uncomment line to filter database */
--  and table_schema  = 'someschema'   /* uncomment line to filter schema  */
--  and table_name    = 'sometable'    /* uncomment line to filter table  */
GROUP BY 1, 2, 3, 4;



# Buscar en los logs
grep AUDIT ...
