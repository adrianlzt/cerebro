https://developers.google.com/protocol-buffers/
https://github.com/google/protobuf
http://blog.codeclimate.com/blog/2014/06/05/choose-protocol-buffers/

Protocol buffers are Google's language-neutral, platform-neutral, extensible mechanism for serializing structured data – think XML, but smaller, faster, and simpler. You define how you want your data to be structured once, then you can use special generated source code to easily write and read your structured data to and from a variety of data streams and using a variety of languages – Java, C++, or Python.

messagepack.md ?


Es una forma de intercambiar datos, competencia de JSON.

Primero debemos crear una estructura de los mensajes (los ficheros .proto).
Luego usaremos esa definición para crear nuestra estructura de datos.
Para enviarlos, lo serializaremos como un array de bytes y lo enviaremos al otro extremo.

# Instalar
sudo pacman -S protobuf


# curl
http://xmeblog.blogspot.com.es/2013/12/sending-protobuf-serialized-data-using.html

file.proto:
message Person {
  required string name = 1;
  required int32 id = 2;
  optional string email = 3;
}

file.msg:
name: "adrian"
id: 4
email: "adrian@email.com"


cat file.msg | protoc --encode=myPost ./file.proto | curl -sS -X POST --data-binary @- http://hostname/api-route

cat file.msg | protoc --encode=myPost ./file.proto | curl -sS -X POST --data-binary @- http://hostname/api-route | protoc --decode=myResponse ./file.proto

