https://github.com/urfave/cli
Una más sencilla, con ella sola como única dependencia (cobra trae un montón de dependencias)

https://github.com/spf13/cobra
https://godoc.org/github.com/spf13/cobra

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

Tambien podemos tener PersistentPreRun, PreRun, PersistentPostRun, PostRun
Pero si están definidos en un hijo, no se ejecutarán más https://github.com/spf13/cobra/pull/714


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

Definir un flag y asociarlo a viper:
PersistentFlags
	rootCmd.PersistentFlags().String("endpoint", "default", "Endpoint of the SAP Control WSDL, Eg.: http://example.com/?wsdl")
	viper.BindPFlag("endpoint", rootCmd.PersistentFlags().Lookup("endpoint"))

Las flags con "P" al final es para poder poner un shorthand:
IntP("flagname", "f", 1234, "help message")

Si las flags tiene "Var" es porque tenemos que pasarle un puntero a la variable donde debe alamcenar el resultado:
StringVarP(&Source, "source", "s", "", "Source directory to read from")


Obtener valor (Lookup nos devolverá un Flag Struct: https://github.com/spf13/pflag/blob/master/flag.go#L159):
  endpoint := viper.GetString("endpoint")

Marcar un flag como required:
rootCmd.MarkFlagRequired("region")
rootCmd.fooCmd.MarkPersistentFlagRequired("region")
  esta variante lo hace obligatorio tambien para los subcomandos


en el init() de las funciones los flags aún no tiene valor definido.
Si necesitamos ejecutar algo con las variables ya rellenas podemos usar OnInitialize (parece que me lo ejecuta siempre, aunque este en un subcomando no llamado):
func init() {
	cobra.OnInitialize(initConfig)
  ...
}
func initConfig() {...}


# Viper, configuraciones
https://godoc.org/github.com/spf13/viper

Podemos pasarle que lea un fichero de conf (JSON, YAML, HCL, etc):
	if err := viper.ReadInConfig(); err != nil {
		fmt.Println("Can't read config:", err)
		os.Exit(1)
	}

Y luego podremos acceder a sus variables con:
viper.Get("nombre")

Toda la config de viper es case insensitive (cuidado, si ponemos algo en mayúsculas en la config nos lo devolverá en minúsculas)



# Version
Añadir un comando "version" que defina el valor el la compilación:
cobra add version

vi cmd/version.go
var versionApp = "NA"

go build -ldflags "-X pdihub.hi.inet/dsmctools/dsmctools-openshift/sources/cmd.versionApp=9" -o scripts/check_openshift  sources/*.go



# Logging
Mirar klog.md

Las flags de klog parece que se pegan con las opciones de cobra.
Si ponemos -h saltarán las opciones definidas para "flag".

En cmd/root.go
import (
	...
	goflag "flag"
	flag "github.com/spf13/pflag"
)
...
var rootCmd = &cobra.Command{
	...
	PersistentPreRun: func(cmd *cobra.Command, args []string) {
		goflag.Parse()
	},
}
...
func init() {
	klog.InitFlags(goflag.CommandLine) // Registramos las flags de klog en "goflag"
	flag.CommandLine.AddGoFlagSet(goflag.CommandLine)  // Pasamos las "goflags" a pflag
}




