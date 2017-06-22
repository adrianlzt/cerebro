https://github.com/openshift/origin-aggregated-logging

Fluentd coge los logs de los pods, les añade cierta metadata y lo almacena en ElasticSearch.
Kibana muestra los datos almacenados en ElasticSearch (dentro del pod de kibaba hay otro container para gestionar el login).
Curator:permite al administrador borrar índices antiguos según proyecto.


# Troubleshooting
https://github.com/openshift/origin-aggregated-logging/blob/master/docs/checking-efk-health.md
