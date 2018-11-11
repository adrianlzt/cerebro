Aplicados en el orden que aparecen.

Dissect: extraer data (mejora sobre grok)
Grok: extraer data a partir de patterns
Date: convertir todo tipo de timestamps en un formato unico
csv: parse CSV data (or any patter-separated data)
geoip: determinar geolocalización basado en IP (MaxMind)
ruby: run arbitrary code in the pipeline

# mutate
https://www.elastic.co/guide/en/logstash/current/plugins-filters-mutate.html
rename, remove, replace and modify data

# throttle
Allows you to tag or add fields to events that occur with a given frequency. One use case is to have logstash email you only once if an event occurs at least 3 times in 60 seconds.


# elapsed
https://www.elastic.co/guide/en/logstash/current/plugins-filters-elapsed.html
Para medir tiempos entre dos eventos

# kv
https://www.elastic.co/guide/en/logstash/current/plugins-filters-kv.html
Si el mensaje es tipo: pepe=cosa otro=valor nos lo parsea ya.
Por defecto el split entre campos es " ".
Se puede cambiar: field_split => "&?"

filter_kv.md


# metrics
https://www.elastic.co/guide/en/logstash/current/plugins-filters-metrics.html
metrics.md



# drop
https://www.elastic.co/guide/en/logstash/6.4/plugins-filters-drop.html

Descartar una métrica si cumple una condición:
if [nginx][access][agent] == "Zabbix" {
  drop {}
}

