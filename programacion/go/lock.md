# Lock
https://golang.org/pkg/sync/#Mutex.Lock
https://golang.org/pkg/sync/#RWMutex.Lock
  este último solo bloquea dos escritores, pero permite varios lectores.

CUIDADO con hacer un Lock y luego salirse de la función por otro sitio sin hacer el Unlock.
Intentar siempre que usemos el Lock y defer Unlock seguido.


# Gestion de locks entre procesos
https://github.com/nightlyone/lockfile
ejemplos/lock.go




Otra lib:
https://github.com/tgulacsi/go-locking
