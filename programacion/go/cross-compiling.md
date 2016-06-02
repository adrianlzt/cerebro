http://kelcecil.com/golang/2015/10/24/cross-compiling-in-go-1.5.html

En un mac generar un binario lixux:
GOOS=linux GOARCH=amd64 go build -o hello main.go
