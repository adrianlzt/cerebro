http://www.slideshare.net/jpetazzo/docker-and-go-why-did-we-decide-to-write-docker-in-go

go build instala todas las dependencias necesarias (salvo algunas excepciones).
easy to install, test, adopt
sin dependencias
buen candidato para bootstrap
good asynchronous primitives (wait for IO, wait for processes...)
low-level interfaces (manage processes, syscalls, ...)
full development environment (go get, go doc, go test, go run...)
multiarch
sencillo



# contras
Problemas con la gestión de hilos (casi particular intentando cambiar de namespace)
https://news.ycombinator.com/item?id=14470231
Parece que se solucionó en 1.16.3
