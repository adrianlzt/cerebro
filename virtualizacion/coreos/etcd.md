https://github.com/coreos/etcd
https://coreos.com/using-coreos/etcd/

A highly-available key value store for shared configuration and service discovery. etcd is inspired by zookeeper and doozer, with a focus on:

etcd is a highly available, distributed key/value store that is built to distribute configuration updates to all the servers in your cluster. Next to that it can be used for service discovery, or basically for any other distributed key/value based process that applies to your situation.

Simple: curl'able user facing API (HTTP+JSON)
Secure: optional SSL client cert authentication
Fast: benchmarked 1000s of writes/s per instance
Reliable: Properly distributed using Raft



Cliente etcdctl con docker:
docker pull tenstartups/etcdctl
docker run -it --rm tenstartups/etcdctl -C http://172.16.2.23:2379 member list



Ejemplos:

Set a key message with value Hello world:
curl -L http://127.0.0.1:4001/v1/keys/message -d value="Hello world"


Read the value of message back:
curl -L http://127.0.0.1:4001/v1/keys/message


Ejemplo teórico de un HA de postgresql usando etcd
https://blog.compose.io/high-availability-for-postgresql-batteries-not-included/
