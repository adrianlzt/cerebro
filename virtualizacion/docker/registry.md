# Usar un repo externo
docker login http://reg.externo.com

O crear un fichero en ~/.docker/config.json estilo:
{
  "https://url.com" : {
    "auth" : "YWxMkOF349dhbxQBR1BXY=",
    "email" : "email@email.com"
  }
}


# Montarnos un registry (un hub.docker.com)
https://hub.docker.com/_/registry/

docker run -d -p 5000:5000 --restart always -v "${PWD}/config.yml:/etc/docker/registry/config.yml" -v "${PWD}/data:/var/lib/registry" --name registry registry:2.6.2
config.yml en registry_config.yml
Doc de la config: https://github.com/docker/distribution/blob/master/docs/configuration.md


Visor web:
docker run -d -e ENV_DOCKER_REGISTRY_HOST=registry -e ENV_DOCKER_REGISTRY_PORT=5000 -p 8080:80 --link registry --name registry_web konradkleine/docker-registry-frontend:v2


Ejemplo de uso:
$ docker pull ubuntu
$ docker tag ubuntu localhost:5000/ubuntu
$ docker push localhost:5000/ubuntu


# Administracion registry

# API
https://docs.docker.com/registry/spec/api/#overview

Listar repos disponibles:
/v2/_catalog

Listar tags para la imagen org/nombre
v2/org/nombre/tags/list


## Borrar una imagen
Primero obtenemos el digest

curl -X DELETE -v http://localhost:5000/v2/NOMBRE/IMAGEN/manifests/$(curl -H "Accept: application/vnd.docker.distribution.manifest.v2+json" -X HEAD -s http://localhost:5000/v2/NOMBRE/IMAGEN/manifests/latest -D - | grep "Docker-Content-Digest:" | cut -d ' ' -f 2)

