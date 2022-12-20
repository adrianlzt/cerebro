Ejemplos de dashboards
https://grafana.com/grafana/dashboards/


Se puede configurar grafana para que lea automáticamente de un directorio donde podemos subir definiciones de dashboards en json:

[dashboards.json]
enabled = true
path = /srv/grafana/dashboards

Los dashboards que pongamos aqui aparecerán en todas las orgs

# Internals
https://github.com/grafana/grafana/blob/56622ee2c6d030efb7b39433b1b1fc6f0e7250a4/pkg/services/search/json_index.go
