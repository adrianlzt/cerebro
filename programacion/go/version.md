Si usamos kingping, mirar en la sección version

http://www.atatus.com/blog/golang-auto-build-versioning/
http://stackoverflow.com/questions/11354518/golang-application-auto-build-versioning
go build -ldflags "-X main.minversion=`date -u +.%Y%m%d.%H%M%S`" service.go

Para definir una variable en cada compilacion.
Para hacer algo tipo:
./programa --version
Programa build 20160705



# Comparar versiones
https://github.com/mcuadros/go-version
version.Compare("1.0-dev", "1.0", "<")

Cuidado no nos colisione con una variable "version" global.
Importar como

semver "github.com/mcuadros/go-version"


# Version con flag

var (
  version = "0.0.0"
)

func main() {
  versionFlag := flag.Bool("version", false, "Show version")

  flag.Parse()

  if *versionFlag {
    fmt.Printf("Version: %s\n", version)
    return
  }
  ...
}


Build:
LDFLAGS=-ldflags "-X main.version=${VERSION}"
go build ${LDFLAGS} -o ${BINARY} .
