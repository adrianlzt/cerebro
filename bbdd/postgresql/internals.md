https://eng.uber.com/mysql-migration/

Comentan algunos detalles de como funciona internamente postgres, de como almacena la información en disco.


# Memoria / disco / wal
Por defecto los bloques en memoria y disco son 8kB

Al leer las cosas se mueven del disco a shared buffers.
Si se realiza la misma lectura se leerá del shared buffer.

Si realizamos un update, se lleva a un WAL buffer.
Del wal buffer se escriben a WAL files (de 16MB), de manera secuencial (rápido).

Cuando se llenan los shared buffers, tenemos que empezar a borrar bloques.
Los bloques que han sido actualizados y tienen cambios en el WAL son "dirty", esos no se pueden borrar hasta que no se flusheen a disco.
También los bloques guardan un metadata de el último WAL que se aplicó, para evitar una reaplicación en caso de crash y tener que reaplicar los WAL a lo almacenado en disco.
También tiene un metadata 0-5 de uso (5=max use)

Si necesitamos memoria y no tenemos, un select puede forzar que dirty blocks se muevan al disco.

"checkpoint" es cuando postgres va moviendo cosas al disco y borrando los WAL files que ya no hacen falta.

"bgwriter" cada 200ms, flushea los least used (el número de páginas que se van a flushear es un cálculo basado en dos parametros https://postgresqlco.nf/en/doc/param/bgwriter_lru_multiplier)
Mirar checkpoint.md "# Checkpoint"


# buffers
Consultar el shared buffer, podemos usar la extensión pg_buffercache
https://paquier.xyz/postgresql-2/postgres-feature-highlight-pg_buffercache/

create EXTENSION pg_buffercache;
