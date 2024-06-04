https://clickhouse.com/docs/en/guides/developer/cascading-materialized-views
https://clickhouse.com/blog/using-materialized-views-in-clickhouse

Las materailized views son una forma de almacenar los resultados de una consulta en una tabla, de manera que se actualiza automáticamente cuando los datos subyacentes cambian. Esto permite que las consultas sean más rápidas, ya que no es necesario volver a calcular los resultados cada vez que se ejecuta la consulta.
Se puede ver como un trigger que se ejecuta cada vez que se inserta, actualiza o elimina un registro en la tabla base. Este trigger almacenará los resultados en una tabla distinta.
