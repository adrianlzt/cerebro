https://www.elastic.co/guide/en/elasticsearch/plugins/6.3/index.html

# Install
bin/elasticsearch-plugin install analysis-icu
  si tenemos conex a internet
bin/elasticsearch-plugin install file:///home/elastic/x-pack.zip

# List
bin/elasticsearch-plugin install analysis-icu

# Delete
bin/elasticsearch-plugin remove analysis-icu


Tras instalar/borrar un plugin tenemos que reniniciar el nodo.
Debemos pensar donde queremos poner los plugins.
Por ejemplo, tal vez queremos solo poner un plugin analyzer y solo los necesitaremos en los data nodes. O incluso podríamos filtrar para que solo el índice donde queremos ese analyzer vaya a ciertos nodos e instalar el plugin únicamente en esos nodos.

En el directorio de elasticsearch: ../plugins/
O, si hemos instalado el .deb: /usr/share/elasticsearch/bin/plugin


X-pack, mirar x-pack.md. De pago

Discovery plugins (EC2, Azure, GCE, Kubernetes), para autoconfigurar los hosts para saber que nodos son los que pertencen al cluster.
  Tambien basado en fichero

Analyzers

Snapshot/Restore
https://www.elastic.co/guide/en/elasticsearch/plugins/6.3/repository.html
Para subir snapshots a S3, Azure, HDFS, GCE, Swift

Más categorias


Algunos:
bin/plugin -install karmi/elasticsearch-paramedic
  Esto se bajará el plugin de github de la rama master
  http://localhost:9200/_plugin/paramedic/
  Nos da estadísticas sobre elasticsearch, consumo de cpu, memoria, uso http, indexing, etc.

bin/plugin -install royrusso/elasticsearch-HQ
  http://localhost:9200/_plugin/HQ/
  Más estadísticas sobre el propio funcionamiento de elasticsearch
  También podemos hacer queries sobre los datos, ver los índices, type mappings y REST console.

bin/plugin -install mobz/elasticsearch-head
  http://localhost:9200/_plugin/head/
  Nos da información sobre el estado de salud del cluster. También nos da un pequeño interfaz para realizar queries. Podemos consultar el estado de los nodos, realizar acciones sobre ellos, etc.
