Todo programa en Go está formado por paquetes.
La ejecución comienza por el paquete "main"
 
Comentarios: 
//
/**
*/
 
Los paquetes se definen al comienzo del fichero:
package main
 
Luego se importan otros paquetes que necesitemos:
import (
  "fmt"
  "math/rand"
)
 
O también:
import "fmt"
import "math"
 
Por convenveción, el nombre del paquete será la última parte del path de importación.
math/rand -> package rand
 
Si queremos usar la función rand, tenemos que importarla explícitamente.
NO vale hacer:
import "math"
math.rand.Intn(10)
 
La funciones (names) que exporta cada package se llaman con la primera en mayúscula
rand.Intn
math.Pi
...
 
 
En Go las cosas se declaran según se leen, es decir, de izquierda a derecha
x int
func nombre(x int) int


## Operaciones binarias ##
1<<8-1
Desplazar un 1 8 posiciones binariamente: 100000000
Y le restamos 1: 11111111
 
 var n = 1<<3
 n vale 8
 var x = n>>2
 x vale 2
