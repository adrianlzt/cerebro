https://use-the-index-luke.com
Enteder como funcionan los índices

# Reindex
Útil si el índice está muy fragmentado

# Create
https://www.postgresql.org/docs/9.6/sql-createindex.html
CUIDADO! bloquea las escrituras (mirar Concurrently)

Mirar que tipo de índice se adapta más a nuestra necesidad.


## Concurrently
https://www.postgresql.org/docs/current/sql-createindex.html#SQL-CREATEINDEX-CONCURRENTLY
Crear índices sin hacer un lock a los writes.
