https://www.postgresql.org/docs/current/app-pgcontroldata.html

LC_ALL=c /usr/pgsql-14/bin/pg_controldata -D data

Para obtener datos de la bbdd sin necesidad de arrancarla.


Posibles valores para este campo: https://github.com/postgres/postgres/blob/master/src/bin/pg_controldata/pg_controldata.c#L50
Database cluster state:               in production


Parece que pg_controldata lee el fichero, binario, global/pg_control.
