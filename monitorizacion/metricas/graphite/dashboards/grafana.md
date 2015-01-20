http://grafana.org/

A beautiful, easy to use and feature rich Graphite dashboard replacement and graph editor.

# Docker: grafana para influxdb
https://registry.hub.docker.com/u/tutum/grafana/

## Instalacion ##
Descargar la última versión de https://github.com/torkelo/grafana/releases
Descomprimir en /var/www/html/grafana
Editar /var/www/html/grafana/config.js para definir la url del server graphite, y la url del server elasticsearch (si lo tenemos).
Entrar en http://localhost/grafana

## Configuración ##
Para poder almacenar los dashboards necesitaremos elasticsearch.
Si no, podemos generarlos a mano, en formato json, y ponerlos en /var/www/html/grafana/app/dashboards

## Generar dashboards ##
Para editar un dashboard, pinchamos sobre su nombre y damos a editar.
Para volver al dashboard, pulsamos escape.

En la izquierda vemos unas pestañas de color azul y naranja, eso es para editar las filas.

Un dashboard de ejemplo esta en dashboard-ejemplo.json
