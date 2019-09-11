# Vacuum
https://www.postgresql.org/docs/9.5/static/sql-vacuum.html
https://severalnines.com/blog/performance-cheat-sheet-postgresql
  explicación sencilla de que hace vacuum

VACUUM reclaims storage occupied by dead tuples. In normal PostgreSQL operation, tuples that are deleted or obsoleted by an update are not physically removed from their table; they remain present until a VACUUM is done. Therefore it's necessary to do VACUUM periodically, especially on frequently-updated tables.
Cuando se borra un "row", este solo se marca para borrar, pero no se borra de los ficheros.
Lo mismo para los updates, que internamente son DELETE+INSERT.
El proceso de VACUUM es el que hace esta limpia.

Efectos:
  genera mucho WAL
  locks DDL
  solo borra el espacio libre al final de la tabla
  solo obtiene AccessExclusiveLock (si no obtiene el lock, omite el truncation step)

Si estamos usando particiones y borrandolas cada x tiempo, no tiene sentido hacer vacuum, ya que borraremos la partición entera más tarde.

Si no hacemos limpia tendremos más ocupación de disco y queries maś lentas.
Vacuum consume recursos, cpu, IO y memoria, por lo que no podemos lanzarlo muy amenudo.
Si el impacto del vacuum es muy grande es que no lo estamos ejecutando con suficiente frecuencia.

VACUUM will scan the table and remove dead tuples both from the table and indexes – it will not generally return the disk space back to the operating system, but it will make it usable for new rows.

Para las tablas de usuario de la ddbb selecionada, mostrar dead tuples, porcentaje de dead tuples respecto a live tuples y últimas ejecuciones de (auto)vacuum/analyze
select relname,n_dead_tup,n_live_tup,n_dead_tup*100/NULLIF(n_live_tup,0) AS "pct_dead_live_tuples",last_vacuum,last_autovacuum,last_analyze,last_autoanalyze from pg_stat_user_tables WHERE n_dead_tup <> 0 order by pct_dead_live_tuples DESC;

n_live_tup y n_dead_tup son estimaciones.

Tablas ordenadas por ultimo autoanalyze (no vacio):
select relname,n_dead_tup,n_live_tup,n_dead_tup*100/NULLIF(n_live_tup,0) AS "pct_dead_live_tuples",last_vacuum,last_autovacuum,last_analyze,last_autoanalyze from pg_stat_user_tables WHERE last_autoanalyze is not null order by last_autoanalyze desc;

Ultimo analyze y autovacuum de tablas partitioned:
select relid::regclass,last_autovacuum,last_autoanalyze from pg_stat_user_tables WHERE last_autoanalyze is not null and relid::regclass::text like 'partit%' order by last_autoanalyze desc;



VACUUM FULL, no hacerlo!
  Bloquea toda la tabla (no podemos hacer ni select).
  scans and vacuums all rowsno respeca vacuum_delay
  destruye replication latency
Lo bueno:
  recupera espacio, minimizando espacio
  similar a lo que hace CLUSTER
  crea una copia de la tabla (temporalmente necesita más espacio)
Note: VACUUM FULL would reclaim the space and return it to the OS, but is has a number of disadvantages. Firstly it acquires exclusive lock on the table, blocking all operations (including SELECTs). Secondly, it essentially creates a copy of the table, doubling the disk space needed, so it’s not very practical when already running out of disk space.
No ejecutarlo si se va a volver a llenar.



Zabbix recomienda desactivar autovacuum en las partitioned tables.
Query para desactivar:
ALTER TABLE <your partitioned table> SET ( autovacuum_enabled = false, toast.autovacuum_enabled = false);

Conf general del autovacuum:
select * from pg_settings where name like 'autovacuum%';

Conf por tabla (pg_class, estadísticas del planner):
select relname, reloptions from pg_class where reloptions is not null;


Estado autovacuums corriendo:
select * from pg_stat_progress_vacuum;


# Analyze
Podemos ejecutarlo con "analyze;"
Obtiene métricas de la bbdd, espacio usado, num de rows, estimaciones para los índices, etc


# Autovacuum
https://www.postgresql.org/docs/9.6/static/runtime-config-autovacuum.html
https://www.postgresql.org/docs/9.6/static/routine-vacuuming.html#AUTOVACUUM

Hace vacuum y analyze automáticamente.
Empieza por las tablas en orden de prioridad.
Hace las tablas toast separadamente.
Se cancela si intentas hacer DDL

Tunnig y explicación básica
https://blog.2ndquadrant.com/autovacuum-tuning-basics/

Autovacuum se encarga de ejecutar VACUUM cuando es necesario (va llevando una cuenta de las dead tuples).
Las dead tuples se van apuntado en pg_stat_user_tables con cada instrucción.
Cuando ejecutamos analyze se actualiza pg_class

Para tablas grandes debemos bajar el scale_factor (por defecto 0.2). Si no lo hacemos, cuando se ejecute el autovacuum va a ser muy costoso.
Otra opción es hacer saltar el autovacuum solo por el threshold (si hay más de x tuplas dead, arrancarlo).

Autovacuum también actualiza las estadísticas de distribución de datos, usado por el optimizados para planificar queries. Lo que hace es ejecutar "ANALYZE"
ANALYZE tiene bastante coste, rehace las estadísticas desde 0 en cada ejecucción. Si no lo ejecutamos amenudo, tendremos un coste por mala planificación de las queries.


# Cuando salta (por cada tabla)
pg_stat_all_tables.n_dead_tup > pg_settings.autovacuum_vacuum_threshold + pg_settings.autovacuum_vacuum_scale_factor * pg_class.reltuples


dead_tuples:
select relname,n_dead_tup from pg_stat_user_tables WHERE relname like 'NOMBRE';

settings:
select name,setting from pg_settings where name = 'autovacuum_vacuum_scale_factor' or name = 'autovacuum_vacuum_threshold';

número de tuplas:
select relname,reltuples from pg_class WHERE relname like 'history_2018_05_%' order by relname;

Query para obtener el valor que va a hacer saltar autovacuum y su threshold:
select pgc.relname,pgs.n_dead_tup>(pgc.reltuples*(select CAST(setting as float) from pg_settings where name = 'autovacuum_vacuum_scale_factor') + (select CAST(setting as float) from pg_settings where name = 'autovacuum_vacuum_threshold')) as fire_autovacuum,to_char(pgc.reltuples*(select CAST(setting as float) from pg_settings where name = 'autovacuum_vacuum_scale_factor') + (select CAST(setting as float)
from pg_settings where name = 'autovacuum_vacuum_threshold'), '9.99EEEE') as threshold,to_char(pgs.n_dead_tup, '9.99EEEE') from pg_class pgc, pg_stat_user_tables pgs WHERE pgc.relname = pgs.relname and pgc.relname like 'housekeeper' order by pgc.relname limit 10;


Los valores por defecto son 0.2 para scale_factor y 50 para threshold.
El significado es, lanzar el autovacuum si tenemos un 20% de dead tuples (y una pequeña barrera para no limpiar demasiado a menudo las pequeñas tablas).



# Parametrización de la velocidad del autovacuum
Varios parámetros nos permiten configurar cuando trabajo realizará el autovacuum, con que velocidad.

Primero, a cada página analizada se le pone un coste, dependiendo si se lee de la cache, del OS (ram o disco) o se va a borrar.
Luego otros parámetros deciden cuando coste se puede ejecutar por cada cuanto tiempo (token bucket).

Generalmente modificaremos esta parametrización aumentando el número de tokens (autovacuum_vacuum_cost_limit) a 2000 por ejemplo, teniendo un incremento de throughout de 10x.

Por cada cosa que hacemos se va sumando el coste (vacuum_cost_page_*) hasta llegar al autovacuum_vacuum_cost_limit, entonces todos los vacuum workers duermen autovacuum_vacuum_cost_delay


Podemos también incrementar el número de vacuum workers, PERO la limitación del token bucket es global, aplica a todos.
(Se puede forzar la parametrización por tabla para evitar esto).




# Autovacuum wraparound
https://www.cybertec-postgresql.com/en/autovacuum-wraparound-protection-in-postgresql/
https://www.postgresql.org/docs/9.6/static/routine-vacuuming.html#VACUUM-FOR-WRAPAROUND
https://blog.sentry.io/2015/07/23/transaction-id-wraparound-in-postgres.html

Cuando vemos que salta un proceso de autovacuum tipo:
autovacuum: VACUUM public.x (to prevent wraparound)

Es un proceso especial que salta cada 200.000.000 transaciones (setting autovacuum_freeze_max_age) para marcar rows "antiguos" como frozen (esto quiere decir que ese row siempre es visible para todas las transacciones).
Esto se hace porque el id que se usa para determinar el orden (XID) es circular y cada nueva transaccion considera los siguientes 2 mil millones de XID el futuro y los 2 mil millones anteriores el pasado.
Si un row se quedase con un XID antiguo durante mucho tiempo, podría pasar a ser el futuro, no siendo visible para nuevas transacciones, por eso lo de marcarlos como frozen.

Estos XID son por database.

A partir de postgres 9.6 se ha añadido un nuevo bit para marcar las tablas que ya están frozen, evitando el autovacuum sobre estas.
https://www.postgresql.org/docs/9.6/release-9-6.html
E.16.3.1.6. VACUUM


Si queremos ver como cuan cerca está cada tabla de lanzar el autovacuum wraparound:
SELECT
       oid::regclass::text AS table,
       age(relfrozenxid) AS xid_age,
       mxid_age(relminmxid) AS mxid_age,
       least(
(SELECT setting::int
            FROM    pg_settings
            WHERE   name = 'autovacuum_freeze_max_age') - age(relfrozenxid),
(SELECT setting::int
            FROM    pg_settings
            WHERE   name = 'autovacuum_multixact_freeze_max_age') - mxid_age(relminmxid)
) AS tx_before_wraparound_vacuum,
pg_size_pretty(pg_total_relation_size(oid)) AS size,
pg_stat_get_last_autovacuum_time(oid) AS last_autovacuum
FROM    pg_class
WHERE   relfrozenxid != 0
AND oid > 16384
ORDER BY tx_before_wraparound_vacuum;
