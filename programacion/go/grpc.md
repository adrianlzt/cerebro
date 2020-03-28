# github.com/golang/protobuf
podemos usar sus herramientas para generar un scaffold de código a partir de ficheros .proto
hacer "make install" sobre su dir para instalar protoc-gen-go
protoc --go_out=. *.proto
  llamará a protoc-gen-go

Esto nos generará un fichero xxx.pb.go con las funciones que podemos usar para llamar al servidor gRPC que implemente esto.
Parece que esta generación solo nos genera el struct para cada message y unas funciones para obtener sus propiedades.

Si tenemos un "service" declarado en el .proto, no me egenera nada.

Tiene pinta que toca programarse las interfaces y funciones que podría usar un Server o un Client.



# google.golang.org/grpc
Implementa un sistema de llamadas remotas (RPC) usando proto buffers -> esto es gRPC

Cliente básico sin auth:
c, err := grpc.Dial("localhost:50005", grpc.WithInsecure())

