https://github.com/alecthomas/gometalinter
Ejecutar un montor de linters sobre el código


https://goreportcard.com/

Pasa una serie de herramientas para dar un nota sobre la ¿calidad? del repo



# Go fmt
Corregir el formato del código
gofmt -s -w .
Lo have la extenión del vim para go.


# Go vet
examines Go source code and reports suspicious constructs

go vet github.com/blab/some


# Gocyclop
github.com/fzipp/gocyclo

Complejidad de una función. goreportcard avisa si pasa de 15

gocyclo -over 15 .


# Golint
go get -u github.com/golang/lint/golint
Corregir el estilo del código
golint .


# ineffassign
go get github.com/gordonklaus/ineffassign
variables asignadas y no usadas
Go puede que no la detecte porque se use en otra parte, pero que no tenga que ver con la asignación que hemos hecho

ineffassign



# misspell
Correct commonly misspelled words in source files
go get -u github.com/client9/misspell/cmd/misspell

misspell all.html your.txt important.md files.go

