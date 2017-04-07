https://docs.influxdata.com/influxdb/latest/guides/downsampling_and_retention/

Un problema es luego como lanzar las queries para pillar los datos normales y los downsampled.
Según me han dicho en un webmeeting (6/4/2017) está en el roadmap.
También han dicho que van a implementar autoretention policy para el proximo año (2018)


# Down sampling automatico??
El problema mayoritariamente es que se pueden almacenar strings y no esta claro como gestionar esto.

Parece que no se puede aplicar un CQ a todas las measurements de todas las DBs.
Se puede usar el splash operator para reducir todas las values de un measurement, pero solo sin todas númericas.
¿Que hacer con las de texto?

Otras formas:
https://github.com/influxdata/influxdb/issues/4605

https://github.com/influxdata/influxdb/issues/2625
 hacen un proxy para convertir las queries en otras queries a unos RP que deben estar previamente creados con CQs



# Retention Policy
A retention policy (RP) is the part of InfluxDB’s data structure that describes for how long InfluxDB keeps data (duration) and how many copies of those data are stored in the cluster (replication factor). A database can have several RPs and RPs are unique per database.
Por debajo lo que va a hacer es borrar ciertos shards. 
Podemos ver cuando ocupa cada field mirando los ficheros (un shard por fichero) y con esta query podemos ver cada shard que zona de tiempo ocupa.
Cuando tipo ocupa cada shar lo podemos ver con: SHOW RETENTION POLICIES ON database (campo shardGroupDuration)
influx -execute "SHOW SHARDS" | less

El truco es crear una RP por defecto de duración corta (horas).
Todos los usuario escribiran en esa RP con mucha frecuencia y el admin se encargará en Influx de ir pasando esos datos a otras RPs de mayor duración pero menor sampling

InfluxDB aplica, por defecto, los RP cada 30'. Configurable (If you lower that value, the check will run more frequently. Running it too frequently can cause adverse performance issues though.)
[retention]
  enabled = True
  check-interval = “30m”

Cada vez que se ejecuta esto se mete esta traza en el log:
[retention] 2017/04/07 07:18:58 retention policy shard deletion check commencing

Cuando se borra un shard de la base de datos se ejecuta una traza tipo:
[retention] 2017/04/07 13:18:58 deleted shard group 499 from database NOMBREDATABASE, retention policy default

En la siguiente vuelta se borrará el fichero sacando una traza:
[retention] 2017/04/07 14:22:02 shard ID 572 from database NOMBREDATABASE, retention policy default, deleted


## DEFAULT
Es un RP proporcionado por Influx a falta de otro

duración inifinita
replicación igual al número de nodos del cluster

## default
Por defecto toma los valores de DEFAULT, pero podemos configurarlo como nosotros qurramos.
Será el que se usa si no se especifica nada.

## Crear
CREATE RETENTION POLICY nombre_policy ON base_de_datos DURATION 2h REPLICATION 1 DEFAULT
  el nombre de la policy puede ser algo descriptivo tipo: dos_ultimas_horas (sin numero al comienzo)
  Poner "DEFAULT" al final hace que esta RP se vuelva la de por defecto
  Minimo 1h

Las durations se definen con:
h hour
d day
w week

## Ver
SHOW RETENTION POLICIES ON base_de_datos

## Modificar
ALTER RETENTION POLICY <retention_policy_name> ON <database_name> DURATION <duration> REPLICATION <n> [DEFAULT]

Ejemplo (6 meses):
ALTER RETENTION POLICY default ON midb DURATION 26w

## Borrar
DROP RETENTION POLICY <retention_policy_name> ON <database_name>
  Delete all measurements and data in a specific retention policy


# Downsampling
Hace uso de las Continuous Query (QC) para ejecutar queries cada cierto tiempo que hagan agregaciones de datos y los guarden de nuevo en la bbdd.
Mirar continuous_query.md

