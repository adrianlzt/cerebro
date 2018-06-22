# Usar un repo externo
docker login http://reg.externo.com

O crear un fichero en ~/.docker/config.json estilo:
{
  "https://url.com" : {
    "auth" : "YWxMkOF349dhbxQBR1BXY=",
    "email" : "email@email.com"
  }
}
"auth" será http basic auth (user:password en base64)

Podemos especificar donde queremos que busque el fichero con:
docker --config /foo/bar ...
  ira a buscar el fichero /foo/bar/config.json


Podemos usar programas externos para almacenar estas claves, entre ellos "pass":
https://github.com/docker/docker-credential-helpers
Lo que hace es ejecutar el programa y luego pasarle por stdin el nombre del server del que quiere obtener las credenciales.
La respuesta debe ser tipo: {"ServerURL":"nombreServer","Username":"usuario","Secret":"clave"}  (sin encriptación de ningún tipo)

Al usar pass y almacenar (store) lo guardara en:
docker-credential-helpers/BASE64_del_server/USUARIO
Solo almacenará ahí el secret

Podemos hacernos un programa custom, en el .docker/config.json pondremos:
{
  "credsStore": "miprograma"
}

Esto hará que docker busque en el path un programa:
docker-credential-miprograma

Un script tonto en bash que responda lo necesario (solo para obtener claves):
#!/bin/bash
read server
echo '{"Username":"usuario","Secret":"contraseña"}'




# Montarnos un registry (un hub.docker.com)
https://hub.docker.com/_/registry/
https://blog.mayflower.de/5650-Running-a-secure-docker-registry.html
https://github.com/docker/distribution/blob/master/docs/configuration.md

Gitlab a partir de la 8.8 viene con un registry.

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
/v2/_catalog?n=100

Listar tags para la imagen org/nombre
v2/org/nombre/tags/list

Podemos usar esta herramienta escrita en go para navegar por un repo:
https://github.com/mayflower/docker-ls

Info de una tag para un repo con auth:
./docker-ls tag --registry https://docker.some.registry/ some/image:tag -u MIUSER -p MIPASS

Listar tags de una imagen:
./docker-ls tags --registry https://docker.some.registry/ some/image -u MIUSER -p MIPASS

Listar repositorios (generalmente no disponible, /v2/_catalog?n=100):
./docker-ls repositories --registry https://docker.some.registry/ -u MIUSER -p MIPASS


## Auth
Enviamos la peticion
Si hace falta loguearnos nos devuelve una cabecera tipo:
Www-Authenticate: Bearer realm="https://docker-auth.elastic.co/auth",service="token-service"

Lanzamos la peticioń de obtención de token pasando el auth basic
GET https://docker-auth.elastic.co/auth?account=andremm&scope=repository%3Aeducation%2Fengineer1-6.2.2%3Apull&service=token-service
Authorization: Basic XXXXXX

Nos reponse en un json con un token.
Usamos ese token para obtener la info, pasandolo como "Authorization: Bearer ELTOKEN"


Ejemplos:
curl -i -s -k  -X $'GET' -H $'Host: docker.some.registry' -H $'User-Agent: docker/18.05.0-ce go/go1.10.2 git-commit/f150324782 kernel/4.17.0-1-ARCH os/linux arch/amd64 UpstreamClient(Docker-Client/18.05.0-ce \\(linux\\))' -H $'Accept-Encoding: gzip, deflate' -H $'Connection: close' 'https://docker.some.registry/v2/'
  Devuelve 401 con header: Www-Authenticate: Bearer realm="https://docker-auth.some.registry/auth",service="token-service"

curl -i -s -k  -X $'GET' -H $'Host: docker-auth.some.registry' -H $'User-Agent: docker/18.05.0-ce go/go1.10.2 git-commit/f150324782 kernel/4.17.0-1-ARCH os/linux arch/amd64 UpstreamClient(Docker-Client/18.05.0-ce \\(linux\\))' -H $'Authorization: Basic XXXXXXX' -H $'Accept-Encoding: gzip, deflate' -H $'Connection: close' 'https://docker-auth.some.registry/auth?account=andremm&scope=repository%3Aeducation%2Fengineer1-6.2.2%3Apull&service=token-service'
  Devuelve un 200 con un json: {"token":MITOKEN"}

curl -i -s -k  -X $'GET' -H $'Host: docker.some.registry' -H $'User-Agent: docker/18.05.0-ce go/go1.10.2 git-commit/f150324782 kernel/4.17.0-1-ARCH os/linux arch/amd64 UpstreamClient(Docker-Client/18.05.0-ce \\(linux\\))' -H $'Accept: application/vnd.docker.distribution.manifest.list.v2+json' -H $'Accept: application/vnd.docker.distribution.manifest.v1+prettyjws' -H $'Accept: application/json' -H $'Accept: application/vnd.docker.distribution.manifest.v2+json' -H $'Authorization: Bearer MITOKEN' -H $'Accept-Encoding: gzip, deflate' -H $'Connection: close' 'https://docker.some.registry/v2/education/engineer1-6.2.2/manifests/latest'




## Borrar una imagen
Primero obtenemos el digest

curl -X DELETE -v http://localhost:5000/v2/NOMBRE/IMAGEN/manifests/$(curl -H "Accept: application/vnd.docker.distribution.manifest.v2+json" -X HEAD -s http://localhost:5000/v2/NOMBRE/IMAGEN/manifests/latest -D - | grep "Docker-Content-Digest:" | cut -d ' ' -f 2)

curl -s -u adri:adri -H "Accept: application/vnd.docker.distribution.manifest.v2+json" http://localhost:5000/v2/borrar/adrigitlab/manifests/latest | jq -r '.config.digest'

https://github.com/vidarl/remove_image_from_registry
imagen de docker para borrar
Parece que es un poco lio, que hay que ir borrando varias capas
https://stackoverflow.com/questions/25436742/how-to-delete-images-from-a-private-docker-registry
