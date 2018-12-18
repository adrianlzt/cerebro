import "github.com/olorin/nagiosplugin"

Multilinea
import (
    "github.com/olorin/nagiosplugin"
    "math"
)


Cambiando el nombre del paquete:
import (
    log "github.com/Sirupsen/logrus"
    ...
)

De esta manera, en vez de hacer logrus.xxx hacemos log.xxx



Si queremos dividir nuestro proyecto en varios ficheros solo tenemos que hacer que el "package" sea el mismo y se tratarán como si fuese el mismo fichero: http://stackoverflow.com/a/28390584


Seguro que no queremos lo de arriba?
Import local: http://stackoverflow.com/questions/17539407/golang-how-to-import-local-packages-without-gopath

Arbol de ficheros:
myproject/
├── binary1.go
├── binary2.go
├── package1/
│   └── package1.go
└── package2.go

binary1.go:
import "./package1"



Generalmente lo que haremos es apuntar a nuestro propio repo:
main.go
import "github.com/adrianlzt/miproject/otroDir"
...
otroDir.miFunc()

otroDir/somefile.go
func miFunc()....
