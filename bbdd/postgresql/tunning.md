# Fillfactor
https://www.postgresql.org/docs/9.6/sql-createtable.html#SQL-CREATETABLE-STORAGE-PARAMETERS

Esta opcion deja huecos para que las actualizaciones de rows puedan caer en la misma page que el dato y evitar fragmentación en tablas con muchos updates.:w
Por defecto = 100, sin huecos.
