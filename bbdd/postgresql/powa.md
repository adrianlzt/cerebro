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
```

# Interfaz web

https://hub.docker.com/r/powateam/powa-web
