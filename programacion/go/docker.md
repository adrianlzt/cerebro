https://hub.docker.com/_/golang/

Para generar binarios
docker run -it golang:1.6.2-alpine /bin/sh

Cuidado con compilar binarios de go si linkan contra glibc pero intentamos usarlos en alpine (musl)

Si queremos reducir el tamaño mirar binary_size.md


# Multistage
https://gist.githubusercontent.com/pierreprinetti/eef186f743f31055afb47cd2b50fe3fd/raw/9d52ab93ae5c51a56fe4323712969cba03d14b7f/Dockerfile
  con modules

## alpine
FROM golang:1.10-alpine
COPY . /go/src/bitbucket.code.company-name.com.au/scm/code
WORKDIR /go/src/bitbucket.code.company-name.com.au/scm/code/
RUN go build main.go

FROM alpine:3.7
RUN apk add --no-cache ca-certificates
COPY --from=0 /go/src/bitbucket.code.company-name.com.au/scm/code/main .
CMD ["./main"]

## scratch
FROM golang:1.10
WORKDIR /go/src/bitbucket.code.company-name.com.au/scm/code
COPY ./ ./
RUN CGO_ENABLED=0 go build -a -installsuffix cgo -o /dist/main .

FROM scratch
COPY --from=0 /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=0 /go/src/bitbucket.code.company-name.com.au/scm/code/dist/main /
ENTRYPOINT ["/main"]


## distroless
https://github.com/GoogleContainerTools/distroless#examples-with-docker

FROM golang:1.8 as build
WORKDIR /go/src/app
COPY . .
RUN go-wrapper download   # "go get -d -v ./..."
RUN go-wrapper install

FROM gcr.io/distroless/base
COPY --from=build /go/bin/app /
CMD ["/app"]
