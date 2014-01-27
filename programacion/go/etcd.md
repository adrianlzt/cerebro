https://github.com/coreos/etcd

A highly-available key value store for shared configuration and service discovery. etcd is inspired by zookeeper and doozer, with a focus on:

Simple: curl'able user facing API (HTTP+JSON)
Secure: optional SSL client cert authentication
Fast: benchmarked 1000s of writes/s per instance
Reliable: Properly distributed using Raft


Ejemplos:

Set a key message with value Hello world:
curl -L http://127.0.0.1:4001/v1/keys/message -d value="Hello world"


Read the value of message back:
curl -L http://127.0.0.1:4001/v1/keys/message
