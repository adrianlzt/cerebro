https://blog.docker.com/2017/02/docker-secrets-management/
https://docs.docker.com/compose/compose-file/#secrets
>= v1.13
Los secrets "external" solo están para docker swarm
Los backuped en ficheros tambien para docker-compose

Pensar como un método de pasar datos a los containers que van a estar en todos los hosts.
Las contraseñas son unas de estas cosas.
Util para distribuir ficheros de configuración.

Entiendo que no es muy seguro, ya que podemos unirnos a un container y consultar el dato.

No se pueden consultar ni modificar. Podríamos borrarlo y actualizar el servicio pasandole el nuevo secreto.

# Crear
echo "un secreto" | docker secret create my_secret_data -
  con una string

docker secret create my_secret_file fichero.txt

# Consultar
docker secret ls
docker secret inspect <ID|NOMBRE>

# Borrar
docker secret rm <ID|NOMBRE>


# Levantar service con un secreto
docker service create --name secreto --secret="my_secret_data" redis:alpine


Los secretos los tendremos en:
/run/secrets/my_secret_data



# Compose
services:
  main:
    image: opensolutions/jenkins
    secrets:
      - jenkins-user
      - jenkins-pass
secrets:
  jenkins-user:
    file: ./secret.txt
  jenkins-pass:
    external: true



# Secrets in dockerfiles
https://medium.com/@tonistiigi/build-secrets-and-ssh-forwarding-in-docker-18-09-ae8161d066
