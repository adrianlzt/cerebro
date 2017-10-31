https://blog.cloudflare.com/the-sad-state-of-linux-socket-balancing/amp/

Modos de balancear carga entre distintos procesos.
El artículo intenta incidir en que distribuir la carga entre varios procesos es bueno, pero no explica por que.
Mi idea es que si se reusa un proceso tal vez podamos aprovechar ciertos caches de la CPU y cambios de contexto.

# single socket, sigle proc
El básico


# sigle socket, multiple workers
Por defecto en nginx.
Varios workers peleando por hacer "accept()".
Cola LIFO
Un worker se comerá la mayor parte de la carga
Mejor latencia (constante entre peticiones)


# separate socket for each worker
Usando SO_REUSEPORT
Cola FIFO
Distribución de la carga repartida entre los workers
Peor latencia, igual media que el caso anterior, pero con valores más dispares
