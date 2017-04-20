https://docs.docker.com/engine/userguide/networking/work-with-networks/#linking-containers-in-user-defined-networks

Crear redes privadas donde conectar containers.
Cuando conectamos dos containers a una misma red se pueden conectar entre ellos por el nombre (docker mete un server de dns interno)


# Crear
docker network create example

Por defecto creará una tipo "bridge".
Las overlay necesitan una bbdd key-value


# Listar
docker network ls


# Unir nodos
Un nodo ya creado:
docker network connect example container2

Al crear el nodo:
docker run -it --rm --name=container2 --network=simple-network busybox


Una vez unidos los nodos se pueden encontrar por su nombre


# Desconectar nodos
docker network disconnect isolated_nw container3


# Borrar red
docker network rm isolated_nw
