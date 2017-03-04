https://github.com/spf13/cobra

A Commander for modern Go CLI interactions

Herramientas para crear una CLI en go de manera sencilla.

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


# Subcomandos
cobra add config
cobra add create -p 'configCmd'
Esto añade un subcomando create a config:
miapp config create
Creara otro fichero para este subcomando: cmd/create.go
