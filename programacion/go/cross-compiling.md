http://kelcecil.com/golang/2015/10/24/cross-compiling-in-go-1.5.html
https://coderwall.com/p/pnfwxg/cross-compiling-golang

En un mac generar un binario lixux:
GOOS=linux GOARCH=amd64 go build -o hello main.go

En linux generar mac:
GOOS=darwin GOARCH=amd64 go build/install...

Siempre poner las dos variables!
