https://use-the-index-luke.com
https://habr.com/en/company/postgrespro/blog/441962/
Enteder como funcionan los índices

\di
\d index_name


Generalmente usados para mejorar la velocidad de acceso a los datos.
La parte negativa es que cada insert implica modificar el índice.

Para usar los índices el planificador tiene que tener los datos de la tabla.
Si estamos haciendo pruebas podemos forzar la carga de estos datos con:
ANALYZE tabla;


# Reindex
Útil si el índice está muy fragmentado
No se puede hacer CONCURRENTLY.
Hacer un segundo índice CONCURRENTLY, borrar el primero y renombrar el nuevo al viejo? (puesto en dudas)


# Create
https://www.postgresql.org/docs/9.6/sql-createindex.html
CUIDADO! bloquea las escrituras (mirar Concurrently)

CREATE INDEX name ON table (column);

Mirar que tipo de índice se adapta más a nuestra necesidad.

CREATE UNIQUE INDEX title_idx ON films (title);

Se pueden crear índices parciales, usando la clausula WHERE.

Tambien indexar el resultado de una expresión:
CREATE INDEX ON films ((lower(title)));

## Drop
DROP INDEX [ CONCURRENTLY ] [ IF EXISTS ] name [, ...] [ CASCADE | RESTRICT ]


## Multicolumn
https://www.postgresql.org/docs/current/indexes-multicolumn.html
Podemos crear también indices por varios campos:
CREATE UNIQUE INDEX title_idx ON films (title,author);

El índice se podrá usar cuando busquemos por title, o cuando busquemos por title y author.
Un caso típico es buscar por title y ordenar por author.
No podemos usar este índice para buscar solo por author.

Mejor multicolumn o varios single column?
Dependerá del caso.
Los multicolumn son más pesados, pero menos que dos separados.
Mirar discusión en la doc.



## UNIQUE (no valores duplicados)
Solo B-Tree. Chequea que no hay valores duplicados al crear el índice y tras cada insert.

## INCLUDE (agregar info extra al índice)
Se indexa solo por el/los valores especificados, pero se adjunta info extra, de manera que no hace falta hacer una segunda lectura (Index scan VS Index only scan)
Cuidado porque incrementa el tamaño del índice.
Solo B-tree. No includes.
CREATE UNIQUE INDEX title_idx ON films (title) INCLUDE (director, rating);


## ONLY
No crear el índice en partitions.



## Concurrently
https://www.postgresql.org/docs/current/sql-createindex.html#SQL-CREATEINDEX-CONCURRENTLY
Crear índices sin hacer un lock a los writes.
Tarda más y consume más CPU e IO.


## Fillfactor
Espacio dejado para que al ir actualizando los índices los cambios queden en la misma página? (puesto en dudas)



# Tipos de índices
B-Tree (balanced tree): https://github.com/postgres/postgres/tree/master/src/backend/access/nbtree



# Tipos de acceso
Index scan: leemos el índice y luego obtenemos los datos del heap
Index only scan: obtenemos toda la info que necesitamos del índice
  si la página que va a leer no está "true" en el visibility map (o no existe aún), tendrá que ir al heap para ver si es una dead row
  explicación y ejemplo: https://blog.dbi-services.com/an-index-only-scan-in-postgresql-is-not-always-index-only/


# String
https://use-the-index-luke.com/sql/where-clause/searching-for-ranges/like-performance-tuning
Podemos usar índices sobre strings. Se usarán los caracteres antes de "%" para buscar en el índice.
Se puede ver bien con explain.

Si buscamos "%FOO" no podrá usar el índice.

Si no usamos la locale "C" tendremos que indexar con una clase especial (*_pattern_ops) para poder usar regexp/like.



# Velocidad de creación de un índice
For most index methods, the speed of creating an index is dependent on the setting of maintenance_work_mem. Larger values will reduce the time needed for index creation, so long as you don't make it larger than the amount of memory really available, which would drive the machine into swapping.


# Operators
https://www.postgresql.org/docs/current/indexes-opclass.html

Cuando se crea un índice se definen también los operadores que afectan a ese índice.
Por ejemplo para int se definiran =, <, >, >=, <=, etc



# HypoPG
https://hypopg.readthedocs.io/en/latest/
Extensión que simula tener un índice para ver si el query planner lo usaría. Sin tener que gastar los recursos de crearlo

