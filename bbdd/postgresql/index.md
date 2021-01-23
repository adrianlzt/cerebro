https://use-the-index-luke.com
https://habr.com/en/company/postgrespro/blog/441962/
https://www.highgo.ca/2020/06/22/types-of-indexes-in-postgresql/
Enteder como funcionan los índices

\di
\d index_name

Para mirar la llamada que se hizo para crear el índice (no nos pondrá si está en otro schema):
select pg_get_indexdef('items_3'::regclass);
SELECT indexdef FROM pg_indexes WHERE indexname = 'nombre_indice';


Generalmente usados para mejorar la velocidad de acceso a los datos.
La parte negativa es que cada insert implica modificar el índice.

Para usar los índices el planificador tiene que tener los datos de la tabla.
Si estamos haciendo pruebas podemos forzar la carga de estos datos con:
ANALYZE tabla;


# Reindex
Útil si el índice está muy fragmentado
No se puede hacer CONCURRENTLY hasta la versión 12.
Hacer un segundo índice CONCURRENTLY, borrar el primero y renombrar el nuevo al viejo? (puesto en dudas)
Parece que es lo que hace https://reorg.github.io/pg_repack/#details

Mirar reindex.md


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

Si tenemos insert/update/drop que se ejecutan en medio, "create index" deberá esperar hasta que terminen esas operaciones.

Si se diese un problema creando el índice, la creación fallará, pero el índice se quedará creado. Deberemos borrarlo para evitar un gasto de actualizar ese índice ante nuevos valores.
\d tabla
mostrará el índice como INVALID

También podemos tener errores de "contraint violations" si el índice que estamos generando CONCURRENTLY es unique (mirar doc).


## Fillfactor
Espacio dejado para que al ir actualizando los índices los cambios queden en la misma página? (puesto en dudas)

\d+ nombre_indice
  si tiene el valor por defecto, no veremos nada

Modificar fillfactor de un índice:
ALTER INDEX distributors SET (fillfactor = 75);
REINDEX INDEX distributors; -- hace falta reindexarlo para que se aplique el cambio (o mirar pg_repack en reindex.md)


Ejemplo de índice declarado con fillfactor:
CREATE INDEX items_3 ON public.items USING btree (status) WITH (fillfactor='100')


Y como se muestra:
# \d+ items_3
                         Índice «public.items_3»
 Columna |  Tipo   | ¿Llave? | Definición | Almacenamiento | Estadísticas
---------+---------+---------+------------+----------------+--------------
 status  | integer | sí      | status     | plain          |
btree, de tabla «public.items»
Opciones: fillfactor=100





# Tipos de índices
## B-Tree
Balanced tree
https://github.com/postgres/postgres/tree/master/src/backend/access/nbtree
fillfactor=90 por defecto


## BRIN
Block Range Index
https://www.postgresql.org/docs/current/brin-intro.html
https://www.percona.com/blog/2019/07/16/brin-index-for-postgresql-dont-forget-the-benefits/

Almacena información (min, max) sobre los valores que se encuentran dentro de un block range.
Si nuestros datos siguen un orden respecto a estos bloques (por ejemplo, la fecha de inserción es lineal, al igual que como se va escribiendo los bloques a disco), tendremos unos índices pequeños que nos dirán rápidamente donde se encuentra la información.
https://image.slidesharecdn.com/performance-milan-2016-160629080701/95/postgresql-performance-improvements-in-95-and-96-15-638.jpg?cb=1467194531

Parece que son buenos para reducir el tamaño en tablas muy grandes y con muchos inserts (para updates no funciona tan bien)
https://github.com/Doctorbal/zabbix-postgres-partitioning#optional--brin-versus-btree-indexes

CREATE INDEX nombre ON tabla USING brin (col1, col2);

Crear un índice brin (2 columnas) de una tabla de 17GB: 68s
Tamaño del índice brin: 744kB
Tamaño del índice btree: 6.5GB

Se puede especificar cuantas páginas ocupa cada "range" (default 128):
create index testtab_date_brin_idx on testtab using brin (date) with (pages_per_range = 32);

Podemos leer el contenido del índice con brin_page_items (extensión pageinspect)
https://blog.anayrat.info/en/2016/04/20/brin-indexes-operation/
https://www.postgresql.org/docs/12/pageinspect.html#id-1.11.7.31.7

CREATE extension pageinspect;
SELECT * FROM brin_page_items(get_raw_page('brinidx', 5), 'brinidx')

Para saber que número tenemos que pasar a get_raw_page, miraremos un número que con está función nos de type "regular"
SELECT brin_page_type(get_raw_page('brinidx', 0));



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
