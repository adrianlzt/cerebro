Borrar un paquete instalado con go get
go clean -i github.com/nsf/gocode...

Esto borrará los build y binarios.
Luego tendremos que borrar a mano el $GOPATH/src/github.com/nsf/gocode
Las dependencias no se borrarán

Hay un -r, pero borraría cosas de más (librerias del sistema)
Opción -n para hacer dry-run y ver que va a hacer el clean.
