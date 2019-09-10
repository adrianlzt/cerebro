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
