# Dividir dos campos
https://community.grafana.com/t/grafana-elasticsearch-datasource-and-option-script/2714/3

_value / doc["system.cpu.cores"].value


# Variables
Para crear una variable tipo "query" que nos devuelva los distintos valores para "tag.host"
{"find":"terms", "field": "tag.host"}


# Derivada
Si queremos obtener la derivada de una métrica, primero tendremos que seleccionar la métrica con una agregación tipo min/max/avg y luego crear otra métrica con Derivative
