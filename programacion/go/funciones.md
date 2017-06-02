## Funciones ## 
mirar anonymous_functions.md

El tipo de retorno se define al final

Si empiezan por mayúscula se exportan (se pueden llamar desde fuera). Con minúscula son de uso interno.
 
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


Si vemos algo tipo:
func (f MyFloat) Abs() float64 {}
Es una interfaz



# Named return values
http://golangtutorials.blogspot.com.es/2011/06/return-values-from-go-functions.html

Damos un nombre a las variables de retorno, las poblamos y al final llamamos simplemente a return sin parametros.

func MySqrt2(f float64) (ret float64, err error) {
    if (f < 0) {
        //then you can use those variables in code
        ret = float64(math.NaN()) 
        err = errors.New("I won't be able to do a sqrt of negative number!")
    } else {
        ret = math.Sqrt(f)
        //err is not assigned, so it gets default value nil
    }
    //automatically return the named return variables ret and err
    return
}


# vararg / splash / llamar una funcion con un array
http://stackoverflow.com/questions/17555857/go-unpacking-array-as-arguments

func my_func( args ...int) int {

arr := []int{2,4}
sum := my_func(arr...
