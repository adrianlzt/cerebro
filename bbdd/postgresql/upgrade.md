https://www.postgresql.org/docs/current/upgrading.html

Para actualizaciones "minor" simplemente para el servidor, cambiar los binarios y arrancar de nuevo.

Para cambios "major" tenemos que usar pg_upgrade, pg_dumpall (hacer un backup lógico e importarlo en la nueva versión) o data replication (crear un slave con la versión nueva)

Si intentas arrancar una versión con una major diferente a los ficheros del PGDATA, protestará y no arrancará.

Ideal (los clientes solo notarán longs waits entre pause y resume):
  poner pgbouncer y apuntar las conex ahí
  montar un nuevo server
  montar pglogical entre el antiguo y el nuevo
  esperar a que la replicación sincronice (puede tardar mucho si es muy grande la db)
  hacer en un momento que no haya excesiva carga, tenemos que tener poco lag para que tengamos un tiempo corto entre pause y resume
  dar el cambiazo en pgbouncer: pause, reload, resume (antes de hacer el resume, asegurarnos que los server están en sync)
  comprobar que todo funciona
  limpiar configs antiguas de pgbouncer, quitar replication, quitar old server



# pg_logical
Casi sin downtime.
Sin riesgo de pérdida de datos
Fácil hacer roll-back
Probar la nueva versión mientras la vieja está aún corriendo.

La idea es montar un nuevo server, conectarlo con logical replication, esperar a que termine de sincronizar.
En ese momento, parar el software, esperar que termine de sincronizar de nuevo (poco tiempo) y cambiar el puntero de la app para que apunte a la nueva instancia.


# PgBouncer
Podemos usar el connection routing para hacer el switch de una bbdd antigua a otra nueva en un momento dado.
Lo pondremos en pause, que pondrá las nuevas en pausa y dejará terminar las que estén corriendo.
Se hace el cambio, reload y permitimos de nuevo las conex.
  PAUSE
  RELOAD
  RESUME
Más datos en pgbouncer.md



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
