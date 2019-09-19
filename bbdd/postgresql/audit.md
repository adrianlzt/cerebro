https://github.com/pgaudit/pgaudit

Extensión para poder logear a un fichero de texto las queries que se realizan en la bbdd.
Es necesario reiniciar la bbdd.

Tendremos que compilarlo, necesitaremos el paquete postgresNN-devel

make USE_PGXS=1
genera pgaudit.so

Instalar pgaudit:
cp pgaudit.so /usr/pgsql-9.6/lib/
cp pgaudit.control /usr/pgsql-9.6/share/extension/
cp pgaudit--1.1.2.sql /usr/pgsql-9.6/share/extension/

psql> alter system set shared_preload_libraries = 'pgaudit';

systemctl restart postgresql-9.6

psql> create extension pgaudit;

Hay dos tipos de logeo, de sesión y de objeto.


# Scope
Definiremos donde afecta el loggin según donde apliquemos el "SET pgaudit...".
> set pgaudit... , estamos aplicandolo solo en la sesión actual.
> alter database XXX set pgaudit... , lo estaremos aplicando para todas las sesiones de esa db
> alter role XXX set ... , a nivel de role
> alter system set ... , nivel de sistema

Las sesiones ya conectadas no se verán afectadas por los cambios (para alter database/system/role).
Podemos forzar terminar una sesión con:
select pg_terminate_backend(15705);
  mirar el pid en pg_stat_activity


# Formato
Los logs se sacarán por el fichero que tenga configurado postgres (o journald en caso de usar systemd).
Podemos añadir más info útil modificando log_line_prefix. Un valor típico: '%m %u %d [%p]: '  (date/time, user name, database name, process id)
https://postgresqlco.nf/en/doc/param/log_line_prefix

ALTER SYSTEM SET log_line_prefix = '%m user=%u db=%d host=%r pid=%p: ';
SELECT pg_reload_conf();

Ejemplo:
2019-09-19 10:51:34.796 CEST user=postgres db=adrian host=[local] pid=9352: LOG:  AUDIT: OBJECT,4,1,READ,SELECT,TABLE,public.account,"select id,name from account ;",<not logged>

Si usamos journald una forma para sacarlo en formato grepeable:
journalctl -n 100 -u postgresql-9.6 -f -o cat



# Session login
Obtenemos logs de todo lo que haga la sesión a partir de configurar el pgaudit.log

psql> set pgaudit.log = 'read, ddl';
  activamos el logging para SELECT/COPY y DDL (CREATE TABLE, etc)


# Object login
Logeamos lo que afecte a un determinado objeto, por ejemplo a una tabla.
Se hará uso del sistema de roles.
El logging verá lo que vea un role que nosotros elegiremos.
Por ejemplo, creamos un role y solo le damos permisos de "select" sobre una tabla:
set pgaudit.role = 'auditor';
create role auditor;
grant select on public.account to auditor;

Los permisos que le demos serán para la database a la que estemos conectados.
Los cambios de permisos afectan inmediatamente, no hace falta desconectar la sesión.
