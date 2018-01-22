# Usar un repo externo
docker login http://reg.externo.com

O crear un fichero en ~/.docker/config.json estilo:
{
  "https://url.com" : {
    "auth" : "YWxMkOF349dhbxQBR1BXY=",
    "email" : "email@email.com"
  }
}

Podemos especificar donde queremos que busque el fichero con:
docker --config /foo/bar ...
  ira a buscar el fichero /foo/bar/config.json


Podemos usar programas externos para almacenar estas claves, entre ellos "pass":
https://github.com/docker/docker-credential-helpers



# Montarnos un registry (un hub.docker.com)
https://hub.docker.com/_/registry/
https://blog.mayflower.de/5650-Running-a-secure-docker-registry.html
https://github.com/docker/distribution/blob/master/docs/configuration.md

cp ~/adrianRepo/virtualizacion/docker/registry_config.yml config.yml
mkdir data
docker run -d -p 5000:5000 --restart always -v "${PWD}/config.yml:/etc/docker/registry/config.yml" -v "${PWD}/data:/var/lib/registry" --name registry registry:latest
config.yml en registry_config.yml
Doc de la config: https://github.com/docker/distribution/blob/master/docs/configuration.md

Por defecto no tiene TLS y deberemos configurar todos los demonios de docker que tengan que hablar con este registry para aceptar este sin TLS (necesario reiniciar).
Mejor meterle un cert (pero tendrá que ser válido)

Si metemos pass con auth basic, para generar el htpasswd usar:
htpasswd -cBb fichero USER PASS

Para añadir nuevos:
htpasswd -Bb fichero USER PASS

config.yml
auth:
  htpasswd:
    realm: basic-realm
    path: /path/to/htpasswd



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

curl -s -u adri:adri -H "Accept: application/vnd.docker.distribution.manifest.v2+json" http://localhost:5000/v2/borrar/adrigitlab/manifests/latest | jq -r '.config.digest'

https://github.com/vidarl/remove_image_from_registry
imagen de docker para borrar
Parece que es un poco lio, que hay que ir borrando varias capas
https://stackoverflow.com/questions/25436742/how-to-delete-images-from-a-private-docker-registry
