Store data in tags if they’re commonly-queried meta data
Store data in tags if you plan to use them with GROUP BY()
Store data in fields if you plan to use them with an InfluxQL function
Store data in fields if you need them to be something other than a string - tag values are always interpreted as strings


Los valores que pueden estar almacenados en una serie
Si queremos ver los que tenemos:
SHOW FIELD KEYS [ON database]

SHOW FIELD KEYS FROM "uptime"

SHOW FIELD KEYS ON db0 FROM mydb.myrp2./c.*/


int, float, string y booleans

No estan indexadas


A partir de la version 1.0 se puede ver que tipo de dato es
https://github.com/influxdata/influxdb/pull/6592



# Conversion tag -> value
Si cuando hacemos el primer insert definimos una palabra como que es un tag y luego en otra medida la cambiamos a value.
Tras el segundo insert, los que habían usado la palabra como tag verán su valor borrado.
Posteriores usos del nombre como tag tampoco verán el valor almacenado.

Si primero era value y luego tag, pasará igual, los valores almacenados como tag se verán borrados.
