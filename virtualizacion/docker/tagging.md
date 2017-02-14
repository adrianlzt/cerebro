## TAGGING ##

docker build -t adrianlzt/imagen:1.3 < Dockerfile

Se pueden poner varios tags:
https://docs.docker.com/engine/reference/commandline/build/#tag-image-t
docker build -t whenry/fedora-jboss:latest -t whenry/fedora-jboss:v2.1 .


Taggear un container:
docker commit -m "commit message" -author "autor" <container-id> adrianlzt/imagen 4.2

También podemos tagear una imagen:
docker tag XXXXXXX adrianlzt/imagen 1.5

Poner el tag latest a una version
docker tag tools/coso:1.5 tools/coso:latest

Tagear para un repo externo
docker tag adrianlzt/image:1.5 externo.registry.com/adrianlzt/imagen:1.5
docker push externo.registry.com/adrianlzt/imagen:1.5


## Listar tags
curl -s -S 'https://registry.hub.docker.com/v2/repositories/library/centos/tags/' | jq '."results"[]["name"]' |sort
