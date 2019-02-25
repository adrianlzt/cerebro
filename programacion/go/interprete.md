mirar neugram/ para hacer scripts en go

https://www.tutorialspoint.com/execute_golang_online.php
http://play.golang.org/

# go-pry
Otro repl que nos permite meter una traza tipo "breakpoint()" en python y parar ahí con una repl

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
