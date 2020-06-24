https://blog.golang.org/generate

Comentarios especiales en el código para ejecutar utilidades de auto generación de código de forma sencilla

go generate

Buscará comentarios en los ficheros .go del estilo:
//go:generate goyacc -o gopher.go -p parser gopher.y

Ejecutará ese programa: goyacc -o gopher.go -p parser gopher.y


Para ver que se está ejecutando:
go generate -v -x
