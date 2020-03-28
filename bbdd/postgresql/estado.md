https://medium.com/little-programming-joys/finding-and-killing-long-running-queries-on-postgres-7c4f0449e86d

-- para 9.6+
SELECT pid, client_addr, client_port, now() - query_start as "runtime", now() - xact_start as "xact_runtime", usename, datname, wait_event, pg_blocking_pids(pid) as blocked_by, state, query FROM  pg_stat_activity WHERE now() - xact_start > '2 seconds'::interval and (state = 'active' or state = 'idle in transaction') ORDER BY xact_runtime DESC;

Sacamos el tiempo que lleva ejecutandose la query (runtime) y el de la transaccion (xact_runtime). Serán iguales en el caso de que sea una query simple, sin transacción.

Nos da tambien el pid/pids que puedan estar bloqueando a la transacción.
  https://paquier.xyz/postgresql-2/postgres-9-6-feature-highlight-pg-blocking-pids/
  https://stackoverflow.com/questions/26489244/how-to-detect-query-which-holds-the-lock-in-postgres


A
Si es una transacción, en query veremos la última ejecutada. No sabremos que otras cosas ha ejecutado la transacción antes.

idle in transaction -> es una transacción que está esperando el "commit" para poder terminar
  si se van ejecutando más queries dentro de la transacción, veremos como el campo "query" se va modificando. xact_start se mantendrá y se actualizarán query_start y state_change


-- kill running query (cancel es más "soft" que terminate)
https://www.postgresql.org/docs/current/functions-admin.html#FUNCTIONS-ADMIN-SIGNAL
SELECT pg_cancel_backend(procpid);
  manda un SIGINT al proceso
  para running queries
  si la sesión está en un BEGIN..COMMIT, al cancelar algunas de las queries, si la sesión termina con "COMMIT", se ignorará y hará un rollback
  si cancelamos una running query, no se realizará ningún cambio que estuviese haciendo (si le pillamos en medio de un gran update, es como si no se hubiese ejecutado)
select pg_terminate_backend(pid) from pg_stat_activity where query like '%sleep%' and pid<>pg_backend_pid();
SELECT pg_cancel_backend(pid) FROM pg_stat_activity WHERE query like 'select * from partitions_hist%' AND now() - xact_start > '2 seconds'::interval and (state = 'active' or state = 'idle in transaction');

-- kill idle query (esto es como un kill -9, puede provocar un reinicio de toda la base de datos para recuperar la consistencia)
SELECT pg_terminate_backend(procpid);
  manda un SIGTERM al proceso
  si la sesión está en un BEGIN..COMMIT, no se aplicará el commit
  si cancelamos una running query, no se realizará ningún cambio que estuviese haciendo (si le pillamos en medio de un gran update, es como si no se hubiese ejecutado)



-- show running queries (9.2)
SELECT pid, age(query_start, clock_timestamp()), usename, query FROM pg_stat_activity WHERE query != '<IDLE>' AND query NOT ILIKE '%pg_stat_activity%' ORDER BY query_start desc;

-- queries que llevan más de 2'
SELECT now() - query_start as "runtime", usename, datname, waiting, state, query FROM  pg_stat_activity WHERE now() - query_start > '2 minutes'::interval ORDER BY runtime DESC;

-- para 9.4+
SELECT pid, now() - query_start as "runtime", usename, datname, waiting, state, query FROM  pg_stat_activity WHERE now() - query_start > '2 minutes'::interval and state = 'active' ORDER BY runtime DESC;




# deadlocks
http://shiroyasha.io/deadlocks-in-postgresql.html

Cuando sale un error deadlock, el proceso que la pinta es quien muere
En este ejemplo, muere el 522300:

2019-12-10 13:18:25.882 CET [522300] ERROR:  se ha detectado un deadlock
2019-12-10 13:18:25.882 CET [522300] DETALLE:  El proceso 522300 espera ShareLock en transacción 694; bloqueado por proceso 522346.
        El proceso 522346 espera ShareLock en transacción 695; bloqueado por proceso 522300.
        Proceso 522300: update users set name='x' where id=1;
        Proceso 522346: update users set name='y' where id=2;
2019-12-10 13:18:25.882 CET [522300] HINT:  Vea el registro del servidor para obtener detalles de las consultas.
2019-12-10 13:18:25.882 CET [522300] CONTEXTO:  mientras se actualizaba la tupla (0,3) en la relación «users»
2019-12-10 13:18:25.882 CET [522300] SENTENCIA:  update users set name='x' where id=1;




https://wiki.postgresql.org/wiki/Lock_Monitoring
https://wiki.postgresql.org/wiki/Lock_dependency_information
  query para ver de donde viene los bloqueos originarios

Bloqueos potenciales. Si el lock está granted es que tiene el lock concendido.
Si vemos en estas queries granted=f quiere decir peticionse que están esperando obtener el lock.

Los problems son los Exclusive locks, que limitan a otras transacciones trabajar

Cuidado, en query veremos la última llamada lanzada por la transacción, pero puede que no estemos viendo la llamada que originó el lock
https://dba.stackexchange.com/questions/223083/postgresql-get-statements-of-a-running-transaction
  preguntando eso



https://www.citusdata.com/blog/2018/02/22/seven-tips-for-dealing-with-postgres-locks/

Para ver que rows están bloqueadas: https://www.postgresql.org/docs/9.6/pgrowlocks.html

Explicación locks:
https://www.postgresql.org/docs/current/explicit-locking.html
Exclusive Lock: permite lectura a otros
Access Exclusive Lock: solo permite leer/escribir a la tx (bloquea todas las SELECT de otras TX)
Row Exclusive Lock: cuando hacemos un update de una tabla dentro de una TX generaremos este lock.
                  Podemos leer desde otra TX, veremos el valor antes de la TX
Access ShareLock are acquired for objects involved in a query to block them from being modified or dropped by another session during their use

select ... for update, bloquea los campos obtenidos por la select como si hubiésemos modificado con update ese row



-- locks
-- Muestra solo los locks de "relations", bloqueos a rows o tablas
SELECT psa.pid,relation::regclass::text,mode,granted,client_addr,client_port,xact_start,query_start,state,query as locked_item FROM pg_locks pl LEFT JOIN pg_stat_activity psa ON pl.pid = psa.pid where locktype = 'relation';

-- todo
SELECT * FROM pg_locks pl LEFT JOIN pg_stat_activity psa ON pl.pid = psa.pid;

-- Solo locks exclusivos
SELECT pl.pid,locktype,mode,datname,relation::regclass::text as locked_item,usename,xact_start,now()-xact_start as "running",query FROM pg_locks pl LEFT JOIN pg_stat_activity psa ON pl.pid = psa.pid WHERE mode like '%Exclusive%';
  en locked item veremos que estamos bloqueando (puede ser una tabla, un índice de la tabla, ...)

-- Ver que procesos están esperando a que (https://www.postgresql.org/docs/9.6/static/monitoring-stats.html#WAIT-EVENT-TABLE)
SELECT pid, wait_event_type, wait_event FROM pg_stat_activity WHERE wait_event is NOT NULL;

-- Bloqueos entre transacciones
SELECT
  COALESCE(blockingl.relation::regclass::text,blockingl.locktype) as locked_item,
  now() - blockeda.query_start AS waiting_duration, blockeda.pid AS blocked_pid,
  blockeda.query as blocked_query, blockedl.mode as blocked_mode,
  blockinga.pid AS blocking_pid, blockinga.query as blocking_query,
  blockingl.mode as blocking_mode
FROM pg_catalog.pg_locks blockedl
JOIN pg_stat_activity blockeda ON blockedl.pid = blockeda.pid
JOIN pg_catalog.pg_locks blockingl ON(
  ( (blockingl.transactionid=blockedl.transactionid) OR
  (blockingl.relation=blockedl.relation AND blockingl.locktype=blockedl.locktype)
  ) AND blockedl.pid != blockingl.pid)
JOIN pg_stat_activity blockinga ON blockingl.pid = blockinga.pid
  AND blockinga.datid = blockeda.datid
WHERE NOT blockedl.granted
AND blockinga.datname = current_database();



-- locks recursivo
Ejemplo:
           blocker_target           | blocker_pid | blocker_mode  | depth |               target               |  pid  |   mode    |       seq
------------------------------------+-------------+---------------+-------+------------------------------------+-------+-----------+------------------
 (transactionid,,,,,,1421691379,,,) |       25862 | ExclusiveLock |     1 | (transactionid,,,,,,1421691379,,,) | 31249 | ShareLock | 25862,31249
 (transactionid,,,,,,1421691379,,,) |       25862 | ExclusiveLock |     2 | (transactionid,,,,,,1421701617,,,) |  1007 | ShareLock | 25862,31249,1007
 (transactionid,,,,,,1421701617,,,) |       31249 | ExclusiveLock |     1 | (transactionid,,,,,,1421701617,,,) |  1007 | ShareLock | 31249,1007

25862 esta una transaccion bloqueando la tabla A
31249 está en una transacción bloqueando la tabla B y esperando para poder actualizar la A
1007 está intentando actualizar la tabla B

1007 está bloqueando por 31249, que a su vez está bloqueado por 25862. Por eso vemos una linea donde nos dice que 1007 está bloqueada por 25862 con profundidad 2

WITH RECURSIVE
     c(requested, CURRENT) AS
       ( VALUES
         ('AccessShareLock'::text, 'AccessExclusiveLock'::text),
         ('RowShareLock'::text, 'ExclusiveLock'::text),
         ('RowShareLock'::text, 'AccessExclusiveLock'::text),
         ('RowExclusiveLock'::text, 'ShareLock'::text),
         ('RowExclusiveLock'::text, 'ShareRowExclusiveLock'::text),
         ('RowExclusiveLock'::text, 'ExclusiveLock'::text),
         ('RowExclusiveLock'::text, 'AccessExclusiveLock'::text),
         ('ShareUpdateExclusiveLock'::text, 'ShareUpdateExclusiveLock'::text),
         ('ShareUpdateExclusiveLock'::text, 'ShareLock'::text),
         ('ShareUpdateExclusiveLock'::text, 'ShareRowExclusiveLock'::text),
         ('ShareUpdateExclusiveLock'::text, 'ExclusiveLock'::text),
         ('ShareUpdateExclusiveLock'::text, 'AccessExclusiveLock'::text),
         ('ShareLock'::text, 'RowExclusiveLock'::text),
         ('ShareLock'::text, 'ShareUpdateExclusiveLock'::text),
         ('ShareLock'::text, 'ShareRowExclusiveLock'::text),
         ('ShareLock'::text, 'ExclusiveLock'::text),
         ('ShareLock'::text, 'AccessExclusiveLock'::text),
         ('ShareRowExclusiveLock'::text, 'RowExclusiveLock'::text),
         ('ShareRowExclusiveLock'::text, 'ShareUpdateExclusiveLock'::text),
         ('ShareRowExclusiveLock'::text, 'ShareLock'::text),
         ('ShareRowExclusiveLock'::text, 'ShareRowExclusiveLock'::text),
         ('ShareRowExclusiveLock'::text, 'ExclusiveLock'::text),
         ('ShareRowExclusiveLock'::text, 'AccessExclusiveLock'::text),
         ('ExclusiveLock'::text, 'RowShareLock'::text),
         ('ExclusiveLock'::text, 'RowExclusiveLock'::text),
         ('ExclusiveLock'::text, 'ShareUpdateExclusiveLock'::text),
         ('ExclusiveLock'::text, 'ShareLock'::text),
         ('ExclusiveLock'::text, 'ShareRowExclusiveLock'::text),
         ('ExclusiveLock'::text, 'ExclusiveLock'::text),
         ('ExclusiveLock'::text, 'AccessExclusiveLock'::text),
         ('AccessExclusiveLock'::text, 'AccessShareLock'::text),
         ('AccessExclusiveLock'::text, 'RowShareLock'::text),
         ('AccessExclusiveLock'::text, 'RowExclusiveLock'::text),
         ('AccessExclusiveLock'::text, 'ShareUpdateExclusiveLock'::text),
         ('AccessExclusiveLock'::text, 'ShareLock'::text),
         ('AccessExclusiveLock'::text, 'ShareRowExclusiveLock'::text),
         ('AccessExclusiveLock'::text, 'ExclusiveLock'::text),
         ('AccessExclusiveLock'::text, 'AccessExclusiveLock'::text)
       ),
     l AS
       (
         SELECT
             (locktype,DATABASE,relation::regclass::text,page,tuple,virtualxid,transactionid,classid,objid,objsubid) AS target,
             virtualtransaction,
             pid,
             mode,
             GRANTED
           FROM pg_catalog.pg_locks
       ),
     t AS
       (
         SELECT
             blocker.target  AS blocker_target,
             blocker.pid     AS blocker_pid,
             blocker.mode    AS blocker_mode,
             blocked.target  AS target,
             blocked.pid     AS pid,
             blocked.mode    AS mode
           FROM l blocker
           JOIN l blocked
             ON ( NOT blocked.GRANTED
              AND blocker.GRANTED
              AND blocked.pid != blocker.pid
              AND blocked.target IS NOT DISTINCT FROM blocker.target)
           JOIN c ON (c.requested = blocked.mode AND c.CURRENT = blocker.mode)
       ),
     r AS
       (
         SELECT
             blocker_target,
             blocker_pid,
             blocker_mode,
             '1'::INT        AS depth,
             target,
             pid,
             mode,
             blocker_pid::text || ',' || pid::text AS seq
           FROM t
         UNION ALL
         SELECT
             blocker.blocker_target,
             blocker.blocker_pid,
             blocker.blocker_mode,
             blocker.depth + 1,
             blocked.target,
             blocked.pid,
             blocked.mode,
             blocker.seq || ',' || blocked.pid::text
           FROM r blocker
           JOIN t blocked
             ON (blocked.blocker_pid = blocker.pid)
           WHERE blocker.depth < 1000
       )
SELECT * FROM r
  ORDER BY seq;
