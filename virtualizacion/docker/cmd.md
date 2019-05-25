http://docs.docker.io/en/latest/

Conectar a un host remoto:
docker -H=tcp://somehost ...

Con TLS:
docker --tlsverify --tlscacert=xx --tlscert=xx --tlskey=xx -H=somehost:2376 ...
  si conectamos a una ip cambiar --tlsverify por --tls (sin el verify, no se chequea que el dominio/ip sea válido)

Por SSH (docker 18.09):
docker -H=ssh://host ...

Solo se puede poner una ip/host en el -H: https://github.com/docker/docker-ce/blob/db296304bf08888d009a8e5c3a6589b7a0f9d9f6/components/cli/opts/hosts.go#L65
Tampoco se pueden poner varios -H


## TOP
Ver ps de la maquina
docker top <instance-id>

## PS
Comandos corriendo en las máquinas.
docker ps

Histórico de los comandos ejecutados en las VM
docker ps -a

## LOGS
Mensajes stderr y stdout de la máquina
docker logs <instance-id>

## STOP
docker stop <container-id>

## RESTART
docker restart <container-id>

## CP
Copia ficheros a/desde un container
docker cp IMAGE URL PATH

## RMI
Borra una imagen y todas sus dependencias (hacia abajo) no usadas.
Borra todas las imágenes con ese nombre.
Podemos hacer: rmi imagen:latest   o   rmi imagen:tag

## RM
Borra un container


## INSPECT
Información sobre un container o imagen
docker inspect <image/container-id>
docker image nombre:tag
Es como leer el fichero 
/var/lib/docker/graph/<id>/json para images
/var/lib/docker/containers/<id>/config.json para containers

## Conectar a docker no localhost
docker -H servidor:2375 ....
