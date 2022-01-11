https://pgtune.leopard.in.ua/#/
https://github.com/jfcoz/postgresqltuner
https://postgresqlco.nf/en/doc/param/
  explicación de las diferentes configuraciones, agrupadas por categorías, con valores sugeridos, links a más info, etc
https://github.com/jberkus/annotated.conf/blob/master/guc_tutorial_10.pdf
  GUCS: grand unified configuration settings
  traspa con los 19 típicos que querremos tunear

Mirar "Function optimization" en funciones.md

Mirar explain.md
Mirar troubleshooting.md


Comenzar con pgtune para tener una primera aproximación.


# Fillfactor
https://www.postgresql.org/docs/9.6/sql-createtable.html#SQL-CREATETABLE-STORAGE-PARAMETERS

Esta opcion deja huecos para que las actualizaciones de rows puedan caer en la misma page que el dato y evitar fragmentación en tablas con muchos updates.
Por defecto = 100, sin huecos.


# work_mem
Cuidado! Cada nodo de un statement puede usar hasta esa cantidad de memoria.
Incrementarlo puede consumir mucha memoria en una sola query.

Regla general, solo incrementarlo para usuarios haciendo analíticas.

Si es muy pequeño, podemos estar forzando al planner a usar otros planes que quepan en la work_mem.
Muy grande, una query complicada puede hacer saltar el OOM.



# maintenance_work_mem
La memoria que usa vacuum.
Si es muy pequeño tendremos que hacer varias pasadas con el vacuum porque no dará a basto.
Más de 1GB no suele ser útil.

También afecta en la creación de índices, esta memoria se usará para escanear la tabla e ir escribiendo al disco.




# max_connections
Valor recomendado: 2 x cores
Es mejor esperar en el connection pool que dentro de un worker de postgres (que no podrá trabajar porque no tendrá CPU y estaremos forzando muchos contexts)
Poner un connection pooler puede ayudar.

Idea: si los procesos de postgres tienen muchos forced context switches puede estar indicando que tenemos demasiados procesos compitiendo por los CPUs



# shared_buffers
https://www.postgresql.org/docs/current/runtime-config-resource.html
25% de la memoria, MAL. Consejo antiguo no válido.

Otras areas de memoria que coge postgres tienen un tamaño proporcional al shared_buffers

shared_buffers muy grandes causa checkpoints más costosos.
Muy pequeños obliga a forzar el vaciado de bloques para poder cargar datos nuevos.
Más discusión en checkpoint.md

La idea es tener el valor más pequeño posible.

Será muy grande si vemos que no se le está dando uso.
Dejaremos ese uso más un pequeño percentaje.

pg_buffercache para ver como de lleno está.

Mirar monitoring.md pg_stat_m tunning.md
bgwriter para ver si los checkpoints llegan tarde y los shared_buffers están saturados.

Por debajo también está el cache de FS de linux.
Si nos comemos toda la memoria del sistema aquí, no la dejaremos para el cache de linux.




# full_page_writes
Podemos desactivarlo si conocemos con seguridad que no vamos a escribir la mitad de una página.
Si tenemos una cache de disco con baterias auxiliares, podemos considerar que tenemos un buen sistema que no va a cortar una escritura a mitad.



# wal
Mejor ponerlo en otro disco que esté tuneado para escrituras secuenciales.
Si tiene una cache battery-backuped conseguiremos fsync inmediatos que será lo mejor para los wal.



#_ seq_page_cost / random_page_cost
Por defecto 1 / 4
Para disco ssd poner random_page_cost 1.5 o 2.
Si los datos siempre están en memoria poner random_page_cost=1


# cpu_tuple_cost / cpu_index_tuple_cost / cpu_operator_cost / effective_cace_size
Mirar en explain.md
Generalmente no tiene mucho sentido tunear estos parámetros.


# checkpoint
mirar checkpoint.md
