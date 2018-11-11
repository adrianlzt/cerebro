Es el concepto "container" para cluster.
Le decimos que service queremos crear un cuantas copias debe haber.
El se encarga donde levantar los containers que sean necesarios y mantenerlos activos (levantar nuevos si alguno se detiene)

### Arrancar un service
https://docs.docker.com/engine/swarm/services/
https://docs.docker.com/engine/reference/commandline/service_create/#usage
docker service create --name websrv --limit-memory 32MB --publish 8080:80 --mode replicated nginx:alpine
  este comando lo podremos lanzar desde cualquier manager (no desde los workers)

Opciones:
--constraint node.labels.tipo==xxx   ejecutar un service en unos nodos concretos filtrando por label. Con inspect veremos esto
--limit-memory 32MB
--replicas 1 (por defecto 1 replica)
--mode replicated (este es el por defecto)
--mode global (un container por cada pod)
Una vez arrancado el servicio no se puede cambiar el "--mode"

--net=host, parece que esta disponible a partir de la 17.10 (https://github.com/moby/moby/issues/25873#issuecomment-340061842)

Ejemplo de como agregar un volumen. El volumen estará compartido entre todas las instancias.
--mount type=volume,source=my-volume,destination=/path/in/container,volume-label="color=red",volume-label="shape=round" \

Crear volumes distintos para cada instancia del service (https://github.com/moby/moby/issues/30008)
  --mount type=volume,src="{{.Task.Name}}",dst=/results/ \

--mount type=bind,source=/path/on/host,destination=/path/in/container
  montar path del host

Se pueden crear "configs" (como con los configMaps de kubernetes) y montarlos luego en un service.
mirar config.md

Parece que no se puede moficiar el entrypoint https://github.com/moby/moby/issues/24196


Forzar a redesplegar un service (por ejemplo para bajarse la ultima imagen):
docker service update --force nombre


Si queremos escalar un servicio
docker service scale SERVICE=REPLICAS


# API
https://docs.docker.com/engine/api/v1.24/#39-services

https://forums.docker.com/t/docker-swarm-scale-service-using-update-api/19589/9
Ejemplos para hacer un scale de un service con la API
