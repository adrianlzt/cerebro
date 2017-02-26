go run fichero.go

Si tenemos varios ficheros:
go run file.go file2.go

Otra opción:
go run *.go

Se buscará la función main en todos ellos.


Para proyectos grandes haremos:
go build && ./program
