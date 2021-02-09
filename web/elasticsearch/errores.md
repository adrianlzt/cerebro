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
http://jpmens.net/2012/08/06/my-logstash-and-graylog2-notes/
Comentario Sergio Bossa y otros:
slow for real-time log monitoring


Unassigned shards
Si el cluster health esta en red puede ser porque tenga unassigned_shards.
Esto quiere decir que hay shards que no están ubicados en ningún cluster.
Tendremos que a mano reasignarlos a los nodos.


Initializing shards
Puede que estén arrancando

Relocating shards
No deberia estar mucho tiempo aqui.


Search guard
Gestiona autentificación y autorización.
Si está fallando puede que tengamos que rearrancar el search guard.
https://github.com/floragunncom/search-guard-docs/blob/master/sgadmin.md
https://floragunn.com/search-guard-index-replica-shards/




Si no podemos reasignar un shard puede ser porque el disco este demasiado lleno.




Can't get text on a START_OBJECT
https://stackoverflow.com/questions/41873672/updating-a-field-with-a-nested-array-in-elastic-search
Hemos declarado una estructura de datos pero estamos intentando enviar un objeto en un sitio declarado como una string (u otro tipo simple)




Failed to load http://192.168.1.86:9200/_search: Request header field Authorization is not allowed by Access-Control-Allow-Headers in preflight response.
https://github.com/elastic/elasticsearch/issues/9063
http.cors.allow-headers: "X-Requested-With, Content-Type, Content-Length, Authorization"

http.cors.enabled: true
http.cors.allow-headers: "*"
http.cors.allow-origin: "*"
  estas tres opciones me funcionan, pero tal vez sean demasido permisivas?




mirar en mapping.md ignore malformed
mapper [ansible_facts.ansible_python.version_info] of different type, current_type [text], merged_type [long]
Estamos intentando indear un array que contiene números y strings (1,2,"last",0). Primero se detecta un número y luego cuando va a entrar el string protesta.
Debemos especificar primero el mapping.

Otra opción es una configuración que ignora todo lo que no entre correctamente en el mapping. Esto un poco peligroso porque podemos no estar indexando cosas y no darnos cuenta.
https://www.elastic.co/guide/en/elasticsearch/reference/current/ignore-malformed.html
Para object vs otro tipo
https://discuss.elastic.co/t/force-an-object-type-into-a-text-field/118609/4



java.lang.OutOfMemoryError: Java heap space
Se ha quedado sin heap.
Aumentar memoria?
Por qué se ha quedado sin heap? Agregación muy grande? muchos shards? Otra razón?




 Limit of total fields [1000] in index [skydive_topology_live_v13] has been exceeded
 Hemos llegado al límite de campos permitidos por el índice.
 Podemos aumentar, pero tal vez querremos primero ver porque hemos llegado a ese límite.
 mirar fields.md
