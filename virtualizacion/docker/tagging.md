## TAGGING ##

docker build -t adrianlzt/imagen:1.3 < Dockerfile

Taggear un container:
docker commit -m "commit message" -author "autor" <container-id> adrianlzt/imagen 4.2

También podemos tagear una imagen:
docker tag imagen adrianlzt/imagen 1.5

Tagear para un repo externo
docker tag adrianlzt/image:1.5 externo.registry.com/adrianlzt/imagen:1.5
docker push externo.registry.com/adrianlzt/imagen:1.5
