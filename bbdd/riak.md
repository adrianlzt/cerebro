http://basho.com/riak/

Riak is an open source, distributed database. Riak is architected for:

Availability: Riak replicates and retrieves data intelligently so it is available for read and write operations, even in failure conditions;
Fault-Tolerance: You can lose access to many nodes due to network partition or hardware failure without losing data;
Operational Simplicity: Add new machines to your Riak cluster easily without incurring a larger operational burden – the same ops tasks apply to small clusters as large clusters;
Scalability: Riak automatically distributes data around the cluster and yields a near-linear performance increase as you add capacity.


Almacenamiento de pares clave-valor


http://basho.com/why-your-riak-cluster-should-have-at-least-five-nodes/




"Practical Eventually-Consistent Web Apps on Riak" Sean Cribbs (basho)

COMMENTS: it was not very interesting, not convincing.
Consistency --> many commercial DB are not ACID
Riak: "eventually-consistent, scalable, schema-free" datastore
When not to use Riak:
tightly coupled schema
data fits on one machine
your application can handle eventual consistency
Apps that use them: Rovio(angry birds), Yammer, etc.

https://speakerdeck.com/seancribbs/practical-eventually-consistent-web-apps-on-riak
