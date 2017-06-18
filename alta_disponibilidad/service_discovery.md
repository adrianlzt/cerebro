http://progrium.com/blog/2014/07/29/understanding-modern-service-discovery-with-docker/

Service discovery tools manage how processes and services in a cluster can find and talk to one another. It involves a directory of services, registering services in that directory, and then being able to lookup and connect to services in that directory.

Esta compuesto por tres partes:
 - A consistent (ideally), highly available service directory
 - A mechanism to register services and monitor service health
 - A mechanism to lookup and connect to services


# DNS
Es una opción, pero no tiene bastantes problemas de partida.
La primera es el TTL, aunque podemos ponerlo a 0 con nuestro propio servidor.
Otra es que algunos servicios cachean las respuestas DNS.
El mayor problema es que DNS no está pensado para decir en que puerto está el servicio, y aunque tenemos los SRV records, no están implementados en la mayoría de las librerías. Cuando creas una conex, debes especificar el puerto, no esperas que lo coja del sistema de resolución.


# Service directories
etcd y consul (basados en raft) pueden usarse como "service directories".
Lugares donde consultar (de forma consistente y alta disponibilidad) ip/puerto de un servicio que necesito.

