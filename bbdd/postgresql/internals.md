https://eng.uber.com/mysql-migration/

Comentan algunos detalles de como funciona internamente postgres, de como almacena la información en disco.


# Memoria / disco / wal
Por defecto los bloques en memoria y disco son 8kB

Al leer las cosas se mueven del disco a shared buffers.
Si se realiza la misma lectura se leerá del shared buffer.

Si realizamos un update, se lleva a un WAL buffer.
Del wal buffer se escriben a WAL files de 16MB

Cuando se llenan los shared buffers, tenemos que empezar a borrar bloques.
Los bloques que han sido actualizados y tienen cambios en el WAL son "dirty", esos no se pueden borrar hasta que no se flusheen a disco.

Si necesitamos memoria y no tenemos, un select puede forzar que dirty blocks se muevan al disco.

"checkpoint" es cuando postgres va moviendo cosas al disco.
