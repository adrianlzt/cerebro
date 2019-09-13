mirar pgpool.md
http://wiki.postgresql.org/wiki/PgBouncer

PgBouncer is a lightweight connection pooler for PostgreSQL.
Mejor que pgpool, pero no permite enviar escrituras a una instancia distinta (esto es complejo, tiene muchos pequeños detalles, como funciones con SELECT que hacen escrituras)
Conoce el protocolo, dentro de una conex, entiende las transaciones y puede balancearlas. En haproxy deberíamos forzar que una conex entera fuera balanceada.
Single thread, pero es ligero y puede manejar muchas conexiones con una sola cpu (curso)

Podemos instalarlo en la máquina de aplicación o en la misma database.


Several levels of brutality when rotating connections:

Session pooling
  Most polite method. When client connects, a server connection will be assigned to it for the whole duration it stays connected. When client disconnects, the server connection will be put back into pool. This mode supports all PostgeSQL features.

Transaction pooling
  Server connection is assigned to client only during a transaction. When PgBouncer notices that transaction is over, the server will be put back into pool.
  This mode breaks few session-based features of PostgreSQL. You can use it only when application cooperates by not using features that break. See the table below for incompatible features.

Statement pooling
  Most aggressive method. This is transaction pooling with a twist - multi-statement transactions are disallowed. This is meant to enforce "autocommit" mode on client, mostly targeted for PL/Proxy.


Una funcionalidad interesante:
Podemos parar la base de datos detras de pgbouncer, hacer tareas administrativas, y volver a conectarla, y los clientes de postgres no notarán nada. (la parada debe ser corta, por supuesto)


# Config

Mapping de databases virtuales a reales
[databases]
myfooddb = host=myprimary dbname=myfooddb
myfooddb_ro = host=mystandby dbname=myfooddb


# Admin
## Comands
SHOW DATABASES|POOLS|CLIENTS|SERVER|...
RELOAD
  recargar config
PAUSE
  si tenemos pool sessiones, esperará a que terminen las conexiones, podemos usar WAIT_CLOSE en ese caso.
RESUME
  lo contrario a pause


# Pool modes
## Session
Cada cliente se mapea a una conex que mantendrá

## Transaction
Para cada transación se le asigna una conexión a un server
Comandos de sesión no funcionarán: LISTEN/NOTIFY, PREPARE/EXECUTE, SET (LOCAL works)
