# PostgreSQL 9.6
https://www.postgresql.org/docs/9.6/sql-reindex.html

REINDEX locks out writes but not reads of the index's parent table. It also takes an exclusive lock on the specific index being processed, which will block reads that attempt to use that index.

In contrast, DROP INDEX momentarily takes an exclusive lock on the parent table, blocking both writes and reads. The subsequent CREATE INDEX locks out writes but not reads; since the index is not there, no read will attempt to use it, meaning that there will be no blocking but reads might be forced into expensive sequential scans.
Podemos usar "CREATE INDEX CONCURRENTLY" para no bloquear escrituras mientras se crea el índice.


REINDEX va a bloquear lecturas que hagan uso del índice.
Si un plan necesita leer del índice, la query se quedará bloqueada hasta que termine REINDEX.
El planificador no es "listo" e intenta otro plan sabiendo que el índice está bloqueado (supongo porque no puede saber cuanto tiempo va a estar bloqueado el índice)
El tiempo que el índice está bloqueado se suma al "Planning time" si hacemos un "EXPLAIN ANALYZE".


REINDEX TABLE foo;
  reindexa todos los índices asociados a la tabla

REINDEX INDEX trends_uint_2018_12_pkey;
  reindexa únicamente ese índice


Tiempos de reindex, datos tomados sobre una VMWare con discos de cabina SSD.
Consume una única CPU al 100%.
También hace uso intensivo de lectura del disco y memoria.
Y entiendo que al terminar uso intensivo de escritura al disco.
5GB -> 3m40s
10GB -> 4m04s


# pg_repack
https://reorg.github.io/pg_repack/

PostgreSQL extension which lets you remove bloat from tables and indexes

Parece que nos permite hacer un reindex (en realidad está copiando y creando de nuevo) sin bloquear.

Crea una tabla de "log" donde va apuntando los cambios nuevos.
Mientras va copiando la tabla y recreando el índice.
Cuando termina hace el cambio de tablas (cambia el pg_class.relfilenode y no se si algo más) y borra la antigua.

Para los índices.
Crea un segundo índice del mismo tipo, usando CONCURRENTLY. Ejemplo: CREATE UNIQUE INDEX CONCURRENTLY index_1388129 ON partitions.trends_uint_2020_06 USING btree (itemid, clock) TABLESPACE pg_default
  "UNIQUE" revisa que no haya datos duplicados para la/las key/s seleccionadas
Al terminar, hace el cambio en los catalog
  parece que modifica relfilenode en pg_class
Dropea el índice viejo


## Instalar
Necesitamos tener instalado el paquete "devel", ejemplo: postgresql96-devel-9.6.3
Tambien: gcc readline-devel openssl-devel

Bajar y descomprimir zip
cd pg_repack*
PATH=/usr/pgsql-9.6/bin/:$PATH make
PATH=/usr/pgsql-9.6/bin/:$PATH make install
  /usr/pgsql-9.6/bin/pg_repack
  /usr/pgsql-9.6/lib/pg_repack.so
  /usr/pgsql-9.6/share/extension/pg_repack.control
  /usr/pgsql-9.6/share/extension/pg_repack--1.4.5.sql

Dentro de la db donde necesitamos la extensión:
foobar# CREATE EXTENSION pg_repack;


Ejemplo de repack de una tabla (--dry-run nos permite ver que tablas/índices se van a ver afectados, eliminar para la ejecucción)
/usr/pgsql-9.6/bin/pg_repack -d zabbix-server -t partitions.trends_uint_2020_06 --dry-run

Repack únicamente de los índices:
/usr/pgsql-9.6/bin/pg_repack -d zabbix-server -t partitions.trends_uint_2020_06 -x --dry-run

Si queremos modificar el fillfactor, haremos un ALTER INDEX antes del repack, y este ya cogerá ese parámetro para el nuevo índice.


Consume una CPU al 100% y lectura de disco (y entiendo que al final escritura de disco)

Unos tiempos como referencia.

Repack un índice
tamaño tabla: 31GB, tiempo: 24'

Repack una tabla:
20GB -> 23'

El repack de la tabla no bajó el bloat prácticamente en nada (0.6%)



# Desarrollo
Internamente el ejecutable hace uso de funciones declaradas:
Lista de funciones que declara:
\df repack.*

Función del ejecutable que procesa los índices: repack_table_indexes()
  BEGIN
  res = execute("SELECT repack.repack_indexdef($1, $2, $3, true)") // $1=indice, $2=tabla, $3=tablespace, cuarto param => concurrent_index
  res2 = execute_elevel(create_idx, 0, NULL, DEBUG2); // ejecutar la instrucción almacenada en create_idx (que es el primer elemento de res)

  repack_indexdef()  // Reproduce DDL that create index at the temp table
    para generar la cadena completa CREATE INDEX... hace uso de:
    parse_indexdef(&stmt, index, table)  // stmt es donde retornará los datos
      pg_get_indexdef_string()  // obtiene la definición de la creación del índice. https://doxygen.postgresql.org/ruleutils_8c_source.html#l01100 Get the definition of an index

  Hace un lock ACCESS EXCLUSIVE a la tabla
  Hace el swap: repack_index_swap()
    SELECT repack.repack_index_swap($1)  -- Swap out an original index on a table with the newly-created one
      obtiene el OIDdel nuevo índice
      swap_heap_or_index_files(orig_idx_oid, repacked_idx_oid);
        parece que esta es una operación a bajo nivel

  COMMIT

Para hacer repack de una tabla: repack_table_indexes()

