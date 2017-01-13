Se pueden generar snapshots dinámicos (una página html + js)
También se pueden generar imágenes estáticas:
Pinchando en la cámara de fotos debajo de link de Shared

Si vemos mal los caracteres, instalar (en centos):
yum install -y urw-fonts


curl http://192.168.22.95/render/dashboard-solo/db/NOMBREDASH?panelId=1&fullscreen&from=1456926686042&to=1456937486043&width=1000&height=300


# Render / PNG
En la pestaña de share de cada grafica, al final del popup hay un boton para generar PNGs

Este link tambien lo podemos usar con la api key.
Si tenemos templates, la variable es parte de la URL.

Ejemplo:
curl -o imagen.png -H "Authorization: Bearer XXXXXXXXXXXXXXXXXXXXXXXX" "http://influxdb.inet/render/dashboard-solo/db/detailed-status?panelId=9&from=1463115647752&to=1463126447752&var-Host=All&width=1000&height=500"


Mirar dashboard.md para generar un pdf de todo el dashboard


Parece que ya se puede renderizar como png un dashboard:
https://github.com/grafana/grafana/pull/6644/files


# Snapshot de un dashboard
Podemos guardarlo localmente o en raintank.
Son snapshots con funcionalidad, podemos hacer zoom, etc

Al darle, el navegador obtiene la información de todas las gráficas y hace un POST contra grafana para almacenar todos los datos.
Si tenemos muchas gráficas este POST puede ser enorme y colapsar al navegador.

Puede que falle también porque salte el límite de tamaño para mysql (que parece que es donde se almacena toda esta info):
2017/01/12 15:20:39 [dashboard_snapshot.go:47 CreateDashboardSnapshot()] [E] Failed to create snaphost: Error 1105: Parameter of prepared statement which is set through mysql_send_long_data() is longer than 'max_long_data_size' bytes

El parámetro en cuestión: https://dev.mysql.com/doc/refman/5.5/en/server-system-variables.html
Default: 1MB
Max: 4GB
Implicaciones de subir el valor?

En una prueba con un dashboard con 9 gráficas y 20 singlestat, el post pesaba 16MB


Si queremos automatizarlo (sin navegador), aquí unas pequeñas instrucciones: https://github.com/grafana/grafana/issues/3713

# Grafana-snapshot docker
https://github.com/parvez/snapshot
Un docker que genera snapshots
En request_headers meter la cabecera con la api key:
"request_headers": { "Accept": "application/json", "Authorization": "Bearer eyIoFiJnOV3ZhwOWYoycloiLCJuIjoiZ3JhZmFuYS1zbmw2hdHMLCJpZCI6MTB9" },

basic_auth_users, autenticación para acceder a la interfaz web de este docker

Tras configurarlo:
docker build -t parvez/snapshot .


http://localhost:49160

Las horas que usa son UTC

Lo que ejecutar para renderizar:
/deploy/bin/linux/phantomjs /deploy/helper_generate.js /deploy/data/ db/informe-estado-network-acceso-internet-y-mds-test png 30


## Usar sin docker
cd app
npm install
vi config/server.json # para definir url de influx y auth
bin/linux/phantomjs helper_generate.js data db/informe-estado-network-acceso-internet-y-mds-test png 30

helper_generate.js [Path] [Dashboard] [outputType] [waitTime in Seconds] [paperFormat] [orientation] [zoom]
    paperFormat: Letter, Legal, A3, A4, A5, Tabloid
    orientation: portrait, landscape
    outputType: pdf, png, jpg

A3: {"height":2500,"width":1635}

