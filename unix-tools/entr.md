http://eradman.com/entrproject/

Ejecutar comandos cuando se modifique un fichero.

Ejemplo lanzando tests cuando se modifica un fichero
fd go | entr -c go test -v

-c limpia la pantalla antes de volver a lanzar
-r si tenemos un proceso que no termina (go run main.go por ejemplo), con -r lo mataremos cuando haya cambios para levantarlo de nuevo
