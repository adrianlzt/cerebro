https://github.com/openshift/source-to-image

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
