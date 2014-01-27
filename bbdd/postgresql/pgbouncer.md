http://wiki.postgresql.org/wiki/PgBouncer

PgBouncer is a lightweight connection pooler for PostgreSQL.


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
