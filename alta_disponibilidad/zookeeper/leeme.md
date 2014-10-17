http://zookeeper.apache.org/

ZooKeeper is a centralized service for maintaining configuration information, naming, providing distributed synchronization, and providing group services. All of these kinds of services are used in some form or another by distributed applications. Each time they are implemented there is a lot of work that goes into fixing the bugs and race conditions that are inevitable. Because of the difficulty of implementing these kinds of services, applications initially usually skimp on them ,which make them brittle in the presence of change and difficult to manage. Even when done correctly, different implementations of these services lead to management complexity when the applications are deployed.


Funciona creando una especie de sistema de ficheros (znodes) con high throughput, low latency, highly available, strictly ordered access to the znodes.
Estos znodes pueden almacenar información y al mismo tiempo ser "directorios" de donde cuelguen más znodes.
Se suelen almacenar información de estado, configuración, etc. Datos pequeños, por debajo de 1MB.

Este "sistema de ficheros" esta replica en la memoria de todas las máquinas del cluster. La lista de transacciones y snapshots son almacenadas en disco.

Los clientes deben conocer la dirección de todos los servidores.
Clients only connect to a single ZooKeeper server. The client maintains a TCP connection through which it sends requests, gets responses, gets watch events, and sends heartbeats. If the TCP connection to the server breaks, the client will connect to a different server. When a client first connects to the ZooKeeper service, the first ZooKeeper server will setup a session for the client. If the client needs to connect to another server, this session will get reestablished with the new server.

The throughput of read requests scales with the number of servers and the throughput of write requests decreases with the number of servers.

Order is very important to ZooKeeper; almost bordering on obsessive–compulsive disorder. All updates are totally ordered. ZooKeeper actually stamps each update with a number that reflects this order. We call this number the zxid (ZooKeeper Transaction Id). Each update will have a unique zxid. Reads (and watches) are ordered with respect to updates. Read responses will be stamped with the last zxid processed by the server that services the read.
