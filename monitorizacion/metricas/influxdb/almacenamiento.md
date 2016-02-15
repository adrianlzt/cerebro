https://docs.influxdata.com/influxdb/v0.9/concepts/storage_engine/

Ver que motor estamos usando:
use _internal
select time,blksWrite,hostname,version,path from engine where path =~ /.*BASEDEDATOS.*/ and time > now() - 25s order by time desc limit 20

# Cambiar el motor
/etc/influxdb/influxdb.conf
[data]
  ...
  engine ="tsm1"

service influxdb restart

Si una bbdd estaba con el motor antiguo, se queda con este.
Parece que en la version 0.10 van a sacar algo para migrar las bbdd a tsm1


# Borrar database
Si borramos una database parece que desaparece completamente al reiniciar (es cuando dejo de verla en _internals.engine


# TSM1
Time Structured Merge Tree

Permite añadir datos a una serie ya creada.

Permite modificar values.
La time + las tags es la primary key.

https://docs.influxdata.com/influxdb/v0.10/concepts/storage_engine/
It has a write ahead log, a collection of data files which are read-only indexes similar in structure to SSTables in an LSM Tree, and a few other files that keep compressed metadata.

InfluxDB will create a shard for each block of time. For example, if you have a retention policy with an unlimited duration, shards will get created for each 7 day block of time. Each of these shards maps to an underlying storage engine database. Each of these databases has its own WAL, compressed metadata that describe which series are in the index, and the index data files.

# BZ1
http://roobert.github.io/2015/10/10/Columned-Graphite-Data-in-InfluxDB/
It turns out that with the original storage engine BZ1 it's not only inefficient to do lookups on multiple field data, it's also not possible to add fields to a metric once it's been written to.




Por defecto: /var/lib/influxdb/data/NOMBRE_BBDD/

Para unos 90 services de Icinga, tomando datos de 90 días:
6.3MB

