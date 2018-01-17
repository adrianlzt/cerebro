https://docs.docker.com/compose/bundles/#overview
https://docs.docker.com/engine/reference/commandline/stack/#child-commands
https://docs.docker.com/compose/compose-file/

Fichero YAML (usa la v3 del fichero compose) donde definimos nuestra arquitectura para que se despliegue sobre un docker swarm.

Tiene algunas limitaciones.
 - No puedes hacer un build de todas las imagenes de un repo
 - Tampoco un pull de esas imagenes
 - No se pueden hacer volume mounts

Stack es solo para lanzar.


Ejemplo de fichero: stack_example_wp.yml

Tenemos directivas globales:
networks
volumes
secrets


# Despliegue
docker stack deploy --compose-file fichero.yml nombre

Si usamos un registry con auth tendremos que pasar el parametro (para que se pueda bajar las imagenes):
--with-registry-auth

# Listado
docker stack ls
  nos dice el stack y cuantos services tiene corriendo (cada service puede tener varias replicas)

# Info
docker stack ps <NAME>
  veermos ya todas las tareas (tasks) ejecutandose
