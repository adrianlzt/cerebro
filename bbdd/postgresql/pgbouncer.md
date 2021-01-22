mirar pgpool.md
http://wiki.postgresql.org/wiki/PgBouncer

PgBouncer is a lightweight connection pooler for PostgreSQL.
Mejor que pgpool, pero no permite enviar escrituras a una instancia distinta (esto es complejo, tiene muchos pequeños detalles, como funciones con SELECT que hacen escrituras)
Conoce el protocolo, dentro de una conex, entiende las transaciones y puede balancearlas. En haproxy deberíamos forzar que una conex entera fuera balanceada.
Single thread, pero es ligero y puede manejar muchas conexiones con una sola cpu (curso)

Podemos instalarlo en la máquina de aplicación o en la misma database.

helm: https://github.com/cradlepoint/kubernetes-helm-chart-pgbouncer
Los users que definamos son para acceder a la interfaz administrativa de pgbouncer, para monitoring
No permite modificar el connection_mode
No podemos seleccionar un pool específico por db, se coge el default para todo


Several levels of brutality when rotating connections:

Session pooling
  Most polite method. When client connects, a server connection will be assigned to it for the whole duration it stays connected. When client disconnects, the server connection will be put back into pool. This mode supports all PostgeSQL features.

Transaction pooling
  Server connection is assigned to client only during a transaction. When PgBouncer notices that transaction is over, the server will be put back into pool.
  This mode breaks few session-based features of PostgreSQL. You can use it only when application cooperates by not using features that break. See the table below for incompatible features.  https://www.pgbouncer.org/features.html
  Parece que una feature incompatible que si se suele usar es el prepare: https://ledenyi.com/2020/05/greenplums-pgbouncer-and-prepared-statements/
  Mirar prepare.md, tenemos mejoras si reusamos mucho unc query con un plan complejo

Statement pooling
  Most aggressive method. This is transaction pooling with a twist - multi-statement transactions are disallowed. This is meant to enforce "autocommit" mode on client, mostly targeted for PL/Proxy.


Una funcionalidad interesante:
Podemos parar la base de datos detras de pgbouncer, hacer tareas administrativas, y volver a conectarla, y los clientes de postgres no notarán nada. (la parada debe ser corta, por supuesto)


# Config

max_client_conn = Maximum number of client connections allowed
default_pool_size = How many server connections to allow per user/database pair
min_pool_size = Add more server connections to pool if below this number
reserve_pool_size = How many additional connections to allow to a pool
reserve_pool_timeout = If a client has not been serviced in this many seconds, use additional connections from the reserve pool

Chequear cuantas conex max tiene la postgres a la que conectemos.


Mapping de databases virtuales a reales
[databases]
myfooddb = host=myprimary dbname=myfooddb
myfooddb_ro = host=mystandby dbname=myfooddb


# Admin / monitoring
psql -p 6432 pgbouncer

Only users listed in the configuration parameters admin_users or stats_users are allowed to log in to the console. (Except when auth_type=any, then any user is allowed in as a stats_user.)

Additionally, the user name pgbouncer is allowed to log in without password, if the login comes via the Unix socket and the client has same Unix user UID as the running process.


Comprobar en los logs que no tenemos fallos de cones a la db


## Comands
SHOW HELP|CONFIG|DATABASES|POOLS|CLIENTS|SERVERS|VERSION
SHOW FDS|SOCKETS|ACTIVE_SOCKETS|LISTS|MEM
SHOW DNS_HOSTS|DNS_ZONES
SHOW STATS|STATS_TOTALS|STATS_AVERAGES
SET key = arg
RELOAD
  recargar config
PAUSE [<db>]
  si tenemos pool sessiones, esperará a que terminen las conexiones, podemos usar WAIT_CLOSE en ese caso.
RESUME [<db>]
  lo contrario a pause
DISABLE <db>
ENABLE <db>
KILL <db>
SUSPEND
SHUTDOWN


Para cada pool definimos un "pool size", número de conexiónes que podrá establecer pgbouncer contra la database configurada.


# Pool modes
## Session
Cada cliente se mapea a una conex que mantendrá

## Transaction
Para cada transación se le asigna una conexión a un server
Comandos de sesión no funcionarán: LISTEN/NOTIFY, PREPARE/EXECUTE, SET (LOCAL works)

Si un tenemos un pool size de 1 y dos clientes conectados.
Si uno de ellos abre una transacción, las peticiones del otro se quedarán "congeladas" hasta que el primer cliente cierre la tx.
