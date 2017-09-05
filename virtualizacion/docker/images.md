mirar containers.md


Podemos crear una imagen también a partir de un .tar con import
http://docs.docker.io/en/latest/commandline/command/import/

# Exportar / importar imágenes
docker save -o /tmp/test.tar base-image-xxyy

docker load -i fichero.tar



Otra forma (se importar metadatos, cmd, entrypoint, ports, etc)
docker import fichero.tar nombre/imagen
cat exampleimage.tgz | sudo docker import - exampleimagelocal

tar xvf test.tar

Para ver las operaciones quehan llevado a esta imagen:
find . -iname json -print -exec jq '.container_config.Cmd' {} \;

Analizando los json podemos ver quien es el parent
find . -iname json -print -exec jq '.parent' {} \;
Bajo dos niveles hasta encontrar el id que realmente contiene la primera imagen




Esto es util junto con el comando export, que nos exporta un container a un .tar
docker export CONTAINER


Podríamos sacar un container a un .tar, hacer las modificaciones que necesitásemos, y generar una imagen a partir de ese tar modificado.


# Donde se almacena
http://stackoverflow.com/questions/19234831/where-are-docker-images-stored-on-the-host-machine

Depende del storage driver.

En arch -> devicemapper


