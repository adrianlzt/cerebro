https://www.postgresql.org/docs/current/pgstatstatements.html

Suele venir en el paquete -contrib:
/usr/pgsql-12/share/extension/pg_stat_statements.*

La tenemos que cargar en shared_preload_libraries, en el fichero de config o con:
alter system set shared_preload_libraries = pg_stat_statements;
  valores separados por coma. Comprobar antes si ya tenemos algún valor definido: show shared_preload_libraries ;
  para poner varios: alter system set shared_preload_libraries = pgaudit,pg_stat_statements;


systemctl restart postgresql-NN

Para poder acceder a la vista y funciones de esta extensión tendremos que ejecutar el siguiente comando en las databases que queramos analizar:
create extension pg_stat_statements;

Una vez ejecutado el create extension ya quedará cargado para siempre en esa db (aunque reiniciemos).


# Vista
select * from pg_stat_statements;

Queries con más tiempo total, cuantas veces han sido llamadas, cuantas rows traidas y el hit_percent:
SELECT pu.usename, query, calls, total_time, rows, 100.0 * shared_blks_hit nullif(shared_blks_hit + shared_blks_read, 0) AS hit_percent FROM pg_stat_statements pss join pg_user pu ON (pu.usesysid=pss.userid) ORDER BY total_time DESC LIMIT 5;


# Reiniciar estadísticas
pg_stat_statements_reset(userid Oid, dbid Oid, queryid bigint);
Podemos no especificar alguno de los valores para que que matchee todos los de ese tipo.

Ejemplo para reiniciar todo:
SELECT pg_stat_statements_reset(0,0,0);
