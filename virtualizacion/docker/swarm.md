https://docs.docker.com/engine/swarm/swarm-mode/

Gestión de varios docekr host como uno solo.
Nos permite asignar recursos


systemctl start docker
docker swarm init

Nos pasa un comando para agregar mas dockerd a este swarm (cluster)
Para mostrar el comando de nuevo:

docker swarm join-token worker


# Discovery
bbdd clave-valor donde se almacena el estado del cluster y su configuración

Posibilidades: Consul, etcd, Zookeper
La libreria libvkv se encarga de hablar con estos backends

La configuración se puede regenerar en caso de que la bbdd se perdiese.

La bbdd lo mejor es que sea HA para evitar tener una pérdida.


# Swarm manager
El que recibe las ordenes y ve donde ejecutarlas
Soporta HA y es importante tenerlo configurado.
En caso de que se cayese el cluster seguiría funcionando, pero no podría desplegar nuevos contenedores.
