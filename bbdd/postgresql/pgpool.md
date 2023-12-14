http://www.pgpool.net/mediawiki/index.php/Main_Page
https://gist.github.com/afair/3803895
https://www.highgo.ca/2019/09/06/can-you-gain-performance-with-pgpool-ii-as-a-load-balancer/
mirar ha_scalability.md
Parece que también puede gestionar una VIP

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


# Admin / PCP
Comandos para administrar u obtener info de pgpool.
https://www.pgpool.net/docs/45/en/html/pcp-commands.html

pcp_node_info -h 127.0.0.1 -U admin -W


# Docker
https://hub.docker.com/r/bitnami/pgpool

pgpool balanceando las queries read-only al nodo standby.
Si el nodo standby no está disponible, lo balancea al primario:

Los servidores de postgres son 127.0.0.1:5434 y 127.0.0.1:5435

podman run -it --rm --name pgpool --net host \
  --env PGPOOL_BACKEND_NODES=0:127.0.0.1:5434,1:127.0.0.1:5435 \
  --env PGPOOL_SR_CHECK_USER=postgres \
  --env PGPOOL_SR_CHECK_PASSWORD=bf5HKSEJIV3msCH2Z6mENARb \
  --env PGPOOL_ENABLE_LDAP=no \
  --env PGPOOL_POSTGRES_USERNAME=postgres \
  --env PGPOOL_POSTGRES_PASSWORD=bf5HKSEJIV3msCH2Z6mENARb \
  --env PGPOOL_ADMIN_USERNAME=admin \
  --env PGPOOL_ADMIN_PASSWORD=adminpassword \
  -v "$PWD/pgpool_extra.conf:/opt/bitnami/pgpool/conf/pgpool_extra.conf" \
  --env PGPOOL_USER_CONF_FILE=/opt/bitnami/pgpool/conf/pgpool_extra.conf \
  bitnami/pgpool:4.5.0

pgpool_extra.conf
```
user_redirect_preference_list = 'postgres:standby'
```

Esta configuración extra es la que hace que todo lo del usuario postgres se balancee a la/las standby.
https://www.pgpool.net/docs/latest/en/html/runtime-config-load-balancing.html#:~:text=Pgpool%2DII%20configurations.-,user_redirect_preference_list,-(string)

Config para PCP
PGPOOL_ADMIN_USERNAME: Username for the pgpool administrator. No defaults.
PGPOOL_ADMIN_PASSWORD: Password for the user set in PGPOOL_ADMIN_USERNAME environment variable. No defaults.

Este será el user que se meterá en el fichero pool_passwd.
Por lo que he probado, será el único usuario con el que podremos loguear contra pgpool y también el que se usará para conectar con los backends.
PGPOOL_POSTGRES_USERNAME: Postgres administrator user name, this will be use to allow postgres admin authentication through Pgpool.
PGPOOL_POSTGRES_PASSWORD: Password for the user set in PGPOOL_POSTGRES_USERNAME environment variable. No defaults.
