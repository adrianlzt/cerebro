http://www.pgpool.net/mediawiki/index.php/Main_Page
https://gist.github.com/afair/3803895
https://www.highgo.ca/2019/09/06/can-you-gain-performance-with-pgpool-ii-as-a-load-balancer/
mirar pgbouncer.md

Pgpool-II is a middleware that works between PostgreSQL servers and a PostgreSQL database client.

Más pesado que pgbouncer

Connection Pooling
Pgpool-II saves connections to the PostgreSQL servers, and reuse them whenever a new connection with the same properties (i.e. username, database, protocol version) comes in. It reduces connection overhead, and improves system's overall throughput.

Replication
Pgpool-II can manage multiple PostgreSQL servers. Using the replication function enables creating a realtime backup on 2 or more physical disks, so that the service can continue without stopping servers in case of a disk failure.

Load Balancing
If a database is replicated, executing a SELECT query on any server will return the same result. Pgpool-II takes an advantage of the replication feature to reduce the load on each PostgreSQL server by distributing SELECT queries among multiple servers, improving system's overall throughput. At best, performance improves proportionally to the number of PostgreSQL servers. Load balance works best in a situation where there are a lot of users executing many queries at the same time.
En el curso nos han comentado que esta funcionalidad puede no funcionar correctamente, porque un select puede llevar una función que haga un insert.

Limiting Exceeding Connections
There is a limit on the maximum number of concurrent connections with PostgreSQL, and connections are rejected after this many connections. Setting the maximum number of connections, however, increases resource consumption and affect system performance. pgpool-II also has a limit on the maximum number of connections, but extra connections will be queued instead of returning an error immediately.


Pgpool-II talks PostgreSQL's backend and frontend protocol, and relays a connection between them. Therefore, a database application (frontend) thinks that Pgpool-II is the actual PostgreSQL server, and the server (backend) sees Pgpool-II as one of its clients. Because Pgpool-II is transparent to both the server and the client, an existing database application can be used with Pgpool-II almost without a change to its sources.
