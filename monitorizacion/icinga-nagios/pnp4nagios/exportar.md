http://docs.pnp4nagios.org/pnp-0.6/xport

curl "http://192.168.36.15/pnp4nagios/xport/json?host=NOMBREHOST&srv=NOMBRESERVICE" | python -m json.tool


Para exportar los datos se hace con:
rrdtool xport
http://linux.die.net/man/1/rrdxport


curl "http://icinga.inet/pnp4nagios/xport/json?host=NOMBREHOST&srv=NOMBRESERVICE&view=3&source=1&end=1442477575&start=1439712775" | jq '.data.row[].v[25], .meta.legend.entry[25]'


Sacar los nombres de las gráficas que nos pueden interesar:
curl "http://icingadsmc.service.dsn.inet/pnp4nagios/xport/json?host=NOMBREHOST&srv=check_disk&start=$(date -d '-1 hour' +%s)&end=$(date +%s)" | jq '.meta.legend'

Índice donde está una determinada particion (para check_disk):
curl "http://icingadsmc.service.dsn.inet/pnp4nagios/xport/json?host=NOMBREHOST&srv=check_disk&start=$(date -d '-1 hour' +%s)&end=$(date +%s)" | jq '.meta.legend.entry | indices("_var_AVERAGE")'




Nos da enlaces a los distintos data sources 
http://10.0.83.2/pnp4nagios/json?host=master-2&srv=disk


# Modificacion para tener los thresholds
https://github.com/lingej/pnp4nagios/pull/113/files
