Arranco un container con centos:
docker run -t -i centos /bin/bash

Instalo el software (percona xtradb cluster en este caso)
Configuro el software, lo arranco, testeo, y paro.

Salgo del container.

Obtengo el id del container (los primero resultados son los más nuevos)
docker ps -a | head -2

Creo un snapshot del container que acabo de crear
docker commit <container-id> adrianlzt/percona-xtradb-cluster-5.5.33

Puedo seguir haciendo modificaciones y luego commits a lo git.
Ejemplo:
sudo docker commit -m "mariadb55 image w/ external data" -author="<YOU>" <CONTAINER_ID> amattn/mariadb55 <SOME_TAG>

Para subirlo al indice:
docker push adrianlzt/percona-xtradb-cluster-5.5.33
