https://severalnines.com/blog/ten-tips-going-production-postgresql

Activar pg_stat_statements para tener más info.

https://news.ycombinator.com/item?id=25915023
Notas sobre scaling postgres. Resumen, intentar mantener una instancia todo lo que sa posible.


# Cache
https://stackoverflow.com/questions/1216660/see-and-clear-postgres-caches-buffers
https://2ndquadrant.com/media/pdfs/talks/InsideBufferCache.pdf

El drop cache del SO (linux/performance/memoria/drop_caches.md) puede que no afecte en nada, ya que el cacheo lo esté realizando postgres

Podemos flushear memoria y reiniciar postgres (pg_ctl restart).

Extensión (ANTIGUA y parece que peligrosa) para dropear la cache: https://github.com/zilder/pg_dropcache


# Scale up
mirar vldb.md para tunning de grandes bbdd

# Scale out
## cache
memcached, pgmemcache

## multi node
pgbouncer, pgpool
pl/proxy
postgres-xl


# pg_xlog full
https://www.postgresql.fastware.com/blog/how-to-solve-the-problem-if-pg_xlog-is-full
dd if=/dev/zero of=/database/inst5/pg_wal/ONLY_DELETE_THIS_DUMMY_FILE_IN_A_POSTGRES_EMERGENCY  bs=1MB count=300

Dejar un fichero para poder borrarlo en caso de llenado del pg_wal


# Securizar
Quitar permisos por defecto de PUBLIC:
REVOKE ALL ON DATABASE db_name FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM PUBLIC;

Revisar pg_hba. Cuidado con tener lineas "trust"
