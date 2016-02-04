http://docs.pnp4nagios.org/pnp-0.6/xport

curl "http://192.168.36.15/pnp4nagios/xport/json?host=NOMBREHOST&srv=NOMBRESERVICE" | python -m json.tool


Para exportar los datos se hace con:
rrdtool xport
http://linux.die.net/man/1/rrdxport

Ejemplo:
rrdtool xport -m 2000 --start=1452164318 --end=1453373918 DEF:0MIN=network.rrd:1:MIN  XPORT:0MIN:eth0_in_MIN  DEF:0MAX=network.rrd:1:MAX  XPORT:0MAX:eth0_in_MAX  DEF:0AVERAGE=network.rrd:1:AVERAGE  XPORT:0AVERAGE:eth0_in_AVERAGE

Saca 2000 rows, empezando en la fecha 1452164318, terminando en 1453373918
Genera automaticamente un step de 1800s (parece que el step depende de que hora preguntemos, parece que va subiendo cuanto más viejo es el timestamp)
Nos devuelve tres valores por cada timestamp: valor min, max y media realizada entre los valores dentro del step

# Step
Para puntos proximos nos da una resolucion de 60" (bueno, con la que hayamos definido el fichero)
Para puntos más antiguo empieza a dar un step mayor, 300", 1800", etc

Si queremos sacar todos los puntos con la mayor resolucion tendremos que ir preguntando primero por fechas próximas, luego por más antiguas

Sacando en tramos de 24h, para un fichero generado por pnp4nagios, veo los siguientes steps:
1-2 días -> 60"
3-10 días -> 300" (5')
11-90 días -> 1800" (30')
Luego 21600" (6h)

Para obtener el máximo de resolución pedir:
 start date -> end date (resolution)
 -1 days    -> now      (60")
 -2 days    -> -1 days  (60")
 -8 days    -> -2 days  (300")
 -10 days   -> -8 days  (300")
 -50 days   -> -10 days (1800")




curl "http://icinga.inet/pnp4nagios/xport/json?host=NOMBREHOST&srv=NOMBRESERVICE&view=3&source=1&end=1442477575&start=1439712775" | jq '.data.row[].v[25], .meta.legend.entry[25]'


Sacar los nombres de las gráficas que nos pueden interesar:
curl "http://icingadsmc.service.dsn.inet/pnp4nagios/xport/json?host=NOMBREHOST&srv=check_disk&start=$(date -d '-1 hour' +%s)&end=$(date +%s)" | jq '.meta.legend'

Índice donde está una determinada particion (para check_disk):
curl "http://icingadsmc.service.dsn.inet/pnp4nagios/xport/json?host=NOMBREHOST&srv=check_disk&start=$(date -d '-1 hour' +%s)&end=$(date +%s)" | jq '.meta.legend.entry | indices("_var_AVERAGE")'




Nos da enlaces a los distintos data sources 
http://10.0.83.2/pnp4nagios/json?host=master-2&srv=disk


# Modificacion para tener los thresholds
https://github.com/lingej/pnp4nagios/pull/113/files
