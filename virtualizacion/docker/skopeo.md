https://github.com/runcom/skopeo

Get information about containers' images without downloading them

Permite hacer copias entre registries.



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

## Borrar una imagen
Primero obtenemos el digest

curl -X DELETE -v http://localhost:5000/v2/NOMBRE/IMAGEN/manifests/$(curl -H "Accept: application/vnd.docker.distribution.manifest.v2+json" -X HEAD -s http://localhost:5000/v2/NOMBRE/IMAGEN/manifests/latest -D - | grep "Docker-Content-Digest:" | cut -d ' ' -f 2)

