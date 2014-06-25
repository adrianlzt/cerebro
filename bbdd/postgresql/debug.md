Para sacar al fichero de logs todas las queries
/var/lib/pgsql/data/postgresql.conf:
  log_statement = 'all'
  log_connections = on
  log_duration = on
  og_hostname = on

Por defecto escribirá en: /var/lib/pgsql/data/pg_log

Recargar la configuración para que tenga efecto (como user postgres):
pg_ctl reload -D /var/lib/pgsql/data
