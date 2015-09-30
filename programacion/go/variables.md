## Variables ##
Las variables tienen que tener un tipo declarado. Lo bueno es que con que lo declares en un sitio, ese tipo se propagará.
Ejemplo, si una función dice que devuelve un int, podremos hacer directamente:
n = funcion(parametro)
n se declara automáticamente como int, porque viene dado por el tipo de valor que retorna la función.

Variable nula: nil
 
Se declaran:
var var1 TIPO
var var1,var2,var3 TIPO
 
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
 
# Constantes
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

# Arrays. Go le llama 'Slices'. Un 'slice' apunta a un array y tiene un tamaño
http://golang.org/doc/articles/slices_usage_and_internals.html
p := []int{1,2,3,4}
p[0] = 1
len(p) = 4
fmt.Println lo muestra [1 2 3 4]
p[1:3] = [2 3]
p[2:2] = null

Se pueden crear arrays con un tamaño máximo
b := make([]int, 2, 5)  Array con capacidad para 5 elementos, inicializado con dos ceros
cap(b): capacidad de b
b[3] = 3  da error, los valores se meten con append.
b = append(b,3)

# Maps
Une keys a valores

map([TIPO_DATO_CLAVE]TIPO_DATO_VALOR)

mapa := make(map[string]int)
mapa["uno"]=1
fmt.Println(mapa["uno"])

var mapa = map[string]Punto {
  "Bell": {3.4, 45.3},
  "Google": {34.23,45.4},
}
Hace falta esa coma para este literal para poder poner una nueva línea

m["key"] = valor
delete(m,"key")  //borra la pareja clave-valor
valor,existe = m["key"]  //existe=false, el valor estará al por defecto del tipo de dato (int=0, string='', etc)
