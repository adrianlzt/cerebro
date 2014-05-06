Un programa carga mucho el disco porque está escribiendo constántemente al log.
Borrar el fichero de log y crear un enlace que apunte a /dev/null

Otra opción sería redireccionarlo a una particion en memoria /dev/shm o /run/shm

Si hacemos esto en un programa en ejecución el file descriptor se mantendrá abierto y seguirá consmiendo espacio.
