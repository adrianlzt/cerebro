https://getkotori.org/

App en python que nos enruta desde mqtt (o WS o http) a influxdb y crea automáticamente dashboards en Grafana.

# Podman
Con podman me da problemas la red, de vez en cuando me quedo sin conexión hacia los containers, aunque entre sí parece funcionar.

podman pod create --name kotori-all \
    --publish=24642:24642 \
    --publish=3000:3000 \
    -p 1883:1883 \
    -p 9001:9001 \
    -p 36000:36000 \
    --publish 8083:8083 \
    --publish 8086:8086
# 24642 kotori
# 3000 grafana
# 1883 mosquitto
# 9001 mosquitto
# 36000 kotori admin
# 8083 influxdb, el que?
# 8086 influxdb

podman run \
    --pod kotori-all \
    --name=mosquitto \
    --detach=true \
    eclipse-mosquitto:1.6.8

podman run \
    --pod kotori-all \
    --name=influxdb \
    --detach=true \
    --volume="$(pwd)/var/lib/influxdb":/var/lib/influxdb \
    influxdb:1.7.10

podman run \
    --pod kotori-all \
    --name=grafana \
    --detach=true \
    --env='GF_SECURITY_ADMIN_PASSWORD=admin' \
    grafana/grafana:6.6.2
    #--volume="$(pwd)/var/lib/grafana":/var/lib/grafana \
    # Hace falta arreglar un tema de permisos, porque granfana no corre como root

podman exec -i grafana grafana-cli \
    --pluginUrl https://packages.hiveeyes.org/grafana/grafana-map-panel/grafana-map-panel-0.9.0.zip \
    plugins install grafana-map-panel

podman run \
    --pod kotori-all \
    --volume="$(pwd)/etc":/etc/kotori \
    --name kotori \
    -d daqzilla/kotori \
    kotori --config /etc/kotori/docker-mqttkit.ini


## docker
docker run \
    --name=mosquitto \
    --detach=true \
    -p 1883:1883 -p 9001:9001 \
    eclipse-mosquitto:1.6.8

docker run \
    --name=influxdb \
    --detach=true \
    --publish 8083:8083 --publish 8086:8086 \
    --volume="$(pwd)/var/lib/influxdb":/var/lib/influxdb \
    influxdb:1.7.10

docker run \
    --name=grafana \
    --detach=true \
    --publish=3000:3000 \
    --link influxdb:influxdb \
    --volume="$(pwd)/var/lib/grafana":/var/lib/grafana \
    --env='GF_SECURITY_ADMIN_PASSWORD=admin' \
    grafana/grafana:6.6.2

echo "entrar en grafana y cambiar la password a grafana"

docker exec -i grafana grafana-cli \
    --pluginUrl https://packages.hiveeyes.org/grafana/grafana-map-panel/grafana-map-panel-0.9.0.zip \
    plugins install grafana-map-panel

docker restart grafana

docker run \
    --volume="$(pwd)/etc":/etc/kotori \
    --publish=24642:24642 \
    --link mosquitto:mosquitto \
    --link influxdb:influxdb \
    --link grafana:grafana \
    -it --rm daqzilla/kotori \
    kotori --config /etc/kotori/docker-mqttkit.ini


## Python
Con python 2.7
pip install kotori


## Config
[main]
include     = /etc/kotori/conf.d/*.ini, /etc/kotori/conf.d/*/*.ini,
              /etc/kotori/apps-enabled/*.ini, /etc/kotori/apps-enabled/*/*.ini

; http server
[kotori]
http_listen = 0.0.0.0
http_port   = 24642

; mqtt bus adapter
[mqtt]
host        = localhost
;port        = 1883
username    = kotori
password    = kotori

; wamp bus adapter
[wamp]
uri         = ws://0.0.0.0:9000/ws

; storage adapters
[influxdb]
host        = localhost
;port        = 8086
username    =
password    =
; soporta udp, pero solo con resolución de "s"
; si vemos el error "WARNING: Connection pool is full, discarding connection: influxdb" es porque tiene el pool de conex saturado
; Se puede incrementar al crear el cliente Influx
; https://influxdb-python.readthedocs.io/en/latest/api-documentation.html#influxdbclient
; pool_size (int) – urllib3 connection pool size, defaults to 10.
; Modificando https://github.com/daq-tools/kotori/blob/cefac57cbefcd8c6bd80f1b48c248acb6cbed583/kotori/daq/storage/influx.py#L47


; user interfaces
[grafana]
host        = localhost
;port        = 3000
username    = admin
password    = grafana


[mqttkit-1]
enable      = true
type        = application
realm       = entrenamiento
mqtt_topics = entrenamiento/#
application = kotori.daq.application.mqttkit:mqttkit_application

; How often to log metrics
metrics_logger_interval = 1


## Publicar métricas
topic: entrenamiento/bascula/nodemcu/1/data.json
data: {"foo": 1.2, "bar": 3.33}
