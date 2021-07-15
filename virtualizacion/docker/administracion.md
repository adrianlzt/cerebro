Si queremos analizar un container primero lo tendremos que convertir a imagen:
docker commit <container-id> <nombre-tag>


Los datos se guarda en /var/lib/docker
  graph/ son las imágenes
  graph/<imageid>/layer son las filesystem layers

/var/lib/docker/graph/<id>/json para images
/var/lib/docker/containers/<id>/config.json para containers

Limpiar basura: borrar todos los containers parados
docker rm $(docker ps -a -q)


Agregar un usuario para que pueda administrar docker (sin necesidad de usar sudo)
sudo groupadd docker
sudo gpasswd -a usuario docker
sudo service docker restart
exit



ID del último container:
docker ps -q -l
Guardar como alias: alias dl="docker ps -q -l"


Ip del último contenedor
apt-get install jq
docker inspect $(docker ps -q -l) | jq -r '.[0].NetworkSettings.IPAddress'


Variables de entorno
docker run -e "deep=purple" --rm ubuntu /bin/bash


Gráfica de dependencias entre imágenes:
apt-get install graphviz
docker images -viz | dot -Tpng -o docker.png
