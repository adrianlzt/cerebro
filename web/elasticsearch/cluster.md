https://www.elastic.co/guide/en/elasticsearch/guide/current/_revisit_this_list_before_production.html
https://thoughts.t37.net/designing-the-perfect-elasticsearch-cluster-the-almost-definitive-guide-e614eabc1a87


https://www.elastic.co/guide/en/elasticsearch/guide/current/_add_failover.html

Fácilmente escalable. Simplemente añadir nodos al cluster. Se unen por el nombre del cluster.

Mirar internals.md Communication para ver como se comunican los nodos


# Estado del cluster
curl -s localhost:9200/_cluster/health\?pretty
status puede ser green, yellow o red.
green -> todo bien
yellow -> funciona pero hay problemas (por ejemplo, no hay sharding)
red -> no funciona (no contesta a las queries)

# Settings actuales
curl -s localhost:9200/_cluster/settings | python -m json.tool


# Nodos
curl "https://localhost:9200/_nodes?pretty"
  toda la info de los nodos, muy verboso

curl "https://localhost:9200/_cat/nodes?v"
El que tiene el asterisco sera el master del cluster
node.role:
  m: master
  d: data
  i: ingest


## Tipos de nodos
Un nodo puede tener varios roles (por defecto todos los roles).
Se definen en elasticsearch.yml
Si modificamos el rol de algún nodo, poner todos los valores para que quede claro (si es solo un master, poner tambien node.master: true)

Master eligible (node.master: true)
Data (node.data: true)
Ingest (node.ingest: true)
Coordinating only
Machine learning (X-Pack)


### Master
Tiene el poder de hacer modificaciones en el cluster state.
Cada nodo master eligible tiene una copia del estado del cluster.
No hace falta tener más de 3 masters, da igual el tamaño del cluster.
Es importante tener nodos master dedicados para solo dedicarse a manejar el estado del cluster. Si estos nodos se ralentizan, se ralentiza todo.

GET _cluster/state

Modificaciones del cluster:
  - crear indice
  - añadiendo/quitando nodos
  - allocating shards to nodes

Hay un parámetro para definir el mínimo número de master nodes para poder montar el cluster, y evitar el split brain:
discovery.zen.minimum_master_nodes (recomendado poner floor(N/2)+1)

Si no cumplimos esto en el arranque, no se iniciará el cluster, ni si quiera levantará el puerto 9200.

Si no tenemos master, el resto de nodos no contestará aunque tengan el puerto 9200.


### Data
Almacenan los shards
Ejecutan las operaciones CRUD (create/read/update/delete), search and aggregations.
I/O, CPU and memory-intensive


### Coordinating (frontend)
Todos los nodos del cluster son coordinating
Tiene una copia del estado del cluster.
Puede ser un nodo exclusivamente coordinating. Este nodo recibiria peticiones y las enviaría a los nodos que haga falta.
Luego uniría las respuestas y las devovlería al cliente.
CPU and memory intensive.


# Configuraciones de cluster
Pequeños despliegues: 3-5 nodos, todos master eligible.
Más grandes: 3 master exclusivos, data nodes según los necesitemos. También podemos agregar coordinating-only nodes



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

Por defecto zen discovery.
Prueba las IPs una por una, si no encuentra ninguna operativa, o las que encuentra no tiene el nombre del cluster que busca, crea un cluster nuevo.

Si queremos que solo intente unirse en cluster con ciertos nodos (poner los nodos excepto él mismo).
La buena confguración es poner los tres masters.
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


# Auto generación de índices
Por defecto si intentamos indexar un dato en un índice que no existe, este índice se autogenerará.
Esta funcionalidad seguramente la queramos deshabilitar en producción.


# Networking
Reservar diferentes interfaces para la comunicación de clientes (REST) y una conex exclusiva fiber-channel para el transport entre nodos del cluster.
