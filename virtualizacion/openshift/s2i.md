https://github.com/openshift/source-to-image
A tool for building/building artifacts from source and injecting into docker images


Paquete AUR:
yaourt -Ss aur/openshift-source-to-image

Por lo que veo en los ejemplos las imágenes que usa como base son las de la organizacion Centos en hub docker
https://hub.docker.com/u/centos/


s2i nos permite crear una imagen docker a partir de un codigo fuente y una imagen base:

Por ejemplo, teniendo una web server escrito en python: https://github.com/sclorg/s2i-python-container/tree/master/3.5/test/setup-test-app
Ejecutamos s2i (https://github.com/openshift/source-to-image/blob/v1.1.6/cmd/s2i/main.go#L52):
s2i build https://github.com/sclorg/s2i-python-container.git --context-dir=3.5/test/setup-test-app/ centos/python-35-centos7 python-sample-app

s2i se bajará la imagen centos/python-35-centos7 usando un demonio docker local 
https://github.com/openshift/source-to-image/blob/v1.1.6/cmd/s2i/main.go#L159
  cuando se hace el describe.Config(), se solicita la info de la imagen al demonio de docker, que si no la tiene, la baja.

Esta imagen es especial, contiene scripts de s2i.
  Label.io.openshift.s2i.scripts-url: image:///usr/libexec/s2i
  PATH=/opt/app-root/src/.local/bin/:/opt/app-root/src/bin:/opt/app-root/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
  HOME=/opt/app-root/src
  BASH_ENV=/opt/app-root/etc/scl_enable
  Cmd: /usr/libexec/s2i/usage
  WorkingDir: /opt/app-root/src
  Entrypoint: container-entrypoint
  
  Usa SCL para tener python 3.5 y apache2.4. Se carga al arranar la shell

Aqui pueden elegirse dos estrategias de build distintas: sti u onbuild

# STI
https://github.com/openshift/source-to-image#build-workflow




# Onbuild
https://github.com/openshift/source-to-image#using-onbuild-images

Si estamos usando una imagen de docker que ya tiene instrucciones ONBUILD se elegirá automáticamente esta estrategia.
Las instrucciones ONBUILD serían como un sti básico. Son comandos definidos al crear la imagen base que ya se encargaran de coger el codigo y hacer el build necesario (mirar docker/onbuild.md)
Como parte final ejecutará el script "assemble" si existe.

Para definir un entrypoint podemos tener creado un script que se llame: run, start o execute
Otra opción es pasar una URL con el script de run, s2i lo cogerá y pondrá como entrypoint.

