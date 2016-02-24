https://docs.influxdata.com/influxdb/v0.10/guides/downsampling_and_retention/

# Down sampling automatico??
https://github.com/influxdata/influxdb/issues/4605

https://github.com/influxdata/influxdb/issues/2625
 hacen un proxy para convertir las queries en otras queries a unos RP que deben estar previamente creados con CQs

# Retention Policy
A retention policy (RP) is the part of InfluxDB’s data structure that describes for how long InfluxDB keeps data (duration) and how many copies of those data are stored in the cluster (replication factor). A database can have several RPs and RPs are unique per database.

El truco es crear una RP por defecto de duración corta (horas).
Todos los usuario escribiran en esa RP con mucha frecuencia y el admin se encargará en Influx de ir pasando esos datos a otras RPs de mayor duración pero menor sampling

InfluxDB aplica, por defecto, los RP cada 30'. Configurable
[retention]
  enabled = True
  check-interval = “30m”

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

## Ver
SHOW RETENTION POLICIES ON base_de_datos

## Modificar
ALTER RETENTION POLICY <retention_policy_name> ON <database_name> DURATION <duration> REPLICATION <n> [DEFAULT]

## Borrar
DROP RETENTION POLICY <retention_policy_name> ON <database_name>
  Delete all measurements and data in a specific retention policy


# Downsampling
Hace uso de las Continuous Query (QC) para ejecutar queries cada cierto tiempo que hagan agregaciones de datos y los guarden de nuevo en la bbdd.
Mirar continuous_query.md

