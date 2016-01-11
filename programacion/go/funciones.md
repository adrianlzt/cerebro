## Funciones ## 
El tipo de retorno se define al final
 
func add(x int, y int) int {
  return x+y
}
 
 
Para llamar a una función de nuestro mismo paquete no hará falta hacer nada:
add(3,4)
 
Si varios parámetros comparten el mismo tipo de dato, podemos dejar solo el último:
func add (x,y int) ...
 
Se pueden devolver cualquier número de parámetros
func swap(x, y string) (string, string) {
    return y, x
}
 
a, b := swap("hello", "world")

Si solo queremos el primer elemento: a,_ := swap(c,d)
Si solo queremos el segundo elemento: _,b := swap(c,d)
 
Se pueden declarar las variables que se van a retornar al construir la función, y ya no tendremos que decirle a return que devolvemos
func split(sum int) (x, y int) {
    x = sum * 4 / 9
    y = sum - x
    return
}


Una variable puede ser una función.
Nos sirve para poder meter funciones dentro de funciones (que de otra manera no está permitido)

funcion := func(x,y int) int {
  return x+y
}
