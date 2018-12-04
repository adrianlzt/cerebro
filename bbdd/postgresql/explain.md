http://postgresguide.com/performance/explain.html
https://www.postgresql.org/docs/9.4/static/using-explain.html
https://www.postgresql.org/docs/9.6/runtime-config-query.html
https://momjian.us/main/writings/pgsql/optimizer.pdf
  https://www.youtube.com/watch?v=P5iZri9s0WQ
https://explain.depesz.com/
  Herramienta web para visualizar los resultados de forma un poco más sencilla

Mostrar el plan para obtener los resultados de la query.
Sirve para buscar problemas de performance.

EXPLAIN SELECT * FROM tenk1;


Para planificar una query se tienen en cuenta las estadísticas de las tablas (periódicamente se ejecuta ANALYZE sobre las tablas y se almacenan los datos, mirar sección "Estadísticas") y varios parámetros de costes de acceso a disco (secuencial o random) y coste de procesado de la cpu (algo más?).


# Modos de escaneo
Con esos datos, el planner decide como obtener los datos.
  - sequential scan: cuando tenemos muchos datos que obtener (se aprovecha de que leer los datos secuencialmente es barato)
  - bitmap scan: para cuando no son muchos datos ni muy pocos. Consulta el índice (bitmap index) y luego obtiene los datos (bitmap heap) de cada valor resuelto por el índice
  - index scan: cuando tenemos que obtener muy pocos datos (escanemos siguiendo el índice. Más caro porque los bloques no son secuenciales)
  - index only scan: si solo necesitamos datos que están en el índice

Para los tres últimos tenemos que tener un índice creado.


# Modos de unión
Si tenemos joins, se usarán distintos tipos de algoritmos:
  - Nested Loop
    - With Inner Sequential Scan (es como hacer dos bucles for anidados)
    - With Inner Index Scan
  - Hash Join (si no tenemos demasiados datos, generamos un hash map en memoria y luego comparamos la otra contra ese mapa)
  - Merge Join (ordenamos los datos de las dos fuentes, y vamos buscando. El puntero que va leyendo en la segunda tabla solo avanza porque sabemos que los datos están ordenados)


# Coste
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

select * from pg_stas;

Mostrar los elementos más comunes almacenados en la tabla "road":
SELECT attname, inherited, n_distinct, array_to_string(most_common_vals, E'\n') as most_common_vals FROM pg_stats WHERE tablename = 'road';
