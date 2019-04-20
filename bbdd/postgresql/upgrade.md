https://www.postgresql.org/docs/current/upgrading.html

Para actualizaciones "minor" simplemente para el servidor, cambiar los binarios y arrancar de nuevo.

Para cambios "major" tenemos que usar pg_upgrade, pg_dumpall (hacer un backup lógico e importarlo en la nueva versión) o data replication (crear un slave con la versión nueva)


# pg_upgrade
https://www.postgresql.org/docs/current/pgupgrade.html

Al ejecutar pg_upgrade este arrancará los dos servidores (viejo y nuevo) para hacer el movimiento de datos.


# pg_dumpall
pg_dumpall -f NOMBREDB_(date +%Y%m%d).sql -h HOST -U USUARIO -l NOMBREDB
  el fichero .sql se va generando en bloques de 2GB
  el .sql contendrá las instrucciones para crear la database

Paramos la vieja postgres
Arrancamos la nueva postgres

psql -f NOMBREDB_(date +%Y%m%d).sql -h HOST -U USUARIO
