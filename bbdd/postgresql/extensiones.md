En principio no es necesario reiniciar (tal vez alguna extensión particular lo requiera)

Las extensiones se instalan por database.

Listar extensiones y funciones de estas
\dx
Listar extensiones y funciones de estas
\dx+

Ver extensiones disponibles:

```sql
SELECT * FROM pg_available_extensions;
```

Si queremos instalar una extensión en todas las database que creemos, la instalaremos en la db "template1".
No aplicará a las DBs ya existentes.

Mirar las que instala <https://github.com/timescale/timescaledb-docker-ha/blob/master/Dockerfile>

Parece útil instalar POWA, que nos da acceso a varias extensiones ya de forma sencilla
mirar powa.md
<https://powa.readthedocs.io/en/latest/components/stats_extensions/index.html#stat-extensions>
pg_stat_statements
pg_qualstats: statistics about predicates
pg_stat_kcache: statistics about physical disk access and CPU consumption done by backends.
pg_wait_sampling
pg_track_settings

<https://github.com/omniti-labs/pg_jobmon>
<https://pgxn.org/dist/pg_jobmon/> <- versión más nueva que en github (mirar PR)
pg_jobmon is an extension to add the capability to log the progress of running functions and provide a limited monitoring capability to those logged functions.
Caso de uso: <https://github.com/pgpartman/pg_partman/blob/master/doc/pg_partman.md#loggingmonitoring>
pg_partman lo usa para loguear y generar alarmas cuando su worker falla.

<https://github.com/citusdata/pg_cron>
Run periodic jobs in PostgreSQL

<https://www.pgaudit.org/>
detailed session and/or object audit logging via the standard logging facility

<https://github.com/reorg/pg_repack>
remove bloat from tables and indexes, and optionally restore the physical order of clustered indexes. Unlike CLUSTER and VACUUM FULL it works online, without holding an exclusive lock on the processed tables during processing

<https://github.com/eulerto/wal2json>
Extraer lo que está sucediendo en los WAL en formato JSON.
Hace falta activar la replicación lógica.

<https://github.com/pgq/pgq>
PgQ is PostgreSQL extension that provides generic, high-performance lockless queue with simple API based on SQL functions.

<https://github.com/michelp/pgsodium>
encryption library extension for PostgreSQL using the libsodium library for high level cryptographic algorithms.

<https://github.com/RafiaSabih/pg_auth_mon>
monitoring client authentication attempts

<https://github.com/munakoiso/logerrors>
logerrors is an extension to count the number of errors logged by postgrs, grouped by the error codes

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

# TYPE DATABASE USER ADDRESS METHOD

local pruebas jobmon md5

Darle permisos al rol:
grant usage on schema jobmon to jobmon;
grant select, insert, update, delete on all tables in schema jobmon to jobmon;
grant execute on all functions in schema jobmon to jobmon;
grant all on all sequences in schema jobmon to jobmon;

## Uso

<https://github.com/omniti-labs/pg_jobmon/blob/master/doc/pg_jobmon.md>

Mostrar todas las jobs (100 es el limit que ponemos):
select _from jobmon.show_job_like('._', 100);

Mostrar los datos y duración de los jobs entre dos fechas:
select _,end_time-start_time as duration from jobmon.show_job_like('._', 1600) where end_time < '2020-09-21 20:30:00.000000+02' and start_time > '2020-09-21 18:00:00.000000+02'

Jobs running:
select \* from jobmon.show_running();

Mostrar estado de todas las jobs con su error (si tiene):
SELECT t.alert_text || c.alert_text AS alert_status
FROM jobmon.check_job_status() c
JOIN jobmon.job_status_text t ON c.alert_code = t.alert_code;

Si queremos ver el mensaje de error, ponemos un jobid en esta función:
select \* from jobmon.show_detail(109296) where status <> 'OK';

Ejemplo, en el campo message: "ERROR: must be owner of table trends_uint_p2020_10_13"

# hypopg

<https://hypopg.readthedocs.io/en/latest/>
crear índices y partitions hipotéticas para comprobar si el query planner las usaría

<https://github.com/rjuju/pg_track_settings>
pg_track_settings is a small extension that helps you keep track of postgresql settings configuration.

mirar las que usa powa.md

esqueleton: <https://paquier.xyz/postgresql-2/blackhole-extension/>

# quantile

<https://pgxn.org/dist/quantile>
Aggregate for computing various quantiles (median, quartiles etc.) efficiently.

# pg_auth_mon

<https://github.com/RafiaSabih/pg_auth_mon>
PostgreSQL extension to store authentication attempts

- when has a user successfully logged in for the last time ?
- has a user genuinely mistyped their password or has their username been compromised?
- is there any particular time when a malicious role is active?

# logerrors

<https://github.com/munakoiso/logerrors>
Extension for PostgreSQL for collecting statistics about messages in logfile.

# emaj

<https://github.com/dalibo/emaj>

Logging de ciertas tablas.

# PGXN

Extensions distribution and mirroring, easy downloading and installation, documentation and metadata, and searching and reporting

Tiene un cliente en python pgxnclient
Instalable como RPM si tenemos configurado el repo de redhat (<http://yum.postgresql.org>). Roto, requiere "six" que no está disponible como paquete. Podemos instalarlo a mano.
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

<https://git.postgresql.org/gitweb/?p=pgrpms.git;a=tree;f=rpm;hb=HEAD>
