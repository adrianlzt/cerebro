# Isolation / namespaces
podman ps --ns
  listar los ns usados en cada container

## pid
--pid=host

Usar un container con el pid ns de otro container
--pid container:NOMBREOTROCONTAINER

## Obtener comando que se usó para arrancar
podman inspect --format "{{.Config.CreateCommand}}" NOMBRECONTAINER | tr -d '[]'
