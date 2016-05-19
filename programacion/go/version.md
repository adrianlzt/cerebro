Si usamos kingping, mirar en la sección version

http://www.atatus.com/blog/golang-auto-build-versioning/
http://stackoverflow.com/questions/11354518/golang-application-auto-build-versioning
go build -ldflags "-X main.minversion=`date -u +.%Y%m%d.%H%M%S`" service.go

Para definir una variable en cada compilacion.
Para hacer algo tipo:
./programa --version
Programa build 20160705
