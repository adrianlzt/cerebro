SHOW SERIES [ON database] [FROM source]
para ver todas las series que tenemos

SHOW SERIES FROM mydb.myrp1./c.*/


Una medida particular con una serie de tags es una serie.

Por ejemplo, para la measurement cpu y los tags
host=AAA
project=pepe

Todos los puntos de esa medida con esos tags seria una serie

Hay que intentar mantener el número de unique series controlado.

No entiendo muy bien como, pero si tenemos dos tags
user_id y run_id, y cada run_id solo pertenece a un user_id, no se incrementa el número de uniq_series por cada run_id nuevo.


No debemos pasar de 1.000.000 de series: -> en principio se soluciona con el nuevo motor TSI (1.3.0)
Your series cardinality is very high (numSeries 3113798), presumably due to the arbitrary tagging. When series cardinality rises above 1 million the database needs significant amounts of RAM just for the index. As the index consumes more RAM, it reduces the scratch space available for queries.
https://groups.google.com/forum/#!searchin/influxdb/enforce$20uniqueness$20while$20still$20being$20performant/influxdb/JjpVu_9RF8c/lHItTFHoAQAJ

Implementación de un comando: SHOW CARDINALITY
https://github.com/influxdata/influxdb/pull/8636
SHOW SERIES CARDINALITY
SHOW SERIES CARDINALITY FROM "<measurement>"
SHOW SERIES CARDINALITY WHERE "<key>" = '<value>'
SHOW SERIES CARDINALITY FROM "<measurement>" WHERE "<key>" = '<value>'
SHOW MEASUREMENT CARDINALITY
SHOW TAG KEY CARDINALITY
SHOW TAG KEY CARDINALITY FROM "<measurement>"
SHOW FIELD KEY CARDINALITY 
SHOW FIELD KEY CARDINALITY FROM "<measurement>"
SHOW TAG VALUES CARDINALITY WITH KEY = '<tag key>'
SHOW TAG VALUES CARDINALITY FROM "<measurement>" WITH KEY = '<tag key>'



# Muchas series
En _internal (o influxdb_database sacando la info por telegraf), tenemos numSeries tageado por database.

Una vez tenemos la ddbb culpable podemos hacer un "SHOW SERIES" para analizar quien esta comiendo tantas series (cuidado! va a sacar mucho output!)
influx -username admin -password admin -database telegraf -execute "show series" > telegraf_series.influx

Para aproximarnos a encontrar el culpable podemos ver cuantas series hay por measurement:
cat telegraf_series.influx | cut -d ',' -f 1 | uniq -c | sort -n

El problema generalmente será un tag que varía demasiado y genera nuevas series continuamente.
En el caso que me ha tocado mirar, es procstat, que genera una serie por cada nuevo proceso, ya que "pid" es un tag.
Si "pid" fuera un value solo tendríamos una serie por cada nombre de proceso, aquí tenemos una serie por cada vez que se lanza un proceso.


# Ver cardinalidad
https://github.com/influxdata/influxdb/pull/8636
SHOW SERIES CARDINALITY
SHOW SERIES CARDINALITY FROM "<measurement>"
SHOW SERIES CARDINALITY WHERE "<key>" = '<value>'
SHOW SERIES CARDINALITY FROM "<measurement>" WHERE "<key>" = '<value>'
SHOW MEASUREMENT CARDINALITY
SHOW TAG KEY CARDINALITY
SHOW TAG KEY CARDINALITY FROM "<measurement>"
SHOW FIELD KEY CARDINALITY 
SHOW FIELD KEY CARDINALITY FROM "<measurement>"
SHOW TAG VALUES CARDINALITY WITH KEY = '<tag key>'
SHOW TAG VALUES CARDINALITY FROM "<measurement>" WITH KEY = '<tag key>'
