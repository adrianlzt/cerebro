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


# Formato
Los logs se sacarán por el fichero que tenga configurado postgres (o journald en caso de usar systemd).
Podemos añadir más info útil modificando log_line_prefix. Un valor típico: '%m %u %d [%p]: '  (date/time, user name, database name, process id)
https://postgresqlco.nf/en/doc/param/log_line_prefix


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
