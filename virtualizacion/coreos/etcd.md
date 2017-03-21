https://github.com/coreos/etcd
https://coreos.com/using-coreos/etcd/

A highly-available key value store for shared configuration and service discovery. etcd is inspired by zookeeper and doozer, with a focus on:

etcd is a highly available, distributed key/value store that is built to distribute configuration updates to all the servers in your cluster. Next to that it can be used for service discovery, or basically for any other distributed key/value based process that applies to your situation.

Simple: curl'able user facing API (HTTP+JSON)
Secure: optional SSL client cert authentication
Fast: benchmarked 1000s of writes/s per instance
Reliable: Properly distributed using Raft


Tamaño máximo de las values:
https://github.com/coreos/etcd/issues/2992
The recommended value size is < 1MB


# etcdctl / CLI
https://github.com/coreos/etcd/tree/master/etcdctl


## con docker
docker run -it --rm quay.io/coreos/etcd etcdctl -C http://172.16.1.28:2379,http://172.16.1.29:2379,http://172.16.1.30:2379 member list



# API

Parece que la v3 no soporta JSON, es gRPC.
v2 si soporta JSON

Ejemplos:

Ver keys definidas:
curl -L http://127.0.0.1:2379/v2/keys

Set a key message with value Hello world:
curl -L http://127.0.0.1:2379/v2/keys/message -d value="Hello world"


Read the value of message back:
curl -L http://127.0.0.1:2379/v2/keys/message


Ejemplo teórico de un HA de postgresql usando etcd
https://blog.compose.io/high-availability-for-postgresql-batteries-not-included/




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
