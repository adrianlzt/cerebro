https://github.com/coreos/etcd
https://coreos.com/using-coreos/etcd/

competencia: consul, zookeper
https://github.com/rancher/kine APIs compatibles de ETCD sobre postgres, mysql, etc

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

ETCDCTL_API=3 etcdctl --endpoints https://server:2379 member list
  lista de los nodos del cluster
  si da fallo, comprobar con http://

etcdctl member list
  para la v2


## v3
get --prefix --keys-only /
  equivalente al "ls" de v2


# v2
etcdctl ls
etcdctl ls --recursive
  si ponemos --debug recursive no mostrará nada

etcdctl get /path/key

etcdctl -o extended get /path/key
  para ver el ttl, index, created-index y modified-index

Hacer long pooling de una key o un dir
etcdctl watch -f /path/key
  se queda recibiendo metricas
  --after-index N, para obtener solo métricas a partir de ese valor. Sin -f parece que nos devuelve la primera
  -r para poner sobre un directorio y escuchar a todos los eventos child



etcdctl cluster-health
  nos devuelve una línea por cada miembro diciendo si esta healthy
  la última linea devuelve el estado global del cluster
  hace un curl a /v2/members

--debug para ver que está lanzando (al final son peticiones HTTP, en la v2)


Borrar todas las keys
podman exec -it etcd etcdctl get --keys-only --prefix / | grep -o "[a-z/]*" | xargs -n 1 podman exec -it etcd etcdctl del



## con docker
docker run -it --rm quay.io/coreos/etcd etcdctl -C http://172.16.1.28:2379,http://172.16.1.29:2379,http://172.16.1.30:2379 member list



# API

Parece que la v3 es gRPC, pero tiene una pasarela para poder hablar JSON (https://etcd.io/docs/v3.5/dev-guide/api_grpc_gateway/)
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
docker run --restart=unless-stopped -d -v /usr/share/ca-certificates/:/etc/ssl/certs -p 2380:2380 -p 2379:2379 \
 --name etcd quay.io/coreos/etcd \
 etcd -name "etcd_$(hostname)" \
 -advertise-client-urls http://${IP}:2379 \
 -listen-client-urls http://0.0.0.0:2379 \
 -initial-advertise-peer-urls http://${IP}:2380 \
 -listen-peer-urls http://0.0.0.0:2380 \
 -initial-cluster-token etcd-cluster-1 \
 -initial-cluster ${LISTA_NODOS} \
 -initial-cluster-state new


Comprobar:
docker run -it --rm quay.io/coreos/etcd etcdctl -w table endpoint health --cluster
podman exec -it etcd etcdctl -w table endpoint health --cluster

Deberán salirnos los endpoints con health a true

Para los clientes el puerto es el 2379


## Discovery
https://etcd.io/docs/v3.5/op-guide/clustering/

En vez de poner las IPs directamente se pueden usar distintos métodos para hacer discovery.

Podemos usar un cluster etcd ya montado o usar registros SRV DNS.


## Add node to existing etcd cluster
--initial-cluster-state existing


# BackUp / Disaster recovery
https://coreos.com/etcd/docs/latest/v2/admin_guide.html#disaster-recovery
etcdctl backup ...

Si el cluster pierde dos nodos (pierde irremediablemente). Habrá que parar el cluster y arrancar uno nuevo.


# Conf
ETCD_INITIAL: para el arranque del cluster

Si añadimos un nuevo nodo, no hace falta modificar la conf del cluster.

# Certs
Conectar usando certs
/usr/bin/etcdctl --cert-file /etc/etcd/peer.crt --key-file /etc/etcd/peer.key --ca-file /etc/etcd/ca.crt -C https://`hostname`:2379 ${@}


# Configuracion
## Snapshots y WAL
Idea similar a postgres.

https://pkg.go.dev/github.com/coreos/etcd/wal

snap son snapshots desde las cuales se puede recuperar un cluster de etcd.



# Leases
Podemos pedir un lease a etcd.
Este lease nos permite asociar keys que solo sobreviven durante un tiempo determinado.

Se usa para insertar valores que duren durante un tiempo, que podemos ir renovando.
Útil para mantener un lock mientras cierta app esté viva.


Crear un lease:
etcdctl lease grant 500

Asociar una key a un lease (usaremos el ID que nos ha devuelto el anterior comando):
etcdctl put zoo1 val1 --lease=694d5765fc71500b

Ver los leases activos:
etcdctl lease list

Para un lease determinado, ver su TTL y keys asociadas:
etcdctl lease timetolive --keys 695682b0c0573e40



# Monitorización
https://sysdig.com/blog/monitor-etcd/
https://github.com/coreos/etcd/blob/master/Documentation/faq.md

- Nodo funcionando
- ETCd como servicio funcionando
- Latencias entre el lider y los followers

monitor backend_commit_duration_seconds (p99 duration should be less than 25ms) to confirm the disk is reasonably fast
monitor wal_fsync_duration_seconds (p99 duration should be less than 10ms) to confirm the disk is reasonably fast

Another metric to consider is the member latency: delay until a Follower achieves data coherence with the cluster Leader.
In a testing scenario running on a local network, the sync latencies are fairly stable around 0.01-0.02 sec.
Sudden short bursts of latency can show up and disappear without any intervention, to avoid a noisy alert that does not require any specific actions, you would rather configure the alert to trigger only if the high latencies are sustained for example over 10+ minute


Métricas expuestas con prometheus: https://github.com/coreos/etcd/blob/master/Documentation/metrics.md
curl localhost:2379/metrics
curl --cert /etc/etcd/peer.crt --key /etc/etcd/peer.key --cacert /etc/etcd/ca.crt https://`hostname`:2379/metrics

Los mensajes los envia a journald con criticidad determinada.
Tambien usa un campo "PACKAGE" para definir de donde sale el log:
Para consultar el log viendo el package:
journalctl -u etcd -o json-pretty

Ejemplo, mensajes warning:
failed to send out heartbeat on time (exceeded the 500ms timeout for 1.844681993s)
server is likely overloaded
sync duration of 1.083760629s, expected less than 1s


Ejemplo, mensajes err:
etcdserver: request timed out, possibly due to previous leader failure

Version 3.1.7:
Para ver todos los errores posibles podemos buscar el string "plog".
También deberemos tener en cuenta los generados por "mlog":
etcdserver/api/v2http/http.go
63-   case etcdserver.ErrTimeoutDueToLeaderFail, etcdserver.ErrTimeoutDueToConnectionLost, etcdserver.ErrNotEnoughStartedMembers, etcdserver.ErrUnhealthy:
64:     mlog.MergeError(err)
65-   default:
66:     mlog.MergeErrorf("got unexpected response error (%v)", err)

etcdserver/api/v2http/client.go
649-    case etcdserver.ErrTimeoutDueToLeaderFail, etcdserver.ErrTimeoutDueToConnectionLost:
650:      mlog.MergeError(err)
651-    default:
652:      mlog.MergeErrorf("got unexpected response error (%v)", err)




Un nodo no conecta al cluster. El id ha cambiado.
Borrar el /var/lib/etcd
Cambiar en la conf:
ETCD_INITIAL_CLUSTER_STATE=new  ->  ETCD_INITIAL_CLUSTER_STATE=existing
Arrancar de nuevo
