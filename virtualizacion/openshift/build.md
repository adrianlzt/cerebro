https://docs.openshift.com/container-platform/3.5/architecture/core_concepts/builds_and_image_streams.html#source-build
https://docs.openshift.com/container-platform/3.5/dev_guide/builds/index.html


Openshift puede construir una imagen a partir de un repositorio mediante varias técnicas: S2I, pipeline, docker y custom

new-app detectará que usar bajándose y analizando el source que le hayamos pasado.
https://github.com/openshift/origin/blob/e696f479805c2e6fe8e57c17f61d9307734dd3c3/pkg/generate/source/detector.go
Mirará si existen unos ficheros con determinados nombres para decidir que leguaje se debe usar.



# Docker build
Pasandole un Dockerfile


# Source to image
https://github.com/openshift/source-to-image

S2I se lanzará intentando detectar que código estamos usano en el repo, usando una imagen que pueda correr el código.


Cuando usamos BuildConfig estaremos desplegando la imagen openshift3/ose-sti-builder
Esta imagen lanza el comando: openshift-sti-build


Entrar en una imagen de build de openshift:
docker run --rm -it --entrypoint /bin/bash openshift3/ose-sti-builder:v3.5.5.8

La imagen ejecutará:
/usr/bin/openshift-sti-build


Si queremos ejecutarlo a mano (no tengo claro si se puede), debemos meter un fichero con el build y luego ejecutar (https://github.com/openshift/origin/issues/13828):
BUILD_LOG_LEVEL=5 KUBERNETES_SERVICE_HOST=localhost KUBERNETES_SERVICE_PORT=8000 BUILD=$(cat build.json) ./openshift-sti-build --loglevel=5


https://gist.github.com/adrianlzt/f35568842ff54a48967bde690199e2b1

Otro ejemplo: https://gist.github.com/yuvipanda/569c7d0c3967732b4d1688ad6ac89172

Podemos ver el YAML del build desde la interfaz web o con:
oc export builds/NOMBRE



Las imagenes generadas tendran
Entrypoint container-entrypoint
Cmd /usr/libexec/s2i/run

El container-entrypoint es:
#!/bin/bash
exec "$@"

run parece que depende de que haya detectado el build que queremos arrancar.
Para python:3.5 por ejemplo será este script:
https://github.com/sclorg/s2i-python-container/blob/master/3.5/s2i/bin/run

Intentará arrancar buscando ficheros, variables de entorno, etc.
Si tenemos gunicorn instalado, podemos poner un fichero que se llame wsgi.py para que arranque
Lo arrancará en el puerto 8080


Ejemplo de app simple con http: https://github.com/adrianlzt/openshift_python_sample_app.git
Ejecutar con:
oc new-app https://github.com/adrianlzt/openshift_python_sample_app.git

No crea la ruta, la podemos crear con:
oc expose svc/nombreapp



# start-build
Si queremos que se reahaga el build, por ejemplo porque tenemos nuevo codigo en el repo de git:
oc start-build nombre_del_bc
