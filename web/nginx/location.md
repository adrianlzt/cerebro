http://www.nginxtips.com/nginx-location-directive/

Regexp para matchear la url de la petición.


location ~ /projects/.*/alarms
  matchea cualquier /project/LOQUESEA/alarms



Matchea y coge el group para pasarselo al proxy pass:
location ~ ^/grafana/(.*) {
  proxy_pass http://$upstream/$1;


# Crear una contestación cuando nos envian un OPTIONS
location / {
    if ($request_method = OPTIONS ) {
        add_header Content-Length 0;
        add_header Content-Type text/plain;
        return 200;
    }
}
