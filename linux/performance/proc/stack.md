Kernel stack actual del proceso.
Nos puede servir para ver en que syscall está un proceso bloqueado.

Otra forma es enganchar con strace, pero es más invasiva, aunque muchas veces puede estar variando en un ciclo, por lo que hacer "pooling" a este fichero tal vez no sea útil.
