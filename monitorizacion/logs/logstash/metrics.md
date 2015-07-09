https://www.elastic.co/guide/en/logstash/current/plugins-filters-metrics.html
https://github.com/logstash-plugins/logstash-filter-metrics/blob/master/lib/logstash/filters/metrics.rb

No da mucha flexibilidad.
Los rates son fijos, solo puedes usar el de 1m, 5m y 15m.
Son eventos que van entrada, no se tienen en cuenta el date del evento, por lo que no serviría para reparsear eventos.

filter {
  metrics {
    meter => "events"
    add_tag => "metric"
  }
}

Cada 5" (valor por defecto) nos devuelve:
{"@version":"1","@timestamp":"2015-06-26T08:33:19.407Z","message":"archer","events.count":3,"events.rate_1m":0.0,"events.rate_5m":0.0,"events.rate_15m":0.0,"tags":["metric"]}
