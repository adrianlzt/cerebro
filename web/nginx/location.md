http://www.nginxtips.com/nginx-location-directive/

Regexp para matchear la url de la petición.


location ~ /projects/.*/alarms
  matchea cualquier /project/LOQUESEA/alarms



Matchea y coge el group para pasarselo al proxy pass:
location ~ ^/grafana/(.*) {
  proxy_pass http://$upstream/$1;
