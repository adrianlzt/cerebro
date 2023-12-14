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


También podemos ejecutar comandos SQL que serán capturados por pgpool.
https://www.pgpool.net/docs/45/en/html/sql-commands.html

Por ejemplo, para ver el estado del pool:
SHOW POOL_NODES;

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

Parece que podemos meter más con:
PGPOOL_POSTGRES_CUSTOM_USERS: List of comma or semicolon separeted list of postgres usernames. This will create entries in pgpool_passwd. No defaults.
PGPOOL_POSTGRES_CUSTOM_PASSWORDS: List of comma or semicolon separated list for postgresql user passwords. These are the corresponding passwords for the users in PGPOOL_POSTGRES_CUSTOM_USERS. No defaults.


Haciendo una prueba con grafana conectado a pgpool, al tirar la conex al backend primario, no consigo que vuelva a funcionar.
Estuvo reintentando conectar durante un rato y luego parece que se dió por vencido.
Ahora intenta mirar si el nodo que le queda es el primario (pero es el standby).
Aunque le permita conectar de nuevo al primario, no lo intenta.

2023-12-14 16:45:17.744: health_check0 pid 157: LOG:  health check retrying on DB node: 0 (round:4)
2023-12-14 16:45:22.745: health_check0 pid 157: LOG:  failed to connect to PostgreSQL server on "127.0.0.1:5434", getsockopt() failed
2023-12-14 16:45:22.745: health_check0 pid 157: DETAIL:  Operation now in progress
2023-12-14 16:45:22.745: health_check0 pid 157: LOG:  health check retrying on DB node: 0 (round:5)
2023-12-14 16:45:27.713: sr_check_worker pid 156: ERROR:  Failed to check replication time lag
2023-12-14 16:45:27.713: sr_check_worker pid 156: DETAIL:  No persistent db connection for the node 0
2023-12-14 16:45:27.713: sr_check_worker pid 156: HINT:  check sr_check_user and sr_check_password
2023-12-14 16:45:27.713: sr_check_worker pid 156: CONTEXT:  while checking replication time lag
2023-12-14 16:45:27.713: sr_check_worker pid 156: LOG:  failed to connect to PostgreSQL server on "127.0.0.1:5434", getsockopt() failed
2023-12-14 16:45:27.713: sr_check_worker pid 156: DETAIL:  Operation now in progress
2023-12-14 16:45:27.745: health_check0 pid 157: LOG:  failed to connect to PostgreSQL server on "127.0.0.1:5434", getsockopt() failed
2023-12-14 16:45:27.745: health_check0 pid 157: DETAIL:  Operation now in progress
2023-12-14 16:45:27.745: health_check0 pid 157: LOG:  health check failed on node 0 (timeout:0)
2023-12-14 16:45:27.745: health_check0 pid 157: LOG:  received degenerate backend request for node_id: 0 from pid [157]
2023-12-14 16:45:27.745: health_check0 pid 157: LOG:  signal_user1_to_parent_with_reason(0)
2023-12-14 16:45:27.746: main pid 1: LOG:  Pgpool-II parent process received SIGUSR1
2023-12-14 16:45:27.746: main pid 1: LOG:  Pgpool-II parent process has received failover request
2023-12-14 16:45:27.746: main pid 1: LOG:  === Starting degeneration. shutdown host 127.0.0.1(5434) ===
2023-12-14 16:45:27.756: main pid 1: LOG:  Restart all children
2023-12-14 16:45:27.757: main pid 1: LOG:  execute command: echo ">>> Failover - that will initialize new primary node search!"
>>> Failover - that will initialize new primary node search!
2023-12-14 16:45:27.759: main pid 1: LOG:  find_primary_node_repeatedly: waiting for finding a primary node


Si lo que tiro es la conex de pgpool al backend réplica, entonces funciona inmediatamente el usar el primario.

Tras conectar de nuevo la réplica, no la detecta, sigue solo conectado al primario.
Con PCP vemos que el nodo lo tiene como down.
/$ pcp_health_check_stats -h 127.0.0.1 -U admin -W 1
1 127.0.0.1 5435 down standby 2023-12-14 16:54:09 7 2 1 4 5 1.666667 5 25003 239 8537.666667 2023-12-14 16:56:09 2023-12-14 16:53:14 2023-12-14 16:56:09 2023-12-14 16:54:09
Podemos hacer un pcp_attach_node para ponerlo en "up".
Pero las conex que ya estén contra el primario se quedarán.


Si hago un detach a mano de un nodo réplica y luego un attach, las conexiones que se hubiesen ido al primario no se fuerzan a la réplica.


Si hago un detach a mano del nodo primario, las conexiones dejan de funcionar y soy incapaz de volver a conectar el nodo primario. Se queda en down.
Saca todo el rato las trazas:
2023-12-14 17:21:44.047: main pid 1: LOG:  find_primary_node: standby node is 1
