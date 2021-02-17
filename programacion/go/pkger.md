A partir de go 1.16 hay un paquete en la librería estandar para esto
https://golang.org/pkg/embed/



https://github.com/markbates/pkger

tool for embedding static files into Go binaries


Ejemplo Makefile
https://github.com/cdreier/1chatroom/blob/master/Makefile


Al ejecutar "pkger" mira las llamadas a pkger.Dir(), etc y lo empaqueta en pkger.go
