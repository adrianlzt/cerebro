Limitar la memoria:
CONFIG SET maxmemory 100mb

En el caso de que pasemos la memoria redis devolverá a los clientes:
OOM command not allowed when used memory > 'maxmemory'.


CUIDADO! con cambiar la config en running time y luego no guardarla de forma persistente (en fichero)
