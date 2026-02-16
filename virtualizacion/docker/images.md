Para crear imágenes sin docker (en el userspace):
buildah (redhat)
kaniko (Google, usado por JenkinsX)

<https://www.docker.com/blog/reduce-your-image-size-with-the-dive-in-docker-extension/>
Para analizar imágenes usar "dive".
Nos permite ver que se hace en cada layer y sugiere optimizaciones.

Para crear imágenes pequeñas y seguras, solo deja los ficheros y syscalls necesarias.
<https://github.com/slimtoolkit/slim>

Si buscamos las imágenes donde en el nombre podemos pasar las herramientas que queremos:
container_with_tools.md

mirar containers.md

Analizar una imagen (nos muestra por cada capa que se ha ejecutado y que ficheros se han modificado):
dive nombre

Como un docker inspect pero sin bajar la imagen:

```bash
crane config ghcr.io/open-feature/flagd:v0.12.9 | jq
```

Info sin bajar la imagen: skopeo.md

Mirar datos de una imagen
docker image ID

Historico de como se creo:
docker history --no-trunc ID

Podemos crear una imagen también a partir de un .tar con import
<http://docs.docker.io/en/latest/commandline/command/import/>

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

<http://stackoverflow.com/questions/19234831/where-are-docker-images-stored-on-the-host-machine>

Depende del storage driver.

En arch -> devicemapper

Openshift -> /var/lib/docker/image/devicemapper
  en repositories.json tenemos un json con el mapeo entre imagenes y directorios que almacenan la info (el id de la imagen que usa docker será el segundo de los que aparece)

# Bajar una imagen sin usar docker

<https://raw.githubusercontent.com/moby/moby/master/contrib/download-frozen-image-v2.sh>
