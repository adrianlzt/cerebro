https://github.com/urfave/cli
Una más sencilla, con ella sola como única dependencia (cobra trae un montón de dependencias)

https://github.com/spf13/cobra

https://ovh.github.io/tat/sdk/golang-full-example/

A Commander for modern Go CLI interactions
Herramientas para crear una CLI en go de manera sencilla.
Usado por la mayoria de las CLIs en go (mirar lista en github)

Usar junto con https://github.com/spf13/viper para gestionar las configuraciones.

Instalar:
go get -v github.com/spf13/cobra/cobra


# Empezar un nuevo programa
cobra init github.com/nombre/app
cd $GOPATH/src/github.com/nombre/app
go run main.go


# Añadir comandos
Si por ejemplo queremos que nuestra app haga:
miapp list
Lo añadiremos asi:
cobra add list

Esto creara cmd/list.go

Si no queremos que el comando haga nada, porque tiene subcomandos, en el run podemos poner:
cmd.Usage()


# Subcomandos
cobra add config
cobra add XXX -p 'configCmd'
Esto añade un subcomando 'XXX' a config:
miapp config XXX
Creara otro fichero para este subcomando: cmd/create.go



# Flags
https://github.com/spf13/pflag
Tipos de flags: http://godoc.org/github.com/spf13/pflag
Los flags podran ser de dos tipos:
 - persistentes (disponibles para los subcomandos)
 - locales, solo para el comando/subcomando

Definir un flag:
PersistentFlags
	rootCmd.PersistentFlags().StringVar(&endpoint, "endpoint", "", "Endpoint of the SAP Control WSDL, Eg.: http://example.com/?wsdl")
     el valor vacio será el default
	viper.BindPFlag("endpoint", rootCmd.PersistentFlags().Lookup("endpoint"))

Obtener valor (Lookup nos devolverá un Flag Struct: https://github.com/spf13/pflag/blob/master/flag.go#L159):
  endpoint := viper.GetString("endpoint")

Marcar un flag como required:
rootCmd.MarkFlagRequired("region")





# Version
Añadir un comando "version" que defina el valor el la compilación:
cobra add version

vi cmd/version.go
var versionApp = "NA"

go build -ldflags "-X pdihub.hi.inet/dsmctools/dsmctools-openshift/sources/cmd.versionApp=9" -o scripts/check_openshift  sources/*.go
