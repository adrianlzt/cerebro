https://www.elastic.co/guide/en/elasticsearch/guide/current/_add_failover.html

Fácilmente escalable. Simplemente añadir nodos al cluster.

# Estado del cluster
curl -s localhost:9200/_cluster/health | python -m json.tool

status puede ser green, yellow o red.
green -> todo bien
yellow -> funciona pero hay problemas (por ejemplo, no hay sharding)
red -> no funciona (no contesta a las queries)

# Arrancar un cluster
Por defecto cuando iniciamos ES arranca un cluster con nombre "elasticsearch".
Para meter más nodos lo primero que haremos es modificar el nombre del cluster (por ejemplo):
/etc/elasticsearch/elasticsearch.yml
cluster.name: es_something_env

Tambien podemos cambiar el nombre de nuestros nodos:
node.name: nombredelhost

Y atributos:
node.attr.ALGO: valor

Tambien puede que queramos cambiar los:
path.data (podemos definir varios, se usarán como raid0)
path.logs
path.plugins

Definir el minimum_master_nodes al valor (numero de masters/2)+1
discovery.zen.minimum_master_nodes:
Este parametro puede ser modificado dinamicamente.


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
