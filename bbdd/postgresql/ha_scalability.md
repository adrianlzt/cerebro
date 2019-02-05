mirar:
pgpool.md
pgbouncer.md


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
