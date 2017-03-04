Mirar cobra.md para un programa que nos ayuda a crear una CLI.



Ejemplo basico
cd $GOPATH/src/
mkdir -p github.com/nuestrouser/app
cd github.com/nuestrouser/app

echo '''package main

import "fmt"

func main() {
  fmt.Println("hello")
}
'''> main.go
