## Variables ##
Las variables tienen que tener un tipo declarado. Lo bueno es que con que lo declares en un sitio, ese tipo se propagará.
Ejemplo, si una función dice que devuelve un int, podremos hacer directamente:
n = funcion(parametro)
n se declara automáticamente como int, porque viene dado por el tipo de valor que retorna la función.

Las variables siempre tienen un valor, 0 para los números, "" para las string, nil para los struct, etc
Variable nula: nil
Un "truco" para distinguir una variable vacía de una no inicializada es usar un puntero. Un caso típico es cuando parseamos un fichero de configuración (unmarshal) y queremos saber si nos han dado ese valor o no han definido nada.

Se declaran:
var var1 TIPO
var var1,var2,var3 TIPO

tmp := make([]int, len(arr)) // para mas sobre arrays ir a arrays.md

Si las inicializamos no hace falta decir el tipo:
var var1,var2,var3 = 4,true,"bla"

Dento de una función (func) podemos usar el short assignment statement := (para evitar poner 'var' al inicio)
var1,var2,var3 := 2, "hola", true

Si queremos forzar un tipo de dato
z := float64(3)


Podemos usar una estructura especial dentro del package, pero fuera de las funciones para definir las variables:
var (
  var1 int = 3
  var2 complex128 = cmplx.Sqrt(-5 + 12i)
  var 3 = "cadena"
)

Tipos:
string (por defecto '')  http://golang.org/pkg/strings/
bool (false, true) (por defecto a false)
int (por defecto =0)
int  int8  int16  int32  int64
uint uint8 uint16 uint32 uint64 uintptr
byte // alias for uint8
rune // alias for int32. represents a Unicode code point
float32 float64
complex64 complex128  http://golang.org/pkg/math/cmplx/

Tenemos binarios y octales
0b100
080

1_000_000 es l mismo que 1000000

También hay notación exponencial
1000000000 = 1e9



# Constantes
números, strings o booleanos (https://groups.google.com/forum/#!topic/golang-nuts/xUaDMciyB5Q)

Pueden definirse en el package o dentro de funciones
const Pi = 3.14

Pueden ser enormes: const Big = 1 <<100

Se pueden definir con su estructura:
const (
  Big = 342534
  Small = 3
)

# Struct
type Punto struct {
  X int
  Y int
}

var punto Vertex = Vertex{1,1}
v := Punto{4, 2}
v.X = 4
v = var Vertex{X:1}  //Y=0
v = var Vertex{}  //X=0 y Y=0

# Punteros
p := Vertex{1, 2}
q := &p
q.X = 1e9

Puntero a estructura. Iniciado a 0
n := new(Vertex)
var n *Vertex = new(Vertex)
n.X = 3
fmt.Println(n) -> &{3 0}



# Scope
Si una variable se declara dentro de una función, su scope es solo esa función.

Una variable declarada fuera de una función es visisble para todo el package (global).

Cuidado con declarar dentro de una función una variable con el mismo nombre que una global. Se creará una nueva variable.
Ejemplos: variables_scope.go



# Visibilidad
Que el nombre comience por una letras mayúscula es lo que marca la visibilidad de las variables/funciones entre distintos paquetes.



# Vida de una variable
La variable será válida (y no eliminada por el garbage collector) mientras esté referenciada.
Por ejemplo, es válido declarar una variable en una función y devolver el puntero de esa variable.
Ejemplo (https://play.golang.com/p/c9EZTRuF9U5)
func test() *int {
	a := 3
	return &a
}
func main() {
	fmt.Printf("Numero: %v\n", *test())
}
