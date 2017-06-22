https://github.com/coreos/etcd
https://coreos.com/using-coreos/etcd/

competencia: consul, zookeper

A highly-available key value store for shared configuration and service discovery. etcd is inspired by zookeeper and doozer, with a focus on:

etcd is a highly available, distributed key/value store that is built to distribute configuration updates to all the servers in your cluster. Next to that it can be used for service discovery, or basically for any other distributed key/value based process that applies to your situation.

Simple: curl'able user facing API (HTTP+JSON)
Secure: optional SSL client cert authentication
Fast: benchmarked 1000s of writes/s per instance
Reliable: Properly distributed using Raft

Analisis de etcd (2014). Parece que había ciertos problemas, pero puede que ya solucionados.
En api v2 ya tenian una opción para evitar los problemas de linealidad. En v3 no lo veo en la doc, puede que por defecto?
https://github.com/coreos/etcd/issues/741
https://aphyr.com/posts/316-call-me-maybe-etcd-and-consul


Tamaño máximo de las values:
https://github.com/coreos/etcd/issues/2992
The recommended value size is < 1MB


# etcdctl / CLI
https://github.com/coreos/etcd/tree/master/etcdctl

Lo que este en v2 no tiene porque verse en v3

etcdctl3 --endpoints https://server:2379 memberlist
  lista de los nodos del cluster

Contenido de etcd en v2
etcdctl2 ls
etcdctl2 ls --recursive
  si ponemos --debug recursive no mostrará nada

etcdctl2 get /path/key

etcdctl2 -o extended get /path/key
  para ver el ttl, index, created-index y modified-index

Hacer long pooling de una key o un dir
etcdctl2 watch -f /path/key
  se queda recibiendo metricas
  --after-index N, para obtener solo métricas a partir de ese valor. Sin -f parece que nos devuelve la primera
  -r para poner sobre un directorio y escuchar a todos los eventos child



etcdctl2 cluster-health
  nos devuelve una línea por cada miembro diciendo si esta healthy
  la última linea devuelve el estado global del cluster
  hace un curl a /v2/members

--debug para ver que está lanzando (al final son peticiones HTTP, en la v2)



## con docker
docker run -it --rm quay.io/coreos/etcd etcdctl -C http://172.16.1.28:2379,http://172.16.1.29:2379,http://172.16.1.30:2379 member list



# API

Parece que la v3 no soporta JSON, es gRPC.
v2 si soporta JSON

Ejemplos:

Version
curl http://127.0.0.1:2379/version

Ver keys definidas:
curl -L http://127.0.0.1:2379/v2/keys

Set a key message with value Hello world:
curl -L http://127.0.0.1:2379/v2/keys/message -d value="Hello world"

Borrar una key
curl http://127.0.0.1:2379/v2/keys/message -XDELETE

Read the value of message back:
curl -L http://127.0.0.1:2379/v2/keys/message

Para un get recursivo:
&recursive=true

Ordenado:
&sorted=true

Hace falta quorum en la respuesta? (etcdcli por defecto lo pone a false)
quorum=true

curl "https://127.0.0.1:2379/v2/keys/kubernetes.io/events/?wait=true&recursive=true"
se queda escuchando hasta que aparece algún evento hijo del path especificado.
sale tras el primer evento

para obtener todos los eventos a partir de un punto la idea es empezar haciendo un GET sobre /v2/keys y obtener la cabecera X-Etcd-Index. Este será el último index de etcd.
Luego ejecutaremos el curl diciendo a etcd que queremos el primer evento a partir de ese índice:
curl -X GET https://127.0.0.1:2379/v2/keys/kubernetes.io/events/?recursive=true&wait=true&waitIndex=4669787
cuando lo obtengamos, cogeremos el "Modified-Index" le sumaremos uno y volveremos a realizar el mismo curl.
Con la información puede que nos venga también el "prevNode", por lo que veo si tiene TTL será porque el nodo ha variado reduciendo su TTL (suopngo que por otros cambios también puede que venga)

Ejemplo teórico de un HA de postgresql usando etcd
https://blog.compose.io/high-availability-for-postgresql-batteries-not-included/


## Statistics
https://coreos.com/etcd/docs/latest/v2/api.html#statistics

/v2/stats/leader
latency to each peer in the cluster, and the number of failed and successful Raft RPC requests

/v2/stats/self
un montón de métricas sobre el estado del nodo (id, bytes rx/tx, star time, estado, etc)

/v2/stats/store
estadisticas sobre número de creaciones, borrados, get, watch, etc


# Cluster
https://coreos.com/etcd/docs/latest/v2/docker_guide.html#running-a-3-node-etcd-cluster

Instrucciones para montar un cluster de etcd.
Cada container irá sobre una VM distinta.
Lo que hacemos es levantar cada nodo pasandole las direcciones del resto de nodos del cluster.
Cada container expone los puertos que necesita para comunicarse en la VM
Los nombres de LISTA_NODOS deben matchear con lo que pasemos en "etcd -name XXX"

IP="poner_la_ip_de_cada_maquina"
LISTA_NODOS="etcd_HOSTNAME1=http://IPNODO1:2380,etcd_HOSTNAME2=http://IPNODO2:2380,etcd_HOSTNAME3=http://IPNODO3:2380"
docker run --restart=unless-stopped -d -v /usr/share/ca-certificates/:/etc/ssl/certs -p 4001:4001 -p 2380:2380 -p 2379:2379 \
 --name "etcd_$(hostname)" quay.io/coreos/etcd \
 etcd -name "etcd_$(hostname)" \
 -advertise-client-urls http://${IP}:2379,http://${IP}:4001 \
 -listen-client-urls http://0.0.0.0:2379,http://0.0.0.0:4001 \
 -initial-advertise-peer-urls http://${IP}:2380 \
 -listen-peer-urls http://0.0.0.0:2380 \
 -initial-cluster-token etcd-cluster-1 \
 -initial-cluster ${LISTA_NODOS} \
 -initial-cluster-state new


Comprobar:
docker run -it --rm quay.io/coreos/etcd etcdctl -C http://172.16.1.28:2379,http://172.16.1.29:2379,http://172.16.1.30:2379 member list

Para los clientes el puerto es el 2379
