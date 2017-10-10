https://docs.docker.com/engine/userguide/eng-image/multistage-build/
https://blog.alexellis.io/mutli-stage-docker-builds/

La idea es un Dockerfile con varios "FROM".
Generalmente usamos el primer FROM para compiarl el programa y un segundo FROM con una imagen ligera (alpine, por ejemplo) donde copiaremos el binario generado en la primera imagen.
De esta manera podemos usar una imagen con todas las herramientas de build y no tener que preocuparnos en limpiar, solo cogeremos de esta primera imagen los resultados del build.

La "magía" está en:
COPY --from=0 /go/src/github.com/alexellis/href-counter/app .

Tambien se pueden nombrar cada stage:
FROM xxx:xx as builder
Y usaremos "--from=builder"


FROM golang:1.7.3
WORKDIR /go/src/github.com/alexellis/href-counter/
RUN go get -d -v golang.org/x/net/html
COPY app.go .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=0 /go/src/github.com/alexellis/href-counter/app .
CMD ["./app"]


Un ejemplo para una app web.
Primer stage para compilar el sass a css.
Luego, junto con este css y el javascript hacer un build comprimido para prod.
La última copia el build generado en una imagen alpine para usar este container como artefacto final.


# Problemas / limitaciones
No muy buena solución si tenemos que hacer un container tambien de "dev" que corra la app.
Porque el de "dev" necesitará también los ficheros para correr la app.
Algún tipo de limitaión a la hora de compartir ficheros?
