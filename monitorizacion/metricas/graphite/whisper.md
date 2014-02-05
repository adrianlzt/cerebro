http://graphite.readthedocs.org/en/latest/whisper.html
http://restreaming.me/2012/07/04/xfilesfactor-and-graphite-whisper/

Whisper is a fixed-size database, similar in design and purpose to RRD (round-robin-database). It provides fast, reliable storage of numeric data over time. Whisper allows for higher resolution (seconds per point) of recent data to degrade into lower resolutions for long-term retention of historical data.

Los datos se almacenan en /opt/graphite/storage/whisper/servers


Solicitando info sobre una base de datos:
whisper-info.py foo.wsp


Haciendo queries a la base de datos
whisper-fetch.py foo.wsp | tail


Reparando datos (modificando la base de datos)
whisper-update.py foo.wsp 1376066700:3.43
timestamp:valor


## Capacity planning ##
[pepe] -> 1.1MB por fichero
pattern = ^pepe
retentions = 1m:7d,10m:1y,1h:3y

[juan] -> 2.1MB por fichero
pattern = ^juan
retentions = 30s:7d,5m:1y,30m:3y

[icinga] -> 496K por fichero
pattern = ^icinga\.
retentions = 1m:7d,10m:150d,1h:1y,1d:4y
