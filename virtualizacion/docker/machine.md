https://docs.docker.com/machine/overview/

Parece una especie de vagrant para docker.
Lo conectamos con un driver (virtualbox, kvm, etc) y mandamos crear hosts con docker ya instalado.
Luego usamos el mismo comando para enviar acciones a esos nodos.


Drivers disponibles: https://docs.docker.com/machine/drivers/


# Install
https://docs.docker.com/machine/install-machine/#installing-machine-directly


# Montar un docker sobre una VM de virtualbox
docker-machine create NOMBRE

Por defecto intentará usar el nombre default (menos en la creación, que debemos especificarlo)

# Listar dockers
Ver docker hosts montados
docker-machine ls


# Parar / rearrancar
docker-machine stop NOMBRE
docker-machine start NOMBRE


# Configurar nuestra CLI para conectar a un docker-host
eval $(docker-machine env NOMBRE)

Desconfigurar
eval $(docker-machine env -u)



# Ejecutar container
docker run --rm -it busybox
