https://severalnines.com/blog/ten-tips-going-production-postgresql

Activar pg_stat_statements para tener más info.


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
dd if=/dev/zero of=/database/inst5/pg_wal/
ONLY_DELETE_THIS_DUMMY_FILE_IN_A_POSTGRES_EMERGENCY  bs=1MB count=300

Dejar un fichero para poder borrarlo en caso de llenado del pg_wal


# Securizar
Quitar permisos por defecto de PUBLIC:
REVOKE ALL ON DATABASE db_name FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
