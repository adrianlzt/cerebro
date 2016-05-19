https://golang.org/pkg/flag/

  var ip = flag.Int("flagname", 1234, "help message for flagname")
  fmt.Printf("hello, world: %v\n", *ip)


https://github.com/codegangsta/cli
Permite crear una cli mas completa con subcomandos, etc


# kingpin
https://github.com/alecthomas/kingpin
go get gopkg.in/alecthomas/kingpin.v2

Features para la v3: https://github.com/alecthomas/kingpin/issues/90

Permite crear tambien subcomandos de forma sencilla

Genera automáticamente bash y zsh completion

Ejemplos: https://github.com/alecthomas/kingpin/tree/master/_examples
Tipos de datos: https://github.com/alecthomas/kingpin/blob/master/values.json


var (
  debug   = kingpin.Flag("debug", "Enable debug mode.").Bool()
  timeout = kingpin.Flag("timeout", "Timeout waiting for ping.").Default("5s").OverrideDefaultFromEnvar("PING_TIMEOUT").Short('t').Duration()
  ip      = kingpin.Arg("ip", "IP address to ping.").Required().IP()
  count   = kingpin.Arg("count", "Number of packets to send").Int()
)

Flag son --cosa = valor
Arg son [cosa]

Habilitar -h como ayuda:
kingpin.CommandLine.HelpFlag.Short('h')

Si hemos usado kingpin.New() usar
app.HelpFlag.Short('h')

# Version
var (
  app_version = "NA"

	// opciones generales
	app      = kingpin.New("check_openstack", "Check different data of OpenStack")
	verbose  = app.Flag("verbose", "Have more verbose output. Twice for debug").Short('v').Counter()
	v = app.Version(app_version)
)

...
	app.VersionFlag.Short('V')

./app -V
./app --version

go run  -ldflags "-X main.app_version 1.5" *.go -V
go build -o app -ldflags "-X main.app_version 1.5" *.go
