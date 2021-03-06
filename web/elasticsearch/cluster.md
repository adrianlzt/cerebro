https://www.elastic.co/guide/en/elasticsearch/guide/current/_revisit_this_list_before_production.html
https://thoughts.t37.net/designing-the-perfect-elasticsearch-cluster-the-almost-definitive-guide-e614eabc1a87

https://www.elastic.co/elasticon/conf/2016/sf/quantitative-cluster-sizing

mirar hot_warm_architecture.md
memory_sizing.md


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



## Recovery cluster
Configuraciones para acelerar la recuperación de un cluster.

Recovery
for faster recovery, temporarily increase the number of concurrent recoveries
PUT _cluster/settings {
  "transient": {
    "cluster.routing.allocation.node_concurrent_recoveries": 2
  }
}

Relocation
for faster rebalancing of shards, increase
"cluster.routing.allocation.cluster_concurrent_rebalance" : 2




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
https://www.elastic.co/guide/en/elasticsearch/guide/master/heap-sizing.html#heap-sizing
En CentOS viene con 2GB por defecto.

Swapping mata la performance. Recomiendan quitarla o bajar mucho el swappiness (a 1, 0 puede provocar OOM en algunas distros)

Debe vigilarse igualmente que no se esté quedando sin filedescriptors.
En centos7 la unit de systemd ya configura para poner el limite a 65536

Elasticsearch reparte la carga por igual entre nodos, igualando el número de shards asignados por nodo y manteniendo un equilibrio en cuanto a almacenamiento se refiere, sin tener en cuenta los recursos de uno u otro nodo. Esto uno al uso actual que se está haciendo de esta plataforma, el nodo con menos cantidad de memoria está en situación de saturación continua. Esto se puede evidenciar al comprobar desde el módulo de Monitoring que las métricas de este nodo no se están obteniendo bien.


# Auto generación de índices
Por defecto si intentamos indexar un dato en un índice que no existe, este índice se autogenerará.
Esta funcionalidad seguramente la queramos deshabilitar en producción.

PUT _cluster/settings
{
  "persistent": {
    "action.auto_create_index": false
  }
}

Permitir algunos patterns de creación de índices:
PUT _cluster/settings
{
  "persistent": {
    "action.auto_create_index": ".monitoring-es*,logstash-*"
  }
}


# Strict mapping
No permitir campos fuera del mapping definido.
mirar mapping.md


# Desactivar coarce
Evitar que ES intente adivinar que tipo de datos estamos indexando
mirar mapping.md


# Networking
Forzar un puerto para los protocolos http/transport y poner una ip que no sea localhost/127.0.0.1
Si la ip no es local, se considerará que la máquina es production-ready y se pasarán ciertos bootstrap checks para comprobar que la máquina es válida para esto.

Reservar diferentes interfaces para la comunicación de clientes (REST) y una conex exclusiva fiber-channel para el transport entre nodos del cluster.
Distintas reglas de firewall para cada tipo de tráfico.

No intentar crear un cluster a través de WAN links, excepto si tenemos una latencia muy baja (por ejemplo misma AZ de AWS, no una distinta region).
Intentar tener 0 saltos ente los nodos (o los menos posibles).

Usar long-lived http connections:
  - las librerias clientes soportan esto
  - o usar un proxy/load-balancer


# Storage
Intentar usar SSD
  usar el noop o deadline en el scheduler (https://www.elastic.co/guide/en/elasticsearch/guide/current/hardware.html#_disks)
  echo noop > /sys/block/{DEVICE}/queue/scheduler

  trimm your SSDs: https://www.elastic.co/blog/is-your-elasticsearch-trimmed

Si usamos spinning disks, dejar el scheduler que venga, pero deshabilitar los concurrent merges:
  index.merge.scheduler.max_thread_count: 1

Discos locales (NFS, SMV, AWS EFS, Azure filesystem, funcionarán mal)
Mejor discos locales que SAN.
No hace falta RAID, ES se encarga de la replicación.

Podemos especificar varios distintos data paths (mismos shards irán en el mismo path):
dath.data: /path1,/path2



# Bootstrap checks
https://www.elastic.co/guide/en/elasticsearch/reference/current/bootstrap-checks.html
Descripción de que hace cada check

Forzarlos/eliminarlos:
es.enforce.bootstrap.checks: true/false

NO se pueden desactivar: https://github.com/elastic/elasticsearch/issues/31933

JVM Checks
  heap size
  disable swapping
  not use serial collector
  OnError and OnOutOfMemoryError
  G1GC
  server JVM

Linux Checks
  maximum map count
  maximum size virtual memory
  maximum number of threads
  file descriptor
  system call filter

Note that X-Pack has a few additional bootstrap checks


# JRE
Usar las versiones para servidores. Las versiones clientes tienen cosas para debugear que pueden ralentizar



# Hardware
Mejor máqinas "medium" que "large".
Mejor 4 máquinas más pequeñas que 2 más grandes (para mismas cpus/mem)
Esto nos permite más resistencia ante caídas.

Las máquinas más grandes recomendables, a nivel de memoria, serían 64GB (32GB límite heap de ES * 2, para cache OS)

Unas máquinas grandes pueden ser útiles como warm nodes (usando shard allocation filtering)



# Cloud strategies
Usar el discovery plugin que se adapte para que el "discovery" se configure automáticamente según los cabmios de IPs que se puedan producir.
Ponernos en distintas AZs (misma región).
Mejor ephemeral storage que network storage.
Evitar máquinas con low network performance
Usar shard awareness para diferenciar las AZs (y usar forced awareness para evitar problemas ante caídas puntuales)




# Shard awareness
Mirar shards.md
Balancear shards de forma inteligente en caso de que tengamos nodos con recursos compartidos



Mirar best_practices.md

Mirar model_data.md


# Capacity planning
Herramienta para hacer benchmark: benchmark.md
https://www.elastic.co/blog/managing-time-based-indices-efficiently

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
      escala añadiendo más nodos y réplicas
      para incrementar capacidad, reindexar para tener más shards o crear nuevos índices (pero intentar no hacerlo muy frecuentemente)
    time-based: data que crece rápidamente, como ficheros de log. https://www.elastic.co/blog/managing-time-based-indices-efficiently
      docs con un timestamp y que no cambian
      podemos usar una arquitectura hot/warm para gestionar datos antiguos
        reducir el número de índices viejos para tener el número óptimo de shards
        cerrar índices que no van a ser buscados
      data ingestion puede ser otro problema
        esparcir los shards del índice activo sobre el número máximo de nodos posible (para aumentar el index throughput)
      usar índices con la fecha en el nombre (rotado diariamente, semanalmente, etc, depende del tamaño de los shards): name-YYYY-MM-DD
        para usar el cambio de nombre podemos usar:
          algo en el cliente que lo calcule
          date math en el index name. Ejemplo:
            <logstash-{now/d}>  per day
            <logstash-{now{YYYY.MM}}>  per month
            <logstash-{now/w}>  per week
          aliases
            tweets-write, y una app que modifique el alias cuando sea necesario (eg.: cada cambio de día/semana/mes)
          ingestion nodes pipelines
  como vamos a buscar sobre esos datos
    si vamos a hacer búsquedas muy costosas en CPU tal vez queremos ingest nodes



# Performance
Si estamos limitados por el disk IO podemos reducir el refresh_interval de los índices para escribir menos ficheros más grandes.




# Heap
Usos mayoritarios de la heap.

indexing buffer (stores newly-indexed docs)
completion suggester
cluster state
caches:
  node query cache (10%, remembers if a doc matches a filter)
  shard query cache (1%, cache results of a query)
  fielddata (unbounded)



# Java configs
By default, the JVM heap size is 1 GB
  likely not high enough for production
  you can change it using Xms (min heap) and Xmx (max heap)

Some guidelines for configuring the heap size:
  set Xms and Xmx to the same size (bootstrap check)
  set Xmx to no more than 50% of your physical RAM
  Elasticsearch requires memory for purposes other than the JVM heap and it is important to leave space for this. For instance, Elasticsearch uses off-heap buffers for efficient network communication, relies on the operating system’s filesystem cache for efficient access to files, and the JVM itself requires some memory too. It is normal to observe the Elasticsearch process using more memory than the limit configured with the Xmx setting.



Rule of thumb for setting the JVM heap is:
  do not exceed more than 30GB of memory (to not exceed the compressed ordinary object pointers limit)
  https://www.elastic.co/blog/a-heap-of-trouble

Production JVM Settings
1. We do not support G1GC garbage collection
  and strongly discourage its use
2. JDKs have two modes of a JVM: client and server
  server JVM is required in production mode
3. Configure the JVM to disable swapping
  by requesting the JVM to lock the heap in memory through mlockall (Unix) or virtual lock (Windows)



# Muerte por consumo excesivo de memoria
Como gestionar que no nos pase?
