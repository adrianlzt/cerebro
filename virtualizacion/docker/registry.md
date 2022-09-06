# artifacthub como repo de imágenes
https://github.com/artifacthub/hub

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

No se puede usar docker login con http (no está soportado).
Para hacer push a un http tendremos que meterlo en nuestro demonio docker local (/etc/docker/daemon.json insecure-registries)


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
Otra opción opensource es Nexus

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
https://hub.docker.com/r/joxit/docker-registry-ui
También como app standalone en cliente: https://github.com/Joxit/docker-registry-ui/blob/main/examples/electron/README.md


Deprecados:
docker run -d -e ENV_DOCKER_REGISTRY_HOST=registry -e ENV_DOCKER_REGISTRY_PORT=5000 -p 8080:80 --link registry --name registry_web konradkleine/docker-registry-frontend:v2
  no permite borrar imagenes, no implementado

https://github.com/SUSE/Portus
  este parece que si permite borrar imágenes y es más avanzado. Permite controlar quien baja que imágenes, monitorización, etc


Ejemplo de uso:
$ docker pull ubuntu
$ docker tag ubuntu localhost:5000/ubuntu
$ docker push localhost:5000/ubuntu


# Administracion registry

Limpiar blobs no usados (para borrar imágenes viejas mirar más abajo, en "Borrar una imagen")
docker exec -it registry bin/registry garbage-collect /etc/docker/registry/config.yml

Parece que no se pueden borrar "registries" aunque estén vacíos.
Lo borramos eliminado el directorio: rm -fr registry/v2/repositories/test
Comprobar primero que no tiene ningún _manifest enlazado (parece que si no tiene ficheros, no tiene nada. Solo veremos directorios vacios)


# API
https://docs.docker.com/registry/spec/api/#overview

Listar repos disponibles:
/v2/_catalog?n=100
curl -u user:pass -k https://127.0.0.1:5000/v2/_catalog?n=100 | jq

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
https://quaintous.com/2017/05/19/docker-registry-housekeeping/
go get github.com/fraunhoferfokus/deckschrubber
Siempre probar antes con -dry para ver que va a hacer
CUIDADO con -repo y -tag, es un regex, pillara repos que se llamen igual pero su nombre sea más largo (ej, test pillara testxxx)
Por defecto solo recupera 5 repos del registry. Si no esta cogiendo el que queremos, aumentar con -repos 10

deckschrubber -registry https://docker.com -user adrian -password XXX -repo "name/borrar" -tag "1.0" -latest 0
  borra la unica imagen de ese repo. Tenemos que poner lo de latest por que si no evita borrar esa unica imagen

deckschrubber -registry https://docker.com -user adrian -password XXX -repo "name/api" -latest 5 -dry
  borrar todas las tags menos las 5 últimas. -dry, no hacer nada, ver que va a borrar



Puede ser que en el registry tengamos un monton de imágenes no refereciadas por ningún tag (porque hayamos subido nuevas imagenes con el mismo tag).
Para borrar ese tipo de imágenes usar: https://github.com/mortensteenrasmussen/docker-registry-manifest-cleanup
docker run -it -v <path-to-registry>:/registry -e REGISTRY_URL=<registry-url> -e DRY_RUN=true mortensrasmussen/docker-registry-manifest-cleanup
  primero dry run para ver que va a borrar
  puede tardar varias horas

No parece que me haya funcionado bien. Sigo teniendo muchas imágenes duplicadas en latest
Esto podemos verlo con:
docker/registry/v2/repositories/USER/REPO/_manifests/tags/latest/index/sha256/ | wc -l
Si tenemos más de una, es que tenemos varias imágenes referenciadas a "latest".




Primero obtenemos el digest

curl -X DELETE -v http://localhost:5000/v2/NOMBRE/IMAGEN/manifests/$(curl -H "Accept: application/vnd.docker.distribution.manifest.v2+json" -X HEAD -s http://localhost:5000/v2/NOMBRE/IMAGEN/manifests/latest -D - | grep "Docker-Content-Digest:" | cut -d ' ' -f 2)

curl -s -u adri:adri -H "Accept: application/vnd.docker.distribution.manifest.v2+json" http://localhost:5000/v2/borrar/adrigitlab/manifests/latest | jq -r '.config.digest'

https://github.com/vidarl/remove_image_from_registry
imagen de docker para borrar
Parece que es un poco lio, que hay que ir borrando varias capas
https://stackoverflow.com/questions/25436742/how-to-delete-images-from-a-private-docker-registry


https://raw.githubusercontent.com/byrnedo/docker-reg-tool/master/docker_reg_tool
Si no me funciona cambiar la linea donde chequea la existencia de ~/.docker/config.json por $HOME/.docker/config.json
docker_reg_tool https://docker.com list
  listar repos

docker_reg_tool https://docker.com list name/repo
  listar tags

El delete no me funciona
