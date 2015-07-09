Got error to send bulk of actions to elasticsearch server at 172.16.1.36 : blocked by: [SERVICE_UNAVAILABLE/1/state not recovered / initialized];[SERVICE_UNAVAILABLE/2/no master]; {:level=>:error}

https://logstash.jira.com/browse/LOGSTASH-927
Problemas con multicast, usar unicast


Si estamos con docker puede ser porque ES no llega al 9300 de logstash:
If using the default protocol setting ("node"), your firewalls might need to permit port 9300 in both directions (from Logstash to Elasticsearch, and Elasticsearch to Logstash)

En el log de ES veremos:
[2015-06-10 10:14:31,466][WARN ][transport.netty          ] [Gaea] exception caught on transport layer [[id: 0x6902f602]], closing connection
java.net.NoRouteToHostException: No route to host

Si analizamos con tcpdump en ES veremos que envia paquetes SYN a una ip que no llega.


Podemos configurar un protocol distinto para evitar este problema:
https://www.elastic.co/guide/en/logstash/current/plugins-outputs-elasticsearch.html#plugins-outputs-elasticsearch-protocol

output {
  elasticsearch {
    ...
    protocol => transport
  }
}




Scripts of type [inline], operation [aggs] and lang [groovy] are disabled
Activar este tipo de scripting en la configuración de los ES
https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html#modules-scripting
script.engine.groovy.inline.aggs: on
