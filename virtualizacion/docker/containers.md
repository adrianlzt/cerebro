Listado de containers públicos: index.docker.io

Localmente se almacenan en: /var/lib/docker/containers/

# Busqueda de containers:
docker search <string>

# Bajar container:
docker pull <username>/<repository>

Algunas especiales, como ubuntu, es suficiente con: docker pull <repository>

Los containeres están formados por varias capas (base image + otras)


Los containers contienen todo lo que el proceso pueda necesitar (librerias, filesystem, shell, etc).
Para "arrancar" un container tenemos que correr un proceso en él.
Nada corre por defecto, y cuando el proceso muere, nada queda corriendo, pero los cambios (instalaciones, ficheros de configuración) se mantienen. Pero Ctrl+C si fona


# Listar containers/images
docker images

# Correr proceso en container (la imagen será una de las listadas en docker images). Por defecto el comando es no interactivo (cuidado si nos pregutan algo)
docker run <imagen> echo "hello world"

# Cosas corriendo
docker ps
docker ps -l  (histórico)

# Commit. Los cambios no se guardan por defecto, tenemos que crear un commit para guardar las diferencias entre la imagen bajada y la modificada, que se meteran en una nueva capa (layer). El docker-id lo sacamos del 'docker ps -l -q' (ultimo container ejecutado). El usuario repo sería mi nombre, y el nombre del nuevo container que he generado.
docker commit <docker-id|docker-name> usuario/repo

# Info sobre el docker. JSON con la ip, puertos mapeados, comando al arrancar la instancia, volumenes, etc
docker inspect <docker-id>

# Pull images al index oficial de docker. Se hace layer por layer
docker pull usuario/imagen

# Mirar que cambios hemos hecho
docker diff <container>
