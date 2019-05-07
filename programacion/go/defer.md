https://gobyexample.com/defer
https://tour.golang.org/flowcontrol/12

Defer is used to ensure that a function call is performed later in a program’s execution, usually for purposes of cleanup.

defer closeFile(f)


Se ejecuta la función que hayamos puesto en defer cuando retorne la función donde nos encontremos.

CUIDADO! con hacer un defer objetoPuntero.Metodo()
Si antes de llegar al defer, objetoPuntero se vuelve nil, tendremos un panic.


deferred calls are executed in last-in-first-out (LIFO) order
