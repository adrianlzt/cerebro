https://blog.filippo.io/shrink-your-go-binaries-with-this-one-weird-trick/

strip the debugging information:
go build -ldflags="-s -w" fichero.go

compress (no funciona cuando tenemos que linkarlo (cgo)?):
upx --brute binario_go


# Weight
https://medium.com/@jondot/a-story-of-a-fat-go-binary-20edc6549b97
go get github.com/jondot/goweight

Programa para analizar que se está llevando el espacio de un binario go

cd proyecto/
goweight

Tal vez tenemos que apuntar al paquete al que hacemos build, por ejemplo en telegraf:
goweight ./cmd/telegraf
