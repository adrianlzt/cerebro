mirar:
pgpool.md
pgbouncer.md

https://www.last.fm/user/Russ/journal/2008/02/21/zd_postgres_connection_pools:_pgpool_vs._pgbouncer
pgbouncer mejor que pgpool


https://cloudblogs.microsoft.com/opensource/2019/05/06/introducing-pg_auto_failover-postgresql-open-source-extension-automated-failover-high-availability/
https://github.com/citusdata/pg_auto_failover
Para montar postgres con HA
Un cluster controller y n postgres con un proceso que los vigila localmente.
La extensión nos gestiona la replicación y el promote de standby a master.
Junto con la opción de libpq de conectar a varios hosts tenemos el HA.


https://paquier.xyz/postgresql-2/postgres-10-libpq-read-write/
libpq y postgres JDBC permiten definir varios hosts a donde conectar seleccionando que sea el master (read-write) o cualquiera (read-only)
Ejemplo con psql:
psql -d "postgresql://hostA,hostB/?target_session_attrs=read-write" -U usuario
Esto nos puede servir para tener HA sin necesidad de balanceador.


http://highscalability.com/blog/2013/8/26/reddit-lessons-learned-from-mistakes-made-scaling-to-1-billi.html
Each has slaves. The vote database has one master one slave. The comment database has one master and 12 slaves.
Avoid reading from the master if possible and direct reads to the slaves to keep the master dedicated to writes.
Client libraries would load balance across slaves and try a new slave if one was busy.


# Recovery
Query para saber si somos una recovery (por lo tanto, no la master)
select pg_is_in_recovery();


# Estado de la replicación
Solo devuelve info si lo lanzamos en la primaria
select * from pg_stat_replication;

Ultima transaccion sincronizada
select pg_last_xact_replay_timestamp();
