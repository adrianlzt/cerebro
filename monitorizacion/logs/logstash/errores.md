Problemas al configurar como output elasticsearch:
log4j, [2014-03-02T19:47:54.181] DEBUG: org.elasticsearch.discovery.zen: [Atalanta] filtered ping responses: (filter_client[true], filter_data[false]) {none}

El cliente de logstash es el adecuado para el ES?
https://logstash.jira.com/browse/LOGSTASH-693



Parseando fecha, cuidado con los locale:
Failed parsing date from field {:field=>"timestamp", :value=>"11/Jun/2015:23:15:34 +0200", :exception=>java.lang.IllegalArgumentException: Invalid format: "11/Jun/2015:23:15:34 +0200" is malformed at "Jun/2015:23:15:34 +0200", :level=>:warn}
date {
  locale => "en"

Con locale=>"es" seria "jun", en inglés "Jun"

