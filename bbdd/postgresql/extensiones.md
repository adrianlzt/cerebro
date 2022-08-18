En principio no es necesario reiniciar (tal vez alguna extensión particular lo requiera)

Listar extensiones y funciones de estas
\dx+



https://github.com/omniti-labs/pg_jobmon
https://pgxn.org/dist/pg_jobmon/ <- versión más nueva que en github (mirar PR)
pg_jobmon is an extension to add the capability to log the progress of running functions and provide a limited monitoring capability to those logged functions.
Caso de uso: https://github.com/pgpartman/pg_partman/blob/master/doc/pg_partman.md#loggingmonitoring
pg_partman lo usa para loguear y generar alarmas cuando su worker falla.

# Install
Instalar con pgxnclient
Solo instala (aparte de doc y updates):
/usr/pgsql-12/share/extension/pg_jobmon.control
/usr/pgsql-12/share/extension/pg_jobmon--1.4.0.sql

Necesita la extensión dblink, que viene en contrib (deberemos cargarla en las shared_preload_libraries)
Cargar:
CREATE SCHEMA jobmon;
CREATE SCHEMA dblink;
CREATE EXTENSION pg_jobmon SCHEMA jobmon CASCADE;

Si quien vaya a usar dblink no es superuser, tenemos que configurar sus credenciales y permitirle acceso en el pg_hba.conf
Ejemplo para partman bd "pruebas":
psql> INSERT INTO jobmon.dblink_mapping_jobmon (username, pwd) VALUES ('partman', 'rolepassword');

pg_hba.conf
Cuidado que no haga match la típica "local all all peer" antes, porque no funcionará (joblib es ejecutado por postgres pero aqui intentamos que se loguee como jobmon)
# TYPE  DATABASE       USER            ADDRESS                 METHOD
local   pruebas        jobmon                                  md5

Darle permisos al rol:
grant usage on schema jobmon to jobmon;
grant select, insert, update, delete on all tables in schema jobmon to jobmon;
grant execute on all functions in schema jobmon to jobmon;
grant all on all sequences in schema jobmon to jobmon;


## Uso
https://github.com/omniti-labs/pg_jobmon/blob/master/doc/pg_jobmon.md

Mostrar todas las jobs (100 es el limit que ponemos):
select * from jobmon.show_job_like('.*', 100);

Mostrar los datos y duración de los jobs entre dos fechas:
select *,end_time-start_time as duration from jobmon.show_job_like('.*', 1600) where end_time < '2020-09-21 20:30:00.000000+02' and start_time > '2020-09-21 18:00:00.000000+02'


Jobs running:
select * from jobmon.show_running();

Mostrar estado de todas las jobs con su error (si tiene):
SELECT t.alert_text || c.alert_text AS alert_status
FROM jobmon.check_job_status() c
JOIN jobmon.job_status_text t ON c.alert_code = t.alert_code;




# hypopg
https://hypopg.readthedocs.io/en/latest/
crear índices y partitions hipotéticas para comprobar si el query planner las usaría


https://github.com/rjuju/pg_track_settings
pg_track_settings is a small extension that helps you keep track of postgresql settings configuration.


mirar las que usa powa.md

esqueleton: https://paquier.xyz/postgresql-2/blackhole-extension/


# quantile
https://pgxn.org/dist/quantile
Aggregate for computing various quantiles (median, quartiles etc.) efficiently.


# pg_auth_mon
https://github.com/RafiaSabih/pg_auth_mon
PostgreSQL extension to store authentication attempts
 - when has a user successfully logged in for the last time ?
 - has a user genuinely mistyped their password or has their username been compromised?
 - is there any particular time when a malicious role is active?


# logerrors
https://github.com/munakoiso/logerrors
Extension for PostgreSQL for collecting statistics about messages in logfile.






# PGXN
Extensions distribution and mirroring, easy downloading and installation, documentation and metadata, and searching and reporting

Tiene un cliente en python pgxnclient
Instalable como RPM si tenemos configurado el repo de redhat (http://yum.postgresql.org). Roto, requiere "six" que no está disponible como paquete. Podemos instalarlo a mano.
yum install -y pgxnclient
pip3.6 install six


## Buscar
pgxnclient search jobmon

## Descargar
pgxnclient download pg_jobmon

Nos baja un zip con el código.

## Install
pgxnclient install pg_jobmon
  baja el código y lo instala, compilando si es necesario

## Código RPMs
https://git.postgresql.org/gitweb/?p=pgrpms.git;a=tree;f=rpm;hb=HEAD
