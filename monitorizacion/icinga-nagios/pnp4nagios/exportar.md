http://docs.pnp4nagios.org/pnp-0.6/xport

curl "http://192.168.36.15/pnp4nagios/xport/json?host=NOMBREHOST&srv=NOMBRESERVICE" | python -m json.tool
