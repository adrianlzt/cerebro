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
