https://www.elastic.co/guide/en/elasticsearch/guide/current/_revisit_this_list_before_production.html
https://thoughts.t37.net/designing-the-perfect-elasticsearch-cluster-the-almost-definitive-guide-e614eabc1a87

mirar hot_warm_architecture.md


https://www.elastic.co/guide/en/elasticsearch/guide/current/_add_failover.html
https://www.elastic.co/guide/en/elasticsearch/reference/6.3/system-config.html#dev-vs-prod
https://www.elastic.co/guide/en/elasticsearch/reference/current/tune-for-indexing-speed.html

Fácilmente escalable. Simplemente añadir nodos al cluster. Se unen por el nombre del cluster.

Mirar internals.md Communication para ver como se comunican los nodos

No intentar distribuir un cluster mediante un link WAN. La latencia y la transferencia de datos matarán el cluster


# Estado del cluster
curl -s localhost:9200/_cluster/health\?pretty
status puede ser green, yellow o red.
RED: algún primary shard no allocated
YELLOW: todos los primary shards allocated, pero al menos un replica no lo está
GREEN: todos los shards allocated

# Settings actuales
curl -s localhost:9200/_cluster/settings | python -m json.tool

Filtrando por un setting determinado y poniendolo en formato flat (key1.key2.key3)
GET _all/_settings/index.blocks.read_only?flat_settings=true



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
Por defecto es master eligible, data e ingest.
Si modificamos el rol de algún nodo, poner todos los valores para que quede claro (si es solo un master, poner tambien node.master: true)

Master eligible (node.master: true)
Data (node.data: true)
Ingest (node.ingest: true)
Coordinating only (master:false, data:false, ingest:false)
Machine learning (X-Pack)


### Master
Tiene el poder de hacer modificaciones en el cluster state.
Cada nodo master eligible tiene una copia del estado del cluster.
No hace falta tener más de 3 masters, da igual el tamaño del cluster.
Es importante tener nodos master dedicados para solo dedicarse a manejar el estado del cluster. Si estos nodos se ralentizan, se ralentiza todo.
Bajo consumo de CPU, memoria y disco.
No deben recibir peticiones de los clientes.

GET _cluster/state
GET /_cluster/state/{metrics}/{indices}
GET /_cluster/state/metadata,routing_table/foo,bar


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
Ejecutan las operaciones CRUD (create/read/update/delete), search and aggregations. Procesan las peticiones de los clientes.
I/O, CPU and memory-intensive

Recomendación de elastic, 1000 shards por nodo como límite máximo que no se debe superar


### Ingest
Data processing
Poco disco, medio uso de memoria, mucho uso de CPU
Podemos usarlos como write frontends.
No cuentan para pagar la licencia.



### Coordinating (frontend)
Todos los nodos del cluster son coordinating
Tiene una copia del estado del cluster.
Puede ser un nodo exclusivamente coordinating. Este nodo recibiria peticiones y las enviaría a los nodos que haga falta.
Luego uniría las respuestas y las devovlería al cliente.
CPU and memory medium/high, low disk.
Si tenemos suficientes recursos, poner 3 nodos como coordinating/frontend y solo enviar las búsquedas hacia ellos. Poner menos podría hacernos bottleneck en caso de que alguno cayese. El número dependerá mucho de la carga que vayamos a tener. Tal vez 2 sean suficientes.
Configurar round robin sobre estos, o un load balancer delante.
Funcionarián como "smart load balancers" que envian las peticiones a quien necesiten.
Realizaráin el gather/reduce de las búsquedas.
Reducen la carga en los data nodes.
Se puede apuntar Kibana a uno de estos nodos.
No cuenta para pagar la licencia.



# Configuraciones de cluster
Pequeños despliegues: 3-5 nodos, todos master eligible.
Más grandes: 3 master exclusivos, data nodes según los necesitemos. También podemos agregar coordinating-only nodes. Tal vez también algunos ingest nodes si tenemos que hacer preprocesado.

Una arquitectura ideal: cluster.png



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


# Strict mapping
No permitir campos fuera del mapping definido.
mirar mapping.md


# Desactivar coarce
Evitar que ES intente adivinar que tipo de datos estamos indexando
mirar mapping.md


# Networking
Reservar diferentes interfaces para la comunicación de clientes (REST) y una conex exclusiva fiber-channel para el transport entre nodos del cluster.


# Shard awareness
Mirar shards.md
Balancear shards de forma inteligente en caso de que tengamos nodos con recursos compartidos



Mirar best_practices.md



# Capacity planning
Before trying to determine your capacity, you need to
  Determine your SLA(s):
    How many docs/second do you need to index?
    How many queries/second do you need to process?
    What is the maximum response time for queries?
  Get some production data
    actual documents you are going to index
    actual queries you are going to run in production
    actual mappings you are going to use

Primero tendremos que calcular la capacidad de un shard para nuestras condiciones (tipos de documentos, búsquedas, etc).
Empezaremos con un único shard e iremos usándolo cada vez más hasta que dejemos de cumplir nuestros SLAs (por ejemplo, latencia, o storage)

Num of primary shards:
  estimate the total amount of data for your index
  leave room for growth (if applicable)
  divide by the maximum capacity of a single shard


Medir la capacidad de un nodo:
  indexar documentos de nuestro tipo en paralelo hasta empezar a obtener respuestas 429
  con eso podremos calcular la velocidad que soporta (docs/sec)


Replicas (podemos modificarlo dinamicamente):
  nos dan HA
  tambien nos ayudan a escalar las búsquedas

  vienen con un coste:
    reduccion de la velocidad de indexado
    mas ocupación de disco
    mas uso de heap memory por tener más shards


Scaling with indices
  Podemos crear nuevos índices para lograr escalar mejor.
  Buscar sobre 50 índices con 1 shard es equivalente a buscar sobre un índice con 50 shards.


Para poder planificar correctamente tenemos que tener claro:
  que tipo de datos vamos a indexar
    fixed-size: buscar sobre large datasets que crecen lentamente
    time-based: data que crece rápidamente, como ficheros de log.
  como vamos a buscar sobre esos datos

