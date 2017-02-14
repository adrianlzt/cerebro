Las subscripciones son comandos que se lanzan en influx para decirle que todos los datos que llegen a una bd o bd.tabla se envien a un puerto UDP.

Se usan para enviar los datos a kapacitor


# Crear subscripcion
https://docs.influxdata.com/influxdb/v1.2/query_language/spec/#create-subscription
CREATE SUBSCRIPTION "sub0" ON "mydb"."autogen" DESTINATIONS ALL 'udp://example.com:9090'


# Mostrar las activas
SHOW SUBSCRIPTIONS


# Borrar subscripcion
DROP SUBSCRIPTION "sub0" ON "mydb"."autogen"

DROP SUBSCRIPTION subscription_name ON db_name.retention_policy

