https://cbonte.github.io/haproxy-dconv/2.0/management.html#12
Debugging and performance issues


https://cbonte.github.io/haproxy-dconv/2.0/management.html#11
Respuestas sin sentido que parece que no hacen caso a los cambios.
Tal vez tenemos un proceso haproxy antiguo aún corriendo escuchando en el mismo puerto que el haproxy "bueno"?
Mirar que procesos están escuchando en el puerto y matar el que no sea el/los bueno
