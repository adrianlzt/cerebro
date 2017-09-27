http://www.grpc.io/
protobuf.md

Forma de comunicación entre servicios.
Mejora sobre REST HTTP+JSON
Genera automáticamente clientes y servidores en distintos lenguajes.


gRPC is a “high-performance open-source universal RPC framework.”

gRPC is an open source remote procedure call (RPC) system initially developed at Google. It uses HTTP/2 for transport, Protocol Buffers as the interface description language, and provides features such as authentication, bidirectional streaming and flow control, blocking or nonblocking bindings, and cancellation and timeouts. It generates cross-platform client and server bindings for many languages.

Ejemplos de uso:
https://about.sourcegraph.com/go/grpc-in-production-alan-shreve

En python:
https://developers.google.com/protocol-buffers/docs/pythontutorial



Uso de gRPC con una webapp y un backend Go:
https://improbable.io/games/blog/grpc-web-moving-past-restjson-towards-type-safe-web-apis
