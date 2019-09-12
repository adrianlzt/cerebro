Como montar un cluster.

Si usamos pg_pool, si el cliente arranca una transacción (BEGIN), esta siempre se considerará de escritura y se enviará al nodo master?


Query muy costosa. Como saber cual está siendo el cuello de botella.


BRIN versus Btree INDEXES
Mejor para zabbix history tables?
  work best when the data on disk is sorted: y esto como se controla?


por que nuestras history tienen tanto bloat
si solo sufren inserciones
y sus índices también



https://hypopg.readthedocs.io/en/latest/
recomendable? opiniones?

pg_jbomon, para que sirve?


test.md Util? caso de uso? Con python o golang?


constraint_exclusion=on
que sentido tiene para tablas que no sean partition?
En zabbix lo tenemos a partition (valor por defecto)
En https://github.com/Doctorbal/zabbix-postgres-partitioning#common-partitioning-mistakes recomienda on (abierta issue para preguntar por qué)



Como funciona el wal. Que se almacena? los comandos que vamos ejecutando.
Si hacemos un borrado de varios gigas, los wal contendran esos datos borrados?



Directorio pg_wal muy grande. Estamos casi sin espacio en disco.
Hemos movido unos cuantos a otro disco con "ln -s" pero no vemos que se borren.
Suceden los checkpoints pero no se borran.
Como decide postgres que debe borrar ficheros de pg_wal?

Teniamos wal_keep_segments=2000 por eso no los borraba
Tiene sentido seguir usando ese parámetro?
https://blog.dataegret.com/2018/04/pgwal-is-too-big-whats-going-on.html
Aqui hablan de que los replication slots ya se encargan de mantener los wal necesarios para que las replicas no pierdan sync


Migración 9.6 a 11


https://github.com/ohmu/pgmemcache
desarrollo parado?
Como cachear resultados? Y si estos tienen un timestamp que es now?


como poder capturar eventos en tablas que tienen muchos inserts y drops. la historia esta que decia alex.


almacenar cambios en una tabla para poder volver al estado de esa tabla en un punto en el tiempo cualquiera.

ventajas de velocidad de inserción de postgres 12 vs 10/11 vs timescaledb

ventajas/desventajas de meter más particiones para la misma tabla
