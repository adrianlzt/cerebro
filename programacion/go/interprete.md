mirar neugram/ para hacer scripts en go

https://www.tutorialspoint.com/execute_golang_online.php
http://play.golang.org/

# go-pry
Otro repl que nos permite meter una traza tipo "breakpoint()" en python y parar ahí con una repl


# gomacro
https://github.com/cosmos72/gomacro

go get -u github.com/cosmos72/gomacro
cd $GOPATH/src/github.com/cosmos72/gomacro
go build .
go install .

Funciona bastante parecido al repl de python.
Tab para autocompletado
:help para auyuda
:env vemos lo que tenemos cargado

Tienen un concepto de generics. Son templates de código.
https://github.com/cosmos72/gomacro#generics

Ejemplo, definimos este generic (template):
template[T,U] type Pair struct { First T; Second U }

Y lo usamos como:
var pair Pair#[complex64, struct{}]

Esto nos genera una variable pair del typo struct{First complex64, Second struct{}}

Gomacro tambien puede ejecutar programas como si fuese bash, incluso lo podemos poner en el shebang
En este modo podemos ejecutar el debugger https://github.com/cosmos72/gomacro#debugger


# Gophernotes / Jupyter
https://github.com/gopherdata/gophernotes
REPL grafico



# gore
go get -u github.com/motemen/gore
go get -u github.com/nsf/gocode
go get -u github.com/k0kubun/pp
go get -u golang.org/x/tools/cmd/godoc

$ gore
:import strings

Tiene autocompletado
Permite funciones

Lo que vamos escribiendo se va metiendo en un main que va creando
Cuando escribimos cualquier funcion nueva, se ejecuta todo lo anterior que esté en el main.
Esto es una gran desventaja.

:print
  para sacar lo que hemos hecho hasta ahora en un programa .go

:clear
  borrar lo desarrollado hasta ahora

:doc expr/pkg
  godoc de la func


# gosh
https://github.com/mkouhei/gosh

cd
mkdir gocode
export GOPATH=$(pwd)/gocode
go get github.com/mkouhei/gosh

gocode/bin/gosh
