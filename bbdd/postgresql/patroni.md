https://patroni.readthedocs.io/en/latest/
https://github.com/zalando/patroni
https://www.opsdash.com/blog/postgres-getting-started-patroni.html

Timescale es el que recomienda.
Viene preinstalado en su imagen "-ha".

Necesita un Distributed Configuration Store (DCS):
 - etcd
 - consul
 - zookeeper
 - exhibitor
 - kubernetes
 - raft
