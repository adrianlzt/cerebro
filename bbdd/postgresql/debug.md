Para sacar al fichero de logs todas las queries
/var/lib/pgsql/data/postgresql.conf:
  log_statement = 'all'
  log_connections = on
  log_duration = on
  log_hostname = on

sed -i "s/#log_statement = 'none'/log_statement = 'all'/" postgresql.conf

Por defecto escribirá en el directorio: /var/lib/pgsql/data/pg_log
En el container lo sacara por docker logs

Recargar la configuración para que tenga efecto (como user postgres):
pg_ctl reload -D /var/lib/pgsql/data

pg_ctl reload -D /var/lib/postgresql/data/
  esto creo que es para ubutus y el container oficial
