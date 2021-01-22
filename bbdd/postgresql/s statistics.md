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

https://dalibo.github.io/pev2/#/
  nueva versión del pev de tatiyants

http://tatiyants.com/pev/#/plans/new
  web para pasar un explain y ver de forma más gráfica donde están los costes, etc

https://github.com/StarfishStorage/explain-running-query
  ejecutar un explain sobre una running querie. Requiere instalar simbolos y gdb

Un analizador de pago, 10 gratis. Da recomendaciones.
https://www.pgmustard.com/pricing

Mirar tunning.md para los parametros de coste

Podemos activar auto_explain para mostrar el plan de queries que consuman mucho tiempo.
Activarlo impacta en el performance, se debe almacenar el explain de todas las queries para mostrarlo si consumen mucho tiempo.
https://www.postgresql.org/docs/current/auto-explain.html

Mostrar el plan para obtener los resultados de la query.
Sirve para buscar problemas de performance.

Las queries se dividen en operaciones (nodes)
  - scan nodes: leer datos de las tablas
  - join nodes: combinar relaciones
  - otros: ordenar, agrupar, etc

Hay muchas formas de resolver la query: que índices usar, como hacer los join, que algoritmo join/group usar?
El optimizer es el encargado de encargar el plan.

Entre versiones de postgres, las piezas generales no cambian, pero los segundos niveles se suelen ver modificados mucho.

EXPLAIN SELECT * FROM tenk1;
EXPLAIN (ANALYZE, BUFFERS) ...
EXPLAIN (ANALYZE, VERBOSE, BUFFERS) ...
  verbose: añade el ouput que genera cada nodo. Algo más?
EXPLAIN (ANALYZE, VERBOSE, BUFFERS, FORMAT JSON) ...

EXPLAIN (ANALYZE, COSTS, VERBOSE, BUFFERS, FORMAT JSON) SELECT ...
psql -qAt -f explain.sql > analyze.json



Para planificar una query se tienen en cuenta las estadísticas de las tablas (periódicamente se ejecuta ANALYZE sobre las tablas y se almacenan los datos, mirar sección "Estadísticas") y varios parámetros de costes de acceso a disco (secuencial o random) y coste de procesado de la cpu (algo más?).
Mirar "Estadísticas" más abajo.


Si un índice está bloqueado para lectura (por un REINDEX por ejemplo), ese tiempo de bloqueo se contará en el "Planning time"


# Modos de escaneo
Con esos datos, el planner decide como obtener los datos.
  - sequential scan (full table scan): cuando tenemos muchos datos que obtener (se aprovecha de que leer los datos secuencialmente es barato)
      https://github.com/postgres/postgres/blob/master/src/backend/optimizer/path/costsize.c#L202
        total_cost = startup_cost + cpu_run_cost + disk_run_cost;
        Parece que el grueso del coste es: seq_page_cost * pages
        el cálculo de las pages parece que se cachea (https://github.com/postgres/postgres/blob/master/src/backend/optimizer/util/relnode.c#L1230)

  - index scan: cuando tenemos que obtener muy pocos datos (escanemos siguiendo el índice. Más caro porque los bloques no son secuenciales).
    2 lecturas, índice y tabla para obtener el dato. La lectura se paga como random_page_cost (por defecto 4, VS 1 de seq_page_cost).
    Tiene un pequeño tiempo de carga y luego es logarítmico para obtener un valor, es decir, por mucho que crezca el tamaño del índice, encontrar un solo valor no costará mucho más.
    Pero si tenemos que obtener varios valores, la curva empieza a ser más lineal.

  - index only scan: si solo necesitamos datos que están en el índice

  - bitmap scan: para cuando no son muchos datos ni muy pocos. Consulta el índice (bitmap index) y luego obtiene los datos (bitmap heap) de cada valor resuelto por el índice
    Lo que hace es crear un array de bits que luego servirán para saber que bloques leer y cuales ignorar.
    Lo mejor es que si tenemos OR/AND podemos hacer joins sencillos de esos arrays de bits, veremos nodos tipo BitmapAnd
    BitmapHeapScan es quien se irá a las tablas a buscar los datos.
    Este modo de escaneo es el único que puede usar varios índices.
    En este modo es también logarítmico, pero con mayor coste de comienzo.

Para los tres últimos tenemos que tener un índice creado.


Significado de los nodos sacado de https://github.com/AlexTatiyants/pev/blob/6d31cdd75f557761d7581da6c46586792e5f2dad/app/services/help-service.ts
   LIMIT:returns a specified number of rows from a record set, si vemos que el cost estimado es igual que el nodo inferior, postgres nos está diciendo que este nodo se ejecuta junto con el nodo inferior
     por ejemplo, si tenemos un sort + limit, la función sort se le pasa que solo queremos el top 25 y no se encargará de ordenar los que no sean top 25.
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


To combine multiple indexes, the system scans each needed index and prepares a bitmap in memory giving the locations of table rows that are reported as matching that index's conditions. The bitmaps are then ANDed and OR