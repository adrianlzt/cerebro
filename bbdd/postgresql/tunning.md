https://pgtune.leopard.in.ua/#/
https://github.com/jfcoz/postgresqltuner
https://postgresqlco.nf/en/doc/param/
  explicación de las diferentes configuraciones, agrupadas por categorías, con valores sugeridos, links a más info, etc

# Fillfactor
https://www.postgresql.org/docs/9.6/sql-createtable.html#SQL-CREATETABLE-STORAGE-PARAMETERS

Esta opcion deja huecos para que las actualizaciones de rows puedan caer en la misma page que el dato y evitar fragmentación en tablas con muchos updates.
Por defecto = 100, sin huecos.


# work_mem
Cuidado! Cada nodo de un statement puede usar hasta esa cantidad de memoria.
Incrementarlo puede consumir mucha memoria en una sola query.


# max_connections
Valor recomendado: 2 x cores
Es mejor esperar en el connection pool que dentro de un worker de postgres (que no podrá trabajar porque no tendrá CPU y estaremos forzando muchos contexts)
Poner un connection pooler puede ayudar.

Idea: si los procesos de postgres tienen muchos forced context switches puede estar indicando que tenemos demasiados procesos compitiendo por los CPUs


# shared_buffers
