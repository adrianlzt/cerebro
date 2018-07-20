https://www.postgresql.org/docs/9.4/static/using-explain.html

Mostrar el plan para obtener los resultados de la query.
Sirve para buscar problemas de performance.

EXPLAIN SELECT * FROM tenk1;


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


# Modos de escaneo
Seq Scan: pasamos por todos los rows uno por uno
Bitmap Index Scan: se escanea el indice buscando valores
Bitmap Heap Scan: se obtienen rows a partir de un child que nos ha devuelto la posición de los índices
Index Scan: escaneamos en el orden del índice (más caro porque no está ordenado según los bloques de disco)
Nested Loop: parece que esto se usa para hacer joins de tablas, tendrá al menos dos childs con las tablas a escanear



# Tiempo
https://stackoverflow.com/questions/17653884/postgres-query-execution-time


Para que nos diga al terminar la ejecucción cuando tiempo ha tardado:
\timing
SELECT 1;

Para ver el detalle de donde va el tiempo (tiene cierto overhead):
EXPLAIN ANALYZE select ...

Menos detallado pero sin overhead:
EXPLAIN (ANALYZE TRUE, TIMING FALSE) select...


