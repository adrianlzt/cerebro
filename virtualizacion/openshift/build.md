https://docs.openshift.com/container-platform/3.5/architecture/core_concepts/builds_and_image_streams.html#source-build
https://docs.openshift.com/container-platform/3.5/dev_guide/builds/index.html
https://blog.openshift.com/override-s2i-builder-scripts/

Openshift puede construir una imagen a partir de un repositorio mediante varias técnicas: S2I (SourceStrategy), JenkinsPipelineStrategy, DockerStrategy y CustomStrategy

https://github.com/openshift/origin/blob/v1.5.0/pkg/cmd/cli/cmd/newapp.go
new-app detectará que usar bajándose y analizando el source que le hayamos pasado.
Si le decimos que use el directorio local, deberá ser un git, buscará el remote y usará eso.

Si encuentra un Dockerfile usará directamente la estrategia DockerStrategy.

Si le pasas un repo git se lo bajará localmente, lo analizará (https://github.com/openshift/origin/blob/e696f479805c2e6fe8e57c17f61d9307734dd3c3/pkg/generate/source/detector.go) y decidirá que imagen debe usar.
Mirará si existen unos ficheros con determinados nombres para decidir que leguaje se debe usar.

Contactará con el server openshift para ver que imagestream le vale.

Una vez conoce esos datos genera un template donde pone en Source el repo de git que le hayamos pasado y en Strategy, configura la SourceStrategy con la imagen que haya detectado.


# Source to image (SourceStrategy)
https://github.com/openshift/source-to-image

S2I se lanzará intentando detectar que código estamos usando en el repo, usando una imagen que pueda correr el código.


Cuando usamos BuildConfig estaremos desplegando la imagen openshift3/ose-sti-builder
Esta imagen lanza el comando: openshift-sti-build

Entrar en una imagen de build de openshift:
docker run --rm -it --entrypoint /bin/bash registry.access.redhat.com/openshift3/ose-sti-builder:v3.5.5.8

La imagen ejecutará (es su entrypoint):
/usr/bin/openshift-sti-build


Si queremos ejecutarlo a mano (no tengo claro si se puede), debemos meter un fichero con el build y luego ejecutar (https://github.com/openshift/origin/issues/13828):
docker run --rm -it -v "/var/run/docker.sock:/var/run/docker.sock" -v /dev/null:/var/run/secrets/kubernetes.io/serviceaccount/token -e BUILD="$(cat build.json)" -e BUILD_LOG_LEVEL=5 -e KUBERNETES_SERVICE_HOST=localhost -e KUBERNETES_SERVICE_PORT=8000 registry.access.redhat.com/openshift3/ose-sti-builder:v3.5.5.8 --loglevel=5

Para sacar las variables de entorno que se pasan al pod de build podemos hacer:
oc describe po test-1-build

Un ejemplo del json que se pasa: https://gist.githubusercontent.com/adrianlzt/bc2eae6cd48aa5006e5b1126d369e43c/raw/cb65b8ed1255ebf849f416a6ddf6bec2f9a260b1/gistfile1.txt
En el se especifica de donde sacar el codigo (un repo git en este caso), que la imagen se debe construir con Source2Image, la imagen base para S2I y donde subir la imagen una vez construída.


Tambien es necesario tener en /var/run/secrets/kubernetes.io/serviceaccount/token el secret para conectar contra el server. Será el builder-token-xxxx
Podemos simular que lo tenemos creando un fichero vacio
mkdir -p /var/run/secrets/kubernetes.io/serviceaccount/ && touch /var/run/secrets/kubernetes.io/serviceaccount/token

openshift-sti-build es una wrapper del comando s2i.
openshift-sti-build sabe que tiene que leer del venv BUILD, sacar de ahí los parámetros para llamar a s2i y una vez generada la imagen subirla al repositorio de imagenes especificado.

Una vez arranca el build (https://github.com/openshift/origin/blob/v1.5.0/pkg/build/builder/sti.go#L92):
Se llama al build de s2i: https://github.com/openshift/origin/blob/v1.5.0/pkg/build/builder/sti.go#L263
Para ver lo que hace mirar s2i.md









# DockerStrategy
Pasandole un Dockerfile





# start-build
Si queremos que se reahaga el build, por ejemplo porque tenemos nuevo codigo en el repo de git:
oc start-build nombre_del_bc
