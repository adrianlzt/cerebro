https://mariadb.com/resources/webinars/how-build-and-scale-application-mariadb-docker
https://mariadb.com/resources/blog/get-started-mariadb-docker

Usando la imagen de mariadb como cliente:
docker run --rm -it mariadb:10.1 mysql -hHOST -uUSER -pPASS


# Imagen para cluster galera con docker swarm
https://github.com/colinmollenhour/mariadb-galera-swarm

Hace falta levantar un service que hará de semilla (seed).
Luego uniremos el resto de nodos.


Al arrancar el seed he tenido que especificar la network, porque sin especificar me ha metido el container en una red bridge (no compartida entre nodos).
Si no le pasamos una password para el user root generará una automaticamente y la pondrá en los logs del nodo "seed".
Podemos pasar la pass como variable de entorno o secreto (mirar https://github.com/colinmollenhour/mariadb-galera-swarm/blob/master/start.sh#L123)
