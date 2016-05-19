community/intellij-idea-community-edition + plugin
/usr/bin/idea.sh

# Plugin Go
https://plugins.jetbrains.com/plugin/?id=5047
Se puede instalar desde la gestion de plugins automaticamente buscando por "Go"

Si usamos gvm el GO DSK sería algo como: /home/adrian/.gvm/gos/go1.6


## Como empezar
https://github.com/go-lang-plugin-org/go-lang-idea-plugin/wiki/v1.0.0-Setup-initial-project

Crear un proyecto y meter un fichero main.go (parece que necesita que tenga este nombre):
package main

import "fmt"

func main() {
	fmt.Printf("Holaaaa\n")
}


## Build
Si queremos conservar el build, en las configuraciones de run tendremos que especificar un directorio de output


## Debug
Si queremos debugear tendremos que entrar hasta el menu de conf, si no, no funciona.
Run -> Debug -> Edit configurations
Ahí seleccionamos que ficheros queremos debugear y pinchamos sobre "Debug"

A veces parece que sigue fallando. Cerrar el fichero y volverlo a abrir.
