http://postgresguide.com/performance/explain.html
https://www.postgresql.org/docs/9.4/static/using-explain.html
https://www.postgresql.org/docs/9.6/runtime-config-query.html
https://severalnines.com/blog/performance-cheat-sheet-postgresql
  explicación de los campos del explain
https://momjian.us/main/writings/pgsql/optimizer.pdf
  https://www.youtube.com/watch?v=P5iZri9s0WQ
https://explain.depesz.com/
  Herramienta web para visualizar los resultados de forma un poco más sencilla
  Hay que pasarle el explain analyze para que sea más útil
https://github.com/postgres/postgres/blob/master/src/backend/optimizer/path/costsize.c
  viene una descripción de como que variables usan para estimar el coste y que suposiciones hacen (read ahead del kernel, seek costs, etc)
https://postgresqlco.nf/en/doc/param/?category=query-tuning&subcategory=planner-cost-constants
  variables que se usan para estimar el coste con sus explicaciones y pequeña discusión.

http://tatiyants.com/pev/#/plans/new
  web para pasar un explain y ver de forma más gráfica donde están los costes, etc

Mostrar el plan para obtener los resultados de la query.
Sirve para buscar problemas de performance.

Las queries se dividen en operaciones (nodes)
  - scan nodes: leer datos de las tablas
  - join nodes: combinar relaciones
  - otros: ordenar, agrupar, etc

EXPLAIN SELECT * FROM tenk1;
EXPLAIN (ANALYZE, BUFFERS) ...
EXPLAIN (ANALYZE, VERBOSE, BUFFERS) ...
  verbose: añade el ouput que genera cada nodo. Algo más?
EXPLAIN (ANALYZE, VERBOSE, BUFFERS, FORMAT JSON) ...


Para planificar una query se tienen en cuenta las estadísticas de las tablas (periódicamente se ejecuta ANALYZE sobre las tablas y se almacenan los datos, mirar sección "Estadísticas") y varios parámetros de costes de acceso a disco (secuencial o random) y coste de procesado de la cpu (algo más?).


# Modos de escaneo
Con esos datos, el planner decide como obtener los datos.
  - sequential scan: cuando tenemos muchos datos que obtener (se aprovecha de que leer los datos secuencialmente es barato)
      https://github.com/postgres/postgres/blob/master/src/backend/optimizer/path/costsize.c#L202
        total_cost = startup_cost + cpu_run_cost + disk_run_cost;
        Parece que el grueso del coste es: seq_page_cost * pages
        el cálculo de las pages parece que se cachea (https://github.com/postgres/postgres/blob/master/src/backend/optimizer/util/relnode.c#L1230)


  - bitmap scan: para cuando no son muchos datos ni muy pocos. Consulta el índice (bitmap index) y luego obtiene los datos (bitmap heap) de cada valor resuelto por el índice
  - index scan: cuando tenemos que obtener muy pocos datos (escanemos siguiendo el índice. Más caro porque los bloques no son secuenciales).
    2 lecturas, índice y tabla para obtener el dato. La lectura se paga como random_page_cost (por defecto 4, VS 1 de seq_page_cost).
  - index only scan: si solo necesitamos datos que están en el índice

Para los tres últimos tenemos que tener un índice creado.

Significado de los nodos sacado de https://github.com/AlexTatiyants/pev/blob/6d31cdd75f557761d7581da6c46586792e5f2dad/app/services/help-service.ts
   LIMIT:returns a specified number of rows from a record set
   SORT: sorts a record set based on the specified sort key
   NESTED LOOP: merges two record sets by looping through every record in the first set and trying to find a match in the second set. All matching records are returned
   MERGE JOIN: merges two record sets by first sorting them on a join key
   HASH: generates a hash table from the records in the input recordset. Hash is used by Hash Join
   HASH JOIN: joins to record sets by hashing one of them (using a Hash Scan)
   AGGREGATE: groups records together based on a GROUP BY or aggregate function (like sum())
   HASHAGGREGATE: groups records together based on a GROUP BY or aggregate function (like sum()). Hash Aggregate uses a hash to first organize the records by a key
   SEQ SCAN: finds relevant records by sequentially scanning the input record set. When reading from a table, Seq Scans (unlike Index Scans) perform a single read operation (only the table is read)
   INDEX SCAN: finds relevant records based on an Index. Index Scans perform 2 read operations: one to read the index and another to read the actual value from the table
     este segundo acceso tiene coste random_page_cost
   INDEX ONLY SCAN: finds relevant records based on an Index. Index Only Scans perform a single read operation from the index and do not read from the corresponding table
    si la página que va a leer no está "true" en el visibility map (o no existe aún), tendrá que ir al heap para ver si es una dead row
    explicación y ejemplo: https://blog.dbi-services.com/an-index-only-scan-in-postgresql-is-not-always-index-only/
   BITMAP HEAP SCAN: searches through the pages returned by the Bitmap Index Scan for relevant rows
   BITMAP INDEX SCAN: uses a Bitmap Index (index which uses 1 bit per page) to find all relevant pages.  Results of this node are fed to the Bitmap Heap Scan
   CTE SCAN: performs a sequential scan of Common Table Expression (CTE) query results. Note that results of a CTE are materialized (calculated and temporarily stored)


# Modos de unión
Si tenemos joins, se usarán distintos tipos de algoritmos:
  - Nested Loop
    - With Inner Sequential Scan (es como hacer dos bucles for anidados)
    - With Inner Index Scan
  - Hash Join (si no tenemos demasiados datos, generamos un hash map en memoria y luego comparamos la otra contra ese mapa)
  - Merge Join (ordenamos los datos de las dos fuentes, y vamos buscando. El puntero que va leyendo en la segunda tabla solo avanza porque sabemos que los datos están ordenados)


To combine multiple indexes, the system scans each needed index and prepares a bitmap in memory giving the locations of table rows that are reported as matching that index's conditions. The bitmaps are then ANDed and ORed together as needed by the query. Finally, the actual table rows are visited and returned. The table rows are visited in physical order, because that is how the bitmap is laid out; this means that any ordering of the original indexes is lost, and so a separate sort step will be needed if the query has an ORDER BY clause. For this reason, and because each additional index scan adds extra time, the planner will sometimes choose to use a simple index scan even though additional indexes are available that could have been used as well.



# Desactivar nodos de escaneo / unión
https://www.postgresql.org/docs/9.6/runtime-config-query.html

En realidad no se desactivan, pero se penalizan sumando 1^10 (https://github.com/postgres/postgres/blob/master/src/backend/optimizer/path/costsize.c#L118)

Ejemplo:
SET seq_page_cost to off;
SHOW seq_page_cost;




# Coste
https://github.com/postgres/postgres/blob/master/src/backend/optimizer/path/costsize.c
backend/optimizer/path/costsize.c

cost=0.00..483.00 rows=7001 width=244
  0.00: coste de arranque
  483: coste de procesado
  rows: numero estimado de rows del output
  width: media de longitud de las rows

El coste es una unidad arbitraria donde se suele sumar 1 por cada página de disco leída más otros procesamientos
https://www.postgresql.org/docs/9.4/static/runtime-config-query.html#RUNTIME-CONFIG-QUERY-CONSTANTS

Por ejemplo, si ejecutamos la query:
SELECT * FROM tenk1 WHERE unique1 < 7000;
Tendremos un coste 483 que es:
  358 disk pages * 1 coste/pag
  10000 row * 0.01 coste/row (coste por procesar cada row, cpu_tuple_cost)
  10000 row * 0.0025 coste/row (coste por procesar la clausula where por cada row, cpu_operator_cost)


# Si queremos obtener una imagen de como está calculando los costes necesitaremos obtener los valores
Costes:
select name,short_desc,setting from pg_settings where name like '%_cost';

Tuplas y páginas por tablas e índices:
SELECT relname, relkind, reltuples, relpages FROM pg_class;

Estadísticas:
select * from pg_stats;

Cuando se generaron las últimas estadísticas:
select relname,last_vacuum,last_autovacuum,last_analyze,last_autoanalyze from pg_stat_user_tables;

Obtener un EXPLAIN y un EXPLAIN ANALYZE de la query



# Tiempo
https://stackoverflow.com/questions/17653884/postgres-query-execution-time


Para que nos diga al terminar la ejecucción cuando tiempo ha tardado:
\timing
SELECT 1;

Para ver el detalle de donde va el tiempo (tiene cierto overhead):
EXPLAIN ANALYZE select ...

Menos detallado pero sin overhead:
EXPLAIN (ANALYZE TRUE, TIMING FALSE) select...




# Estadísticas
https://www.postgresql.org/docs/11/planner-stats.html
https://www.postgresql.org/docs/11/catalog-pg-class.html
https://github.com/postgres/postgres/blob/master/src/backend/optimizer/path/costsize.c
  viene una descripción de como que variables usan para estimar el coste y que suposiciones hacen (read ahead del kernel, seek costs, etc)
https://github.com/postgres/postgres/blob/master/src/backend/utils/adt/selfuncs.c
  calculos de cpu, etc

pg_class almacena el número de entradas en cada tabla e índice.

Saber número de rows y páginas ocupadas por cada table (datos e índices)
SELECT relname, relkind, reltuples, relpages FROM pg_class WHERE relname LIKE 'NOMBRETABLA%';

Esta tabla también tiene un puntero (relfilenode) al fichero físico que almacena la información (PGDATA/base/XXX/relfilenode*)


Luego tenemos la tabla pg_stats que almacena información sobre los datos almacenados.
  Una entrada por cada columna por cada tabla
  null_frac: Fraction of column entries that are null
  avg_width: Average width in bytes of column's entries
  n_distinct: número de valores distintos (negativo si postgres cree que según crezca la tabla van a aparecer más valores distintos)
  most_common_vals: valores más repetidos
  most_common_freqs: valores para la columna most_common_vals
  histogram_bounds: grupos de valores donde tenemos más o menos la misma cantidad de elementos. Ej: [0-5], (5,9], (10,100] (en estos tres grupos habriá el mismo count de elementos)
  correlation: correlación entre el orden físicos de los datos y el orden lógico. Si el valor es cercano a 1 o -1, un index scan será más barato, por la reducción de random access
  most_common_elems: lo mismo para chars?

select * from pg_stats;

Mostrar los elementos más comunes almacenados en la tabla "road":
SELECT attname, inherited, n_distinct, array_to_string(most_common_vals, E'\n') as most_common_vals FROM pg_stats WHERE tablename = 'road';



Cuidado con los cast.
Si al hacer una comparación los tipos de datos son distintos, no podrá usar el index



Cuidado con los cast.
Si al hacer una comparación los tipos de datos son distintos, no podrá usar el index
