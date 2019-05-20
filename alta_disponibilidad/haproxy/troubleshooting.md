https://cbonte.github.io/haproxy-dconv/2.0/management.html#12
Debugging and performance issues


https://cbonte.github.io/haproxy-dconv/2.0/management.html#11
Respuestas sin sentido que parece que no hacen caso a los cambios.
Tal vez tenemos un proceso haproxy antiguo aún corriendo escuchando en el mismo puerto que el haproxy "bueno"?
Mirar que procesos están escuchando en el puerto y matar el que no sea el/los bueno


# Profiling
Podemos activar el profiling:
global
  profiling.tasks on

Esto nos permite sacar más detalles de tiempos y uso de cpu de una llamada en concreto.
Tendremos que cambiar el logformat para mostrarlo
Mirar ejemplo en https://www.haproxy.com/blog/haproxy-1-9-has-arrived/



# HTTP request/response muy grande
If an HTTP request is larger than (tune.bufsize - tune.maxrewrite), haproxy will return HTTP 400 (Bad Request) error.
Similarly if an HTTP response is larger than this size, haproxy will return HTTP 502 (Bad Gateway)

Tuneable con tune.bufsize
Incrementarlo aumenta el consumo de memoria de cada conex, por lo que tendremos que bajar maxconn.
