https://use-the-index-luke.com
Enteder como funcionan los índices

# Reindex
Útil si el índice está muy fragmentado
No se puede hacer CONCURRENTLY.
Hacer un segundo índice CONCURRENTLY, borrar el primero y renombrar el nuevo al viejo? (puesto en dudas)


# Create
https://www.postgresql.org/docs/9.6/sql-createindex.html
CUIDADO! bloquea las escrituras (mirar Concurrently)

Mirar que tipo de índice se adapta más a nuestra necesidad.

CREATE UNIQUE INDEX title_idx ON films (title);

Podemos crear también indices por varios campos:


## UNIQUE (no valores duplicados)
Solo B-Tree. Chequea que no hay valores duplicados al crear el índice y tras cada insert.

## INCLUDE (agregar info extra al índice)
Se indexa solo por el/los valores especificados, pero se adjunta info extra, de manera que no hace falta hacer una segunda lectura (Index scan VS Index only scan)
Cuidado porque incrementa el tamaño del índice.
Solo B-tree. No includes.

## ONLY
No crear el índice en partitions.



## Concurrently
https://www.postgresql.org/docs/current/sql-createindex.html#SQL-CREATEINDEX-CONCURRENTLY
Crear índices sin hacer un lock a los writes.
Tarda más y consume más CPU e IO


## Velocidad de creación de un índice
For most index methods, the speed of creating an index is dependent on the setting of maintenance_work_mem. Larger values will reduce the time needed for index creation, so long as you don't make it larger than the amount of memory really available, which would drive the machine into swapping.
