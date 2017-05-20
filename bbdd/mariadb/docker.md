https://mariadb.com/resources/webinars/how-build-and-scale-application-mariadb-docker
https://mariadb.com/resources/blog/get-started-mariadb-docker


Mirar los repos:
https://github.com/colinmollenhour/mariadb-galera-swarm/blob/master/Dockerfile
https://github.com/colinmollenhour/mariadb-galera-swarm/tree/master/examples/swarm
https://github.com/alvinr/docker-demo/blob/master/mariadb/vote/prod/galera/galera-cluster/docker-entrypoint.sh


Usando la imagen de mariadb como cliente:
docker run --rm -it mariadb:10.1 mysql -hHOST -uUSER -pPASS


# Imagen para cluster galera con docker swarm
https://github.com/colinmollenhour/mariadb-galera-swarm

Hace falta levantar un service que hará de semilla (seed).
Luego uniremos el resto de nodos.


Al arrancar el seed he tenido que especificar la network, porque sin especificar me ha metido el container en una red bridge (no compartida entre nodos).
Si no le pasamos una password para el user root generará una automaticamente y la pondrá en los logs del nodo "seed".
Podemos pasar la pass como variable de entorno o secreto (mirar https://github.com/colinmollenhour/mariadb-galera-swarm/blob/master/start.sh#L123)


Red donde montamos el servicio:
docker network create --driver overlay --attachable mysql

Arrancando el seed:
docker service create --name galera-seed --replicas 1 -e XTRABACKUP_PASSWORD=root -e MYSQL_ROOT_PASSWORD=root --network mysql colinmollenhour/mariadb-galera-swarm seed
  mirar los logs del container hasta encontrar "mysqld: ready for connections"

Arrancando los nodos "normales":
docker service create --name galera --replicas 2 -e XTRABACKUP_PASSWORD=root --network mysql colinmollenhour/mariadb-galera-swarm node tasks.galera-seed,tasks.galera
  en el seed veremos bastantes trazas mientras los dos nodos nuevos se unen

Esta imagen solo da permisos de acceso al usuario root en localhost.
Entraremos con "exec" en alguno de los nodos de galera:

No consigo que arranque el cluster correctamente.
Tampoco desplegando el stack: https://github.com/colinmollenhour/mariadb-galera-swarm/tree/master/examples/swarm
