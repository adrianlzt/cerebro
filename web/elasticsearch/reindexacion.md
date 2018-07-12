https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html
elasticdump.md
snapshots.md
http://david.pilato.fr/blog/2015/05/20/reindex-elasticsearch-with-logstash/

Tras reindexar podemos usar "aliases" para apuntar al nuevo indice el antiguo nombre.


# Reindex
https://www.elastic.co/guide/en/elasticsearch/reference/6.3/docs-reindex.html
Reindexar un índice en otro índice.
Generalmente esto nos será útil porque hayamos modificado el mapping del índice destino para adaptarse mejor a las necesidades.

POST _reindex
{
  "source": {"index": "blogs"},
  "dest":   {"index": "blogs_analyzed"}
}

Se pueden especificar queries para solo reindexar ciertos datos.
O pasar un scripts para modificar los datos antes del reindexado.

No podemos reindexar al mismo indice.


POST _reindex
{
  "source": {
    "index": "twitter",
    "type": "_doc",
    "query": {
      "term": {
        "user": "kimchy"
      }
    }
  },
  "dest": {
    "index": "new_twitter"
  },
  "script": {
    "source": "if (ctx._source.foo == 'bar') {ctx._version++; ctx._source.remove('foo')}",
    "lang": "painless"
  }
}


Podemos configurar el tamaño de los batch de reindex, por si hubiese fields muy grandes que llenasen el heap.
También es configurable los timeouts.


Podemos obtener el estado de una tarea de reindex:
GET _tasks?detailed=true&actions=*reindex

Slicing para paralelizar el reindex
https://www.elastic.co/guide/en/elasticsearch/reference/6.3/docs-reindex.html#docs-reindex-sliceo

Truco para reindexar indices con fecha, ejemplo: metricbeat-2016.05.06
https://www.elastic.co/guide/en/elasticsearch/reference/6.3/docs-reindex.html#_reindex_daily_indices



También podemos leer de un índice remoto
https://www.elastic.co/guide/en/elasticsearch/reference/6.3/docs-reindex.html#reindex-from-remote
POST _reindex
{
  "source": {
    "remote": {
      "host": "http://otherhost:9200",
      "username": "user",
      "password": "pass"
    },
    "index": "source",
    "query": {
      "match": {
        "test": "data"
      }
    }
  },
  "dest": {
    "index": "dest"
  }
}

Hace falta que el nodo remoto esté configurado para aceptar esta conexión:
reindex.remote.whitelist: "otherhost:9200, another:9200, 127.0.10.*:9200, localhost:*"
Idea: conectar un nodo coordinate-only al cluster remoto solo para este caso y quitarlo luego. Así evitamos tener que reiniciar nodos del cluster para cambiar la configuración.

Si tenemos muchos datos que mover entre distintos ES, tal vez sea mejor hacer un snapshot y restore en el otro server.




# Remote
Reindexar leyendo de un ES remoto
https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html
El ES remoto deberá estar en la config de elasticsearch.yml
You should set up the destination index prior to running a _reindex action, including setting up mappings, shard counts, replicas, etc


# Logstash

## Copiando a un nuevo índice

input {
  elasticsearch {
    hosts => [ "localhost" ]
    index => "mydata-2018.09.*"
    docinfo => true
  }
}

Si queremos solo pillar ciertos valores. Ej.:
query => '{ "query": { "match": { "offset": "16244242" } } }'

Lo de docinfo nos da también la información de @metadata
Para acceder a estos datos, ejemplo:
add_field => {"token" => "%{[@metadata][_index]}" }



No consigo reindexar los datos si necesito pasarlo por el filter de nuevo.
Si lo hago pasando el mismo filtro de siempre, me duplica los campos:
{"message":"2015-06-10T01:50:07.490+0200 | INFO | pd-core | load | [875676716988873216_p0] loaded ios (/mnt/drive/ZQQwwKOsD1R9GXGSqw8Ir3WI.zip) of user '336948cddd8cd5a2fe24fa736c3492a18cbb6dc9' in 6.098s","@version":"1","@timestamp":"2015-06-09T23:50:07.490Z","file":"./logs/STlog.log","host":"archer","offset":"13638288","type":"tel_log","token":"tel","lvl":["INFO","INFO"],"componente":["pd-core","pd-core"],"operacion":["load","load"],"msg":["[875676716988873216_p0] loaded ios (/mnt/drive/ZQQwwKOsD1R9GXGSqw8Ir3WI.zip) of user '336948cddd8cd5a2fe24fa736c3492a18cbb6dc9' in 6.098s","[875676716988873216_p0] loaded ios (/mnt/drive/ZQQwwKOsD1R9GXGSqw8Ir3WI.zip) of user '336948cddd8cd5a2fe24fa736c3492a18cbb6dc9' in 6.098s"]}

Entonces lo que quiero es solo obtener el campo mensaje, para no tener los otros campos y que no aparezcan duplicados:
query => '{ "_source" : ["@version", "@timestamp", "host", "type", "token", "message"], "query": { "match": { "offset": "13638288" } } }'

input {
  elasticsearch {
    hosts => [ "172.16.1.43"]
    index => "logstash-iris-telematics-2015.06.09"
    query => '{ "_source" : ["@version", "@timestamp", "host", "type", "token", "message"], "query": { "match": { "offset": "13638288" } } }'
    docinfo => true
  }
}


# Output
Pisando el doc anterior:
output {
  elasticsearch {
    host => [ "172.16.1.43"]
    cluster => "elasticsearch"
    index => "logstash-iris-%{token}-%{+YYYY.MM.dd}"
    codec => json
    protocol => transport
    document_id => "%{[@metadata][_id]}"
  }
}



time docker run --rm -it -v /home/centos/reindex:/config-dir --name reindexador logstash logstash -f /config-dir/conf/

Reindexación de un índice con 1 documentos que ocupa 5253 bytes con docker en una instancia de openstack 1cpu,1gb

Es siempre la misma linea repetida X veces

num_docs,bytes,tiempo
1,7261,32.947
2,14690,30.900
5,35644,31.799
10,37131,30.419
25,40898,31.491
100,59822,32.338
1000,218328,30.905
2000,355179,32.786
5000,600480,33.694

Con logs reales, reindexando para cambiar el nombre de un campo de lvl a level (parseando de nuevo el mensaje entero):
Voy atacando distintos indices.
El container de docker se destruye al terminar, por lo que parece que lo que "calienta" es ES, que está contestando mejor tras la primera vez.
num_docs,bytes,tiempo(s)
1000,559818,152
2000,1048280,48
5000,2705218,54
10000,5521559,no termina nunca
20000,9865363,
50000,14470511,


No termina nunca saca errores:
Jun 19, 2015 9:49:24 AM org.elasticsearch.transport.TransportService$Adapter checkForTimeout
WARNING: [logstash-12562a9b5f84-1-7974] Received response for a request that has timed out, sent [7392ms] ago, timed out [1468ms] ago, action [cluster:monitor/nodes/info], node [[#transport#-1][12562a9b5f84][inet[/172.16.1.43:9300]]], id [895]
Jun 19, 2015 9:49:51 AM org.elasticsearch.client.transport.TransportClientNodesService$SimpleNodeSampler doSample
INFO: [logstash-12562a9b5f84-1-7974] failed to get node info for [#transport#-1][12562a9b5f84][inet[/172.16.1.43:9300]], disconnecting...
org.elasticsearch.transport.ReceiveTimeoutTransportException: [][inet[/172.16.1.43:9300]][cluster:monitor/nodes/info] request_id [895] timed out after [5924ms]
        at org.elasticsearch.transport.TransportService$TimeoutHandler.run(TransportService.java:529)
        at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1145)
        at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)
        at java.lang.Thread.run(Thread.java:745)




Reindexación de un índice con 3183 documentos que ocupa 2029902 bytes (~2MB) con docker en una instancia de openstack 1cpu,1gb
El docker no se sale tras terminar la indexación

Tenemos: 3183 documentos
id=0 offset: 2495136
id=1 offset: 441162


