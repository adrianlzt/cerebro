https://github.com/moby/moby/


# API
api/server/router

Aqui se definen las rutas de la API
Ejemplo: api/server/router/container/container.go
router.NewGetRoute("/containers/json", r.getContainersJSON)



# Como se arranca un container / como hace el mount
https://huaminchen.wordpress.com/2015/05/19/how-docker-handles-mount-namespace/

when a Docker client issues a run command, it posts a command to Docker daemon. Docker Daemon thus invokes execdriver to initialize the container. This initialization is executed by libcontainer. On Linux, libcontainer calls out LinuxStandardInit, which in turn runs setupRootfs to create the initial namespace for the container.



# Network
Modificar la bbdd donde tiene la info de las redes

https://github.com/br0xen/boltbrowser
  modificar el fichero local-kv.db, pero no muestra de forma cómoda el contenido
https://github.com/itsziget/tutorial-docker-build/blob/33ead24d5c429cf0c8ef878f1148b80aefcdbd54/goapps/dockerdb-reader/dockerdb-reader.go
  mostrar el contenido de local-kv.db en formato json. Solo hace dump.

docker network ls
docker inspect ...
systemctl stop docker
./boltbrowser /var/lib/docker/network/files/local-kv.db
  Modificar la red y el gateway
  Podemos usar el comando "dockerdb-reader" para ver donde está lo que necesitamos modificar
systemctl start docker

