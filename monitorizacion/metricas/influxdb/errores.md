Trazas de error relacionadas con UDP en influx:
[subscriber] 2017/01/24 18:03:14 write udp 127.0.0.1:60030->127.0.0.1:55587: write: connection refused

Con tcpdump vemos el contenido:
18:01:03.930238 IP 127.0.0.1.59656 > 127.0.0.1.55587: UDP, length 159
E...).@.@..............#....database,clusterID=5005520359303100107,database=_internal,hostname=influxdb-maqueta.localdomain,nodeID=0 numMeasurements=10i,numSeries=782i 1485277263000000000...............

Parece que era porque kapacitor se había subscrito a las métricas pero luego se había muerto sin relalizar la desconexión correctamente e influx seguía envíandole métricas

Mirar subscriptions.md

