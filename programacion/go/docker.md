https://hub.docker.com/_/golang/

Para generar binarios
docker run -it golang:1.6.2-alpine /bin/sh

Cuidado con compilar binarios de go si linkan contra glibc pero intentamos usarlos en alpine (musl)

Pensar en dockerfile multistage para generar binarios
