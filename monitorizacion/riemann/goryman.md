https://github.com/bigdatadev/goryman

# Ubuntu
apt-get install golang git

cd
mkdir gocode
export GOPATH=$(pwd)/gocode
go get github.com/bigdatadev/goryman
  # da un fallo pero parece que no es importante

Ejemplo de cliente en este directorio: go_cliente.go

go run go_client.go
