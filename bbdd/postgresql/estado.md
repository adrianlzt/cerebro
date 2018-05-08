https://medium.com/little-programming-joys/finding-and-killing-long-running-queries-on-postgres-7c4f0449e86d

-- show running queries (9.2)
SELECT pid, age(query_start, clock_timestamp()), usename, query FROM pg_stat_activity WHERE query != '<IDLE>' AND query NOT ILIKE '%pg_stat_activity%' ORDER BY query_start desc;

-- queries que llevan más de 2'
SELECT now() - query_start as "runtime", usename, datname, waiting, state, query FROM  pg_stat_activity WHERE now() - query_start > '2 minutes'::interval ORDER BY runtime DESC;

-- para 9.4+
SELECT pid, now() - query_start as "runtime", usename, datname, waiting, state, query FROM  pg_stat_activity WHERE now() - query_start > '2 minutes'::interval and state = 'active' ORDER BY runtime DESC;

-- para 9.6+
SELECT pid, now() - query_start as "runtime", usename, datname, wait_event, state, query FROM  pg_stat_activity ORDER BY runtime DESC;
SELECT pid, now() - query_start as "runtime", usename, datname, wait_event, state, query FROM  pg_stat_activity WHERE now() - query_start > '2 minutes'::interval and state = 'active' ORDER BY runtime DESC;


-- kill running query (cancel es más "soft" que terminate)
SELECT pg_cancel_backend(procpid);

-- kill idle query (esto es como un kill -9, puede provocar un reinicio de toda la base de datos para recuperar la consistencia)
SELECT pg_terminate_backend(procpid);



-- locks
SELECT * FROM pg_locks pl LEFT JOIN pg_stat_activity psa ON pl.pid = psa.pid;

-- Solo locks exclusivos
SELECT * FROM pg_locks pl LEFT JOIN pg_stat_activity psa ON pl.pid = psa.pid WHERE mode like '%Exclusive%';

-- Ver que procesos están esperando a que (https://www.postgresql.org/docs/9.6/static/monitoring-stats.html#WAIT-EVENT-TABLE)
SELECT pid, wait_event_type, wait_event FROM pg_stat_activity WHERE wait_event is NOT NULL;
