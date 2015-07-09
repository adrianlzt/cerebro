While not a direct part of the logstash project, Kibana works on top of logstash to give you visualization and monitoring tools. Kibana also gives you the flexibility to define patterns and filters and then watch the stream for these matches as they happen in realtime.

Es parte de ElasticSearch


Al seleccionar las distintas variables extraídas de los logs en el menu "Fields" de "ALL EVENTS", si seleccionamos "Terms" en la parte inferior podemos generar gráficas "on-the-fly" sobre esos valores.


Gráficos de tarta:
Panel type: terms
Parameters.Filed: os
View options.Style: pie



https://www.elastic.co/guide/en/kibana/current/production.html#load-balancing
En producción la idea es tener un cliente ES local que balacee las peticiones de kibana contra todos los servers del cluster.
Para tener un ES como cliente:
elasticsearch.yml
node.master: false
node.data: false

kibana.yml
elasticsearch_url: "http://localhost:9200"



# JSON input
The JSON input you provide is merged with the aggregation parameters from Kibana. (http://www.quora.com/How-do-I-use-JSON-Input-field-under-Advanced-in-X-Axis-Aggregation-in-Kibana-4)
