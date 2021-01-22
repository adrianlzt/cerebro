https://github.com/shadowmint/go-static-linking


Por defecto se generan binario estáticos.


Si alguna librería hace uso de C tendremos que compilar con esta orden:
CGO_ENABLED=0 go build  -ldflags '-s' -o TEST *.go



http://dequeue.blogspot.com.es/2015/09/compiling-go-app-that-uses-cgo-to-run.html
go build --ldflags '-extldflags "-static"' listen.go


Forzar que sea binario dinámico
Podemos añadir la lib os/user
