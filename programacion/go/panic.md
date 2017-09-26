https://gobyexample.com/panic
https://blog.golang.org/defer-panic-and-recover

Es una especie de excepción.
Termina el programa con una traza de donde se salió y un mensaje custom.

panic("mensaje")



Con las funciones defer y panic podemos gestionar los panic.

defer sería como el "except" de python.
Se ejecutará esa función en caso de un panic.

recover() dentro de defer obtendrá el valor que hizo panic y continua la ejecucción.


defer() funciona como un closure, tiene los valores que estén definidos cuando se defina el defer.
