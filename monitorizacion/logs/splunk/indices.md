http://docs.splunk.com/Special:SpecialLatestDoc?t=Documentation/Splunk/latest/Admin/HowIndexingWorks
http://docs.splunk.com/Documentation/Splunk/6.0.1/Indexer/HowSplunkstoresindexes

A los indexers nodes tambien le llaman 'peers'
Para cada índice se crean tres buckets: home, cold y thawed.
Como pasar de uno a otro bucket se hace por espacio por índice. Ejemplo, damos 10GB para el índice test para el bucket home, y 100GB para el bucket cold.
Hay que definir una política de como se generaran los buckets, y cada cuanto pasarán de uno a otro.
Por defecto poner "auto_high_volume" (http://docs.splunk.com/Documentation/Splunk/6.0.1/admin/Indexesconf)

El home lo guardaríamos en el disco más rápido, y serían los datos más recientes.
Cold, un poco menos usados.
Y thawed los que pronto serán eliminados

Por defecto va pasando los datos de un bucket a otro.

Hay valores por defecto para ver cuanto tiempo permanecen los datos en cada índice.
Se puede definir el parámetro frozenTimePeriodInSecs para que no pasen por el thawed y se borren directamente. Mirar. Mirar

As Splunk Enterprise indexes your data, it creates a bunch of files. These files fall into two categories:
The raw data in compressed form (rawdata: http://docs.splunk.com/Splexicon:Rawdatafile)
Indexes that point to the raw data, plus some metadata files (index files: http://docs.splunk.com/Splexicon:Indexfiles)



Para crear nuevos índices (dan igual mayúsuclas y minúsculas):
Settings -> Data - Indexes
http://10.0.3.68:8000/en-US/manager/launcher/data/indexes

Ruta por defecto /opt/splunk/var/lib/splunk/NOMBRE/db


Los índices van asignados a roles, y los usuarios a roles. No se puede asignar un índice a un usuario directamente.


Para ver si un índice está realizando la replicación podemos observar su log:
splunk/var/log/splunk/splunkd.log

## Consumo indexing ##
Búsqueda para ver el consumo por máquina por día:
index=_internal metrics kb series!=_* "group=per_host_thruput" monthsago=1 | eval indexed_mb = kb / 1024 | timechart fixedrange=t span=1d sum(indexed_mb) by series | rename sum(indexed_mb) as totalmb


## Cluster ##
Si quiero ver los índices, tengo que entrar en la interfaz web de alguno de los indexer (url:8000)




## Crear índice ##
/opt/splunk/etc/apps/search/local/indexes.conf
[web]
coldPath = $SPLUNK_DB/web/colddb
homePath = $SPLUNK_DB/web/db
thawedPath = $SPLUNK_DB/web/thaweddb
maxTotalDataSizeMB = 1000000
homePath.maxDataSizeMB = 15000
maxVolumeDataSizeMB = 1000000

Don’t add any more attributes to this index stanza, which is a way of accepting the defaults for all other settings. That means this index will store data in cold until we run into the size limitation set by our volume maxVolumeDataSizeMB or the default overall index size default of 500000 MB.
