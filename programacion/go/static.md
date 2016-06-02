Por defecto se generan binario estáticos.


Si alguna librería hace uso de C tendremos que compilar con esta orden:
CGO_ENABLED=0 go build  -ldflags '-s' -o TEST *.go
