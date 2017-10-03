https://github.com/moby/moby/


# API
api/server/router

Aqui se definen las rutas de la API
Ejemplo: api/server/router/container/container.go
router.NewGetRoute("/containers/json", r.getContainersJSON)



# Como se arranca un container / como hace el mount
https://huaminchen.wordpress.com/2015/05/19/how-docker-handles-mount-namespace/

when a Docker client issues a run command, it posts a command to Docker daemon. Docker Daemon thus invokes execdriver to initialize the container. This initialization is executed by libcontainer. On Linux, libcontainer calls out LinuxStandardInit, which in turn runs setupRootfs to create the initial namespace for the container.
