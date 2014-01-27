http://graphite.readthedocs.org/en/latest/whisper.html

Whisper is a fixed-size database, similar in design and purpose to RRD (round-robin-database). It provides fast, reliable storage of numeric data over time. Whisper allows for higher resolution (seconds per point) of recent data to degrade into lower resolutions for long-term retention of historical data.

Los datos se almacenan en /opt/graphite/storage/whisper/servers


Solicitando info sobre una base de datos:
whisper-info.py foo.wsp


Haciendo queries a la base de datos
whisper-fetch.py foo.wsp | tail


Reparando datos (modificando la base de datos)
whisper-update.py foo.wsp 1376066700:3.43
timestamp:valor


