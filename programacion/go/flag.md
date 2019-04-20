Flas es para hacer: -h -param X
os.Args para acceder directamente a los argumentos

https://golang.org/pkg/flag/
https://gobyexample.com/command-line-flags

  var num = flag.Int("flagname", 1234, "help message for flagname")
  var coso = flag.String("nombreflag", "default value", "help")
  flag.Parse()
  fmt.Printf("hello, world: %v\n", *num)

  go run programa.go -nombreflag pepe -flagname 12


import os
...
os.Args[0] // Nombre del programa
os.Args[1:2] // slice con el primer y segundo argumento


Mirar cobra.md para crear una CLI

https://github.com/codegangsta/cli
Permite crear una cli mas completa con subcomandos, etc


# docopt
https://github.com/docopt/docopt.go
Definir el usage y de ahí se sacan automáticamente los parámetros


# go-flags
https://godoc.org/github.com/jessevdk/go-flags




# kingpin
https://github.com/alecthomas/kingpin
go get gopkg.in/alecthomas/kingpin.v2

Features para la v3: https://github.com/alecthomas/kingpin/issues/90

Permite crear tambien subcomandos de forma sencilla

Genera automáticamente bash y zsh completion

Ejemplos: https://github.com/alecthomas/kingpin/tree/master/_examples
Tipos de datos: https://github.com/alecthomas/kingpin/blob/master/values.json

import "gopkg.in/alecthomas/kingpin.v2"

var (
  debug   = kingpin.Flag("debug", "Enable debug mode.").Bool()
  timeout = kingpin.Flag("timeout", "Timeout waiting for ping.").Default("5s").OverrideDefaultFromEnvar("PING_TIMEOUT").Short('t').Duration()
  ip      = kingpin.Arg("ip", "IP address to ping.").Required().IP()
  count   = kingpin.Arg("count", "Number of packets to send").Int()
)
func main() {
	kingpin.Parse()
	fmt.Printf("Would ping: %s with timeout %s and count %d", *ip, *timeout, *count)
}

Flag son --cosa = valor
Arg son [cosa]

Repetir un parámetro: .Strings() .Uint8List(), etc (https://github.com/alecthomas/kingpin/blob/master/values_generated.go)

Habilitar -h como ayuda:
kingpin.CommandLine.HelpFlag.Short('h')

Si hemos usado kingpin.New() usar
app.HelpFlag.Short('h')

# Version
Sin kingping.New:
var (
  app_version = "NA"
  _ = kingpin.Version(app_version)

Con kingping.New
var (
  app_version = "NA"

  // opciones generales
  app      = kingpin.New("check_openstack", "Check different data of OpenStack")
  _ = app.Version(app_version)
  verbose  = app.Flag("verbose", "Have more verbose output. Twice for debug").Short('v').Counter()
)


func main() {
	kingpin.CommandLine.HelpFlag.Short('h')
	kingpin.CommandLine.VersionFlag.Short('V')
	kingpin.Parse()
...

./app -V
./app --version

go run  -ldflags "-X main.app_version 1.5" *.go -V
go build -o app -ldflags "-X main.app_version 1.5" *.go


# Verbose, con Sirupsen/logrus
var (
        verbose  = kingpin.Flag("verbose", "Have more verbose output. Twice for debug").Short('v').Counter()
)

func main() {
  ...
	switch *verbose {
	case 0:
		log.SetLevel(log.WarnLevel)
	case 1:
		log.SetLevel(log.InfoLevel)
	default:
		log.SetLevel(log.DebugLevel)
	}
}
