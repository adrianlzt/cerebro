https://www.elastic.co/guide/en/logstash/current/plugins-filters-date.html

Parsear un campo para convertirlo en el @timestamp

Ejemplo para formato: 20190611 213344.633

date {
  match => [ "timestamp", "YYYYMMss HHmmss.SSS" ]
}
