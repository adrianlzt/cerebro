<https://powa.readthedocs.io/en/latest/index.html>

The PostgreSQL Workload Analyzer is performance tool for PostgreSQL 9.4 and superior allowing to collect, aggregate and purge statistics on a PostgreSQL instance from various sources. It is implemented as a background worker.
Bajo impacto: <https://powa.readthedocs.io/en/latest/impact_on_perf.html>

This includes support for various stat extensions:
pg_stat_statements, providing data about queries being executed
pg_qualstats, providing data about predicates, or where clauses
pg_stat_kcache, providing data about operating-system level cache
pg_wait_sampling, providing data about wait events
HypoPG, allowing you to create hypothetical indexes and test their usefulness without creating them

Nos da una interfaz gráfica para recolectar esta info.
Podemos ver por cada database que queries se están ejecutando, cuanto tardan, posibles mejoras a aplicar, etc.

La configuración que tiene más sentido es un servidor remoto donde se almacenan las métricas y luego los servidores a monitorizar.

# Servidores a monitorizar

En los servidores a monitorizar deberemos instalar la extensión powa y las que queramos usar.
En un ubuntu serían:

```bash
apt install -y postgresql-17-powa postgresql-17-pg-qualstats postgresql-17-pg-stat-kcache postgresql-17-pg-wait-sampling postgresql-17-pg-track-settings
```

Creo que hace falta:

```
shared_preload_libraries = 'pg_stat_statements'
# If possible, activate track_io_timing too
# it will repeatedly query the operating system for the current time, which may cause significant overhead on some platforms
# You can use the pgtesttiming tool to measure the overhead of timing on your system
track_io_timing = on
```

Para arrancar uno para probar podemos usar (siendo esa imagen la de timescaledb-ha con las extensiones de postgresql-17-powa postgresql-17-pg-wait-sampling postgresql-17-pg-track-settings):

```bash
podman run --rm -it -P -e POSTGRES_PASSWORD=password --name pg --net powa-test prueba -c shared_preload_libraries='timescaledb,pg_stat_statements,pg_qualstats,pg_stat_kcache,pg_wait_sampling' -c track_io_timing=on
```

Necesitaremos instalar las extensiones siguientes como mínimo:

```psql
CREATE EXTENSION pg_stat_statements;
CREATE EXTENSION btree_gist;
CREATE EXTENSION powa;
CREATE EXTENSION pg_qualstats;
CREATE EXTENSION pg_stat_kcache ;
CREATE EXTENSION pg_wait_sampling;
CREATE EXTENSION pg_track_settings;
```

Estas extensiones las podemos crear en una db "powa".
Con que carguemos las extensiones ahí ya analizarán todas las dbs.

Crear un usuario "powa" con:

```sql
GRANT EXECUTE ON FUNCTION public.pg_qualstats_reset() TO powa;
GRANT pg_read_all_stats TO powa;
```

# Servidor repositorio

```bash
apt install -y postgresql-17-powa
```

```sql
create database powa;
\c powa
CREATE EXTENSION pg_stat_statements;
CREATE EXTENSION btree_gist;
CREATE EXTENSION powa;
CREATE EXTENSION pg_track_settings;
```

Registrar un nodo a monitorizar (un remote server), doc <https://powa.readthedocs.io/en/latest/components/powa-archivist/configuration.html#powa-archivist-remote-servers-configuration>:

```sql
SELECT powa_register_server(hostname => 'myserver.domain.com',
    alias => 'myserver',
    password => 'mypassword',
    extensions => '{pg_stat_kcache,pg_qualstats,pg_wait_sampling,pg_track_settings}');
```

Servidores configurados:

```sql
select * from powa_servers;
```

Modificar configuración:

```sql
SELECT powa_configure_server(1, '{"frequency": 60}');
```

# collector

<https://github.com/powa-team/powa-collector>

Esta es la aplicación en python que conecta con el repository, mira que tiene que monitorizar (que remote servers) y crea un worker por cada uno.

Ese worker conecta a los servidores remotos, obtiene la información y la almacena en el repositorio.

Ejemplo:

```bash
podman run --rm -it -P --name powa-collector --net powa-test -v "$PWD/powa-collector.conf:/etc/powa-collector.conf" powateam/powa-collector:1.3.1
```

Config:

```json
powa-collector.conf
{
    "repository": {
        "dsn": "postgresql://postgres:password@powa:5432/powa"
    },
    "use_server_alias": true,
    "debug": true
}
```

Ejemplos de queries que lanzar contra los remote servers:

```sql
select * from powa_statements_src(0);
select * from powa_kcache_src(0);
select * from powa_qualstats_src(0);
SELECT public.pg_qualstats_reset();
SELECT * FROM public.powa_wait_sampling_src(0);
SELECT * FROM public.pg_track_settings_rds_src(0);
SELECT * FROM public.pg_track_settings_reboot_src(0);
SELECT * FROM public.pg_track_settings_settings_src(0);
SELECT * FROM public.powa_catalog_database_src(0);
SELECT * FROM public.powa_catalog_role_src(0);
SELECT * FROM public.powa_replication_slots_src(0);
SELECT * FROM public.powa_stat_activity_src(0);
SELECT * FROM public.powa_stat_archiver_src(0);
SELECT * FROM public.powa_stat_bgwriter_src(0);
SELECT * FROM public.powa_stat_checkpointer_src(0);
SELECT * FROM public.powa_stat_database_src(0);
...
```

# Interfaz web

<https://powa.readthedocs.io/en/latest/components/powa-web/index.html#powa-web>

<https://hub.docker.com/r/powateam/powa-web>

```bash
podman run --rm -it -P --name powa-web --net powa-test -v "$PWD/powa-web.conf:/etc/powa-web.conf" powateam/powa-web
```

Usar las credenciales de postgres para acceder.

## Errores

### Could not get status for this instance

Reiniciar powa-web
