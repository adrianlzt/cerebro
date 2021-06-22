https://gobyexample.com/defer
https://tour.golang.org/flowcontrol/12

Defer is used to ensure that a function call is performed later in a program’s execution, usually for purposes of cleanup.

defer closeFile(f)


Se ejecuta la función que hayamos puesto en defer cuando retorne la función donde nos encontremos.

CUIDADO! con hacer un defer objetoPuntero.Metodo()
Si antes de llegar al defer, objetoPuntero se vuelve nil, tendremos un panic.


deferred calls are executed in last-in-first-out (LIFO) order


CUIDADO, la interpretación se hace cuando se procesa la línea:
start := time.Now()
defer fmt.Printf("tiempo ejecución: %v", time.Since(start))
Esto nos dará algunos nanosegundos

Para evitarlo podemos hacer:
defer func() { fmt.Printf("tiempo ejecución: %v", time.Since(start)) }()

