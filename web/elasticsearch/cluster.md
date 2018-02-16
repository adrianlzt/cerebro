https://www.elastic.co/guide/en/elasticsearch/guide/current/_revisit_this_list_before_production.html
https://thoughts.t37.net/designing-the-perfect-elasticsearch-cluster-the-almost-definitive-guide-e614eabc1a87


https://www.elastic.co/guide/en/elasticsearch/guide/current/_add_failover.html

Fácilmente escalable. Simplemente añadir nodos al cluster.

# Estado del cluster
curl -s localhost:9200/_cluster/health | python -m json.tool
status puede ser green, yellow o red.
green -> todo bien
yellow -> funciona pero hay problemas (por ejemplo, no hay sharding)
red -> no funciona (no contesta a las queries)

# Settings actuales
curl -s localhost:9200/_cluster/settings | python -m json.tool


# Nodos
curl "https://localhost:9200/_cat/nodes?v"
El que tiene el asterisco sera el master del cluster



# Arrancar un cluster
Por defecto cuando iniciamos ES arranca un cluster con nombre "elasticsearch".
Para meter más nodos lo primero que haremos es modificar el nombre del cluster (por ejemplo):
/etc/elasticsearch/elasticsearch.yml
cluster.name: es_something_env

Tambien podemos cambiar el nombre de nuestros nodos:
node.name: nombredelhost

Si queremos que sea/no sea un master/data (por defecto será data y master):
node.master: true/false
node.data: true/false

Si queremos que solo intente unirse en cluster con ciertos nodos (poner los nodos excepto él mismo):
discovery.zen.ping.unicast.hosts: nodoA,nodoB
  a partir de la version 7 podemos especificar un fichero con los nodos que puede ser actualizado por un tercero en cualquier momento
  https://www.elastic.co/guide/en/elasticsearch/plugins/master/discovery-file.html

Si tenemos varias interfaces y queremos solo comunicarnos por una:
network.publish_host: xxx

Permitir CORS (permitir a un tercero lanzar desde su dominio peticiones al ES):
http.cors.enabled: true
http.cors.allow-origin: "*"



Y atributos:
node.attr.ALGO: valor

Tambien puede que queramos cambiar los:
path.data (podemos definir varios, se usarán como raid0)
path.logs
path.plugins

Definir el minimum_master_nodes al valor (numero de masters/2)+1
discovery.zen.minimum_master_nodes:
Este parametro puede ser modificado dinamicamente.

Deberemos tambien abrir el puerto en las interfaces que queramos para que el cluster se pueda comunicar:
https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-network.html
network.host: ["_local_", "_site:ipv4_"]
  esto abre el puerto en todas las interfaces de red para ipv4 y en localhost
  Parece que no funciona muy bien: https://github.com/elastic/elasticsearch/issues/13592
network.host: "0.0.0.0"
  tambien vale


https://www.elastic.co/guide/en/elasticsearch/guide/current/important-configuration-changes.html#_recovery_settings
Opciones de como debe comportarse el cluster ante una caida.
Cuanto tiempo esperar al resto de nodos. Con cuantos nodos consideramos que podemos arrancar el cluster.


Por defecto el cluster se forma con "unicast", es decir, necesitamos especificar cuales son los nodos del cluster.
Se puede configurar un plugin multicast para hacerlo sin especificar los nodos, pero es peligroso (nunca en producción).
Pasaremos la lista de los nodos de esta manera:
discovery.zen.ping.unicast.hosts: ["host1", "host2:port"]
Con que un nuevo nodo llegue a otro nodo del cluster es suficiente, pero podemos poner la lista entera por completitud.
Si tenemos nodos master y nodos data, pondremos en la lista solo los master.


Memoria para ES:
https://www.elastic.co/guide/en/elasticsearch/guide/current/heap-sizing.html#heap-sizing
En CentOS viene con 2GB por defecto.

Swapping mata la performance. Recomiendan quitarla o subir mucho el swappiness.

Debe vigilarse igualmente que no se esté quedando sin filedescriptors.
En centos7 la unit de systemd ya configura para poner el limite a 65536
