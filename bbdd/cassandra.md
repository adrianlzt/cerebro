http://cassandra.apache.org/

The Apache Cassandra database is the right choice when you need scalability and high availability without compromising performance. Linear scalability and proven fault-tolerance on commodity hardware or cloud infrastructure make it the perfect platform for mission-critical data. Cassandra's support for replicating across multiple datacenters is best-in-class, providing lower latency for your users and the peace of mind of knowing that you can survive regional outages.

Cassandra's data model offers the convenience of column indexes with the performance of log-structured updates, strong support for denormalization and materialized views, and powerful built-in caching.

Funciona sobre Java (usar Sun JDK)

Usa lenguaje CQL, parecido al SQL (mirar más abajo)


http://highscalability.com/blog/2013/8/26/reddit-lessons-learned-from-mistakes-made-scaling-to-1-billi.html
Fast writes, fast negative lookups, easy incremental scalability, no single point of failure

At Netflix data is distributed around to three different zones. A copy of all data is in all three zones. If a zone is lost then they can still run.

Switching vote data into Cassandra was a huge win at reddit. Cassandra’s bloom filters enabled really fast negative lookups. For comments it’s very fast to tell which comments you didn’t vote on, so the negative answers come back quickly. (more on this topic)

Each tool has a different use case. Memcache has no guarantees about durability, but is very fast, so the vote data is stored there to make rendering of pages as quick as possible. Cassandra is durable and fast, and gives fast negative lookups because of its bloom filter, so it was good for storing a durable copy of the votes for when the data isn't in memcache. Postgres is rock solid and relational, so it’s a good place to store votes as a backup for Cassandra (all data in Cassandra could be generated from Postgres if necessary) and also for doing batch processing, which sometimes needed the relational capabilities.


http://labs.spotify.com/
Cassandra vs PostgreSQL
A properly administered Cassandra cluster has better replication (especially writes).
A properly administered Cassandra cluster behaves better in the presence of networking issues and failures, such as partitions or intermittent glitches.
In general, Cassandra behaves better in certain classes of failures (server dies, network links goes down etc) from an operational perspective, than a PostgreSQL cluster.


# CQL
http://cassandra.apache.org/doc/latest/cql/

cqlsh> SELECT * FROM hawkular_metrics.data LIMIT 2;
  sin estar en ningún keyspace/databse, hacemos una query contra el keyspace hawkular_metrics, tabla data

cqlsh> USE hawkular_metrics;
  como en sql, para seleccionar un keyspace/database

cqlsh:hawkular_metrics> SELECT DISTINCT tenant_id, type, metric, dpart FROM data;
  mostrar valores distintos. Como el schema declara esos 4 valores como clave primaria, tengo que preguntar por los 4 al mismo tiempo

Parece que cuando una primary_key está definida en una tupla (ej.: PRIMARY KEY ((tenant_id, tname), tvalue, type, metric)), la tupla siempre tiene que ir junta.
Si queremos ver el valor de un elemento de la tupla, estamos obligados a pedir el de los otros elementos de la tupla.
Si queremos filtrar, tendremos que poner todos los elementos de la tupla.



# CLI / cqlsh
http://cassandra.apache.org/doc/latest/tools/cqlsh.html
Shell para interactuar con Cassandra usando CQL

cqlsh> DESCRIBE KEYSPACES
  como un "show databases"

cqlsh> DESCRIBE TABLES
  como un show tables sobre todas las databases

cqlsh> DESCRIBE KEYSPACE <keyspace name>
  hace un dump de los schemas de las tablas de ese keyspace

cqlsh> DESCRIBE TABLE hawkular_metrics.data
  schema de una tabla determinada


# Admin / nodetool
http://cassandra.apache.org/doc/latest/tools/nodetool/nodetool.html
nodetool status
  nos da un resumen de los nodos del cluster y su estado

nodetool info
  info mas detallada sobre el nodo


# Monitoring
http://cassandra.apache.org/doc/latest/operating/metrics.html
