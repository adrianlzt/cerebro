https://gobyexample.com/defer
https://tour.golang.org/flowcontrol/12

Defer is used to ensure that a function call is performed later in a program’s execution, usually for purposes of cleanup.

defer closeFile(f)


Se ejecuta la función que hayamos puesto en defer cuando retorne la función donde nos encontremos.
