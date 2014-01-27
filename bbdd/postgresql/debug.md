Para sacar al fichero de logs todas las queries
/var/lib/pgsql/data/postgresql.conf:
  log_statement = 'all'

Por defecto escribirá en: /var/lib/pgsql/data/pg_log

Recargar la configuración para que tenga efecto:
pg_ctl reload -D /var/lib/pgsql/data
