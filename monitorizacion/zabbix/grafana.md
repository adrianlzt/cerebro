https://github.com/alexanderzobnin/grafana-zabbix
http://docs.grafana-zabbix.org/
https://grafana.com/plugins/alexanderzobnin-zabbix-app
it is using zabbix API and therefore speed is not very good, but you can display for example zabbix dashboard together it any other grafana items (graphs, tables etc).

Instalar como una app.
Luego entrar en la app en grafana y activarla para poder configurar el data source.
La url del data source deberá ser tipo: http://zabbix-web/api_jsonrpc.php

# docker
docker run -d --name zabbix-grafana --link zabbix-web-nginx-pgsql:zabbix-web --link zabbix-postgres:zabbix-db -p 3000:3000 grafana/grafana:latest
  user: admin, pass: admin
docker exec -it zabbix-grafana grafana-cli plugins install alexanderzobnin-zabbix-app
docker restart zabbix-grafana
http://localhost:3000/plugins/alexanderzobnin-zabbix-app/edit

Configurar el datasource para la base de datos (postgre o mysql)
  Host: zabbix-db:5432
  Database: zabbix
  User: postgres
  Pass: postgres
  SSL Mode: disabled

Configurar data source zabbix:
  URL: http://zabbix-web/api_jsonrpc.php
  Username: Admin
  Password: zabbix
  Direct DB Connection: enable
  Alerting: enable, add thresholds


# Triggers
Las gráficas ponen automáticamente el threshold si tenemos asociado un trigger al item.


# Mapas
https://community.grafana.com/t/zabbix-map-on-grafana/993
Poner un mapa de zabbix en grafana.
Usar un campo de texto en formato HTML:
<img src="http://172.28.128.3/map.php?noedit=1&sysmapid=3568&width=&height=&curtime=1495181459&severity_min=0">
