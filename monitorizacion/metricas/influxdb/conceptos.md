https://docs.influxdata.com/influxdb/v0.10/concepts/glossary/#series

# Serie
coleccion de puntos que comparten una medida, unas tags y una retention policy
Ejemplo: el cpu_sys de un host determinado.
Cada serie tendrá un montón de puntos


# Shards
split data across what we call shards, which are contiguous blocks of time. Shards would typically hold either a day or 7 days worth of data
