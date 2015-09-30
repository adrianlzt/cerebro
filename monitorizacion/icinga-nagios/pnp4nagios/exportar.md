http://docs.pnp4nagios.org/pnp-0.6/xport

curl "http://192.168.36.15/pnp4nagios/xport/json?host=NOMBREHOST&srv=NOMBRESERVICE" | python -m json.tool


Para exportar los datos se hace con:
rrdtool xport
http://linux.die.net/man/1/rrdxport


curl "http://icinga.inet/pnp4nagios/xport/json?host=NOMBREHOST&srv=NOMBRESERVICE&view=3&source=1&end=1442477575&start=1439712775" | python -m json.tool | jq '.data.row[].v[25], .meta.legend.entry[25]'
