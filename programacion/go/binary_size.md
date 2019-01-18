https://blog.filippo.io/shrink-your-go-binaries-with-this-one-weird-trick/

strip the debugging information:
go build -ldflags="-s -w" fichero.go

compress (no funciona cuando tenemos que linkarlo (cgo)?):
upx --brute binario_go
