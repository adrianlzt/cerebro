mirar logs.md

para PL/pgSQL mirar omnidb.md


Para sacar al fichero de logs todas las queries
/var/lib/pgsql/data/postgresql.conf:
  log_statement = 'all'
  log_connections = on
  log_disconnections = on
  log_duration = on
  log_hostname = on
  log_min_duration_statement = -1

sed -i "s/#log_statement = 'none'/log_statement = 'all'/" postgresql.conf

Por defecto escribirá en el directorio: /var/lib/pgsql/data/pg_log
En el container lo sacara por docker logs

Recargar la configuración para que tenga efecto (como user postgres):
sudo -u postgres pg_ctl reload -D /var/lib/pgsql/data

pg_ctl reload -D /var/lib/postgresql/data/
  esto creo que es para ubutus y el container oficial


Debug a bajo nivel (gdb, etc)
https://wiki.postgresql.org/wiki/Developer_FAQ#How_do_I_look_at_a_query_plan_or_parsed_query.3F
https://github.com/tvondra/gdbpg
https://blog.2ndquadrant.com/postgresql-install-debuginfo/
