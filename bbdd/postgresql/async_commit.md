https://www.postgresql.org/docs/current/wal-async-commit.html
https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-SYNCHRONOUS-COMMIT

Asynchronous commit
Fast vs Safe

Esperar, o no (fast), a guardar los datos en el fichero en el FS.

No tenemos riesgo de inconsitencia, sí de pérdida de datos.

This can result in up to wal_buffers or wal_writer_delay * 2 worth of data in an unexpected shutdown, but your database will not be corrupted

Asynchronous commit is an option that allows transactions to complete more quickly, at the cost that the most recent transactions may be lost if the database should crash.
In many applications this is an acceptable trade-off.

Se debe especificar a nivel global o en cada TX.
