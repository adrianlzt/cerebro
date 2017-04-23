Almacenar una imagen en un fichero:
docker save adrianlzt/docker-ssl-proxy:latest -o adrianlzt_docker-ssl-proxy.tar

Importar:
docker import adrianlzt_docker-ssl-proxy.tar adrianlzt/docker-ssl-proxy:latest



Parece que se pierden las propiedades de la imagen.
Con docker inspect ya no vemos command, entrypoint, etc
