https://gobyexample.com/interfaces

El concepto es:
  definmos una interfaz con las funciones que debe cumplir un "objeto"
  luego creamos varios "objetos" con esas funciones implementadas
  pasamos uno de esos objetos como si fuese el tipo de la interfaz, en vez del tipo específico.

Mirar embedding.md o alias.md si queremos definir nuevos métodos para un tipo no local, error:
"Cannot define new methods on non-local type ..."


Ejemplo, queremos pasar una variable a una función. Si ponemos el tipo directamente tendremos que pasar esa variable exactamente.
Pero si ponemos una interfaz, podremos pasar cualquier variable que cumpla esa interfaz.
Ejemplo: https://play.golang.com/p/fDi-YcLNZuL


Una interfaz es una colección de métodos que debe cumplir quien quiera implementar esa interfaz.
Un tipo interfaz está definido por un conjunto de métodos:

type ValorAbsoluto interface {
  Abs() float64
}

Ahora puedo definir varias implementaciones de los métodos de ese interfaz:
func (f MyFloat) Abs() float64 {
  ...
}

func (v *Vertex) Abs() float64 {
  ...
}

var interfaz ValorAbsoluto
interfaz = MyFloat(-3.43)
interfaz = &Vertex{3.34, 3.12}

Si tenemos varios métodos definidos en la interfaz, para poder asignar la variable a un tipo de dato, este tipo de dato tiene que tener implementadas todas las interfaces

type Numero int

type If interface {
  metodoA() int
  metodoB() string
  metodoC() float64
}

func (i Numero) metodoA() int {
    return 10
}
func (i Numero) metodoB() string {
    return "i+10"
}
func (i Numero) metodoC() float64 {
    return float64(-3.2)
}


Las interfaces se pueden declarar en un paquete y sus implementaciones en otro.
Las interfaces pueden "heredarse".

type Reader interface {
    Read(b []byte) (n int, err error)
}

type Writer interface {
    Write(b []byte) (n int, err error)
}

type ReadWriter interface {
    Reader
    Writer
}

# Ejemplo cliente
https://play.golang.org/p/f65A9LKxLw

// Interfaz del tipo cliente
type Cliente interface {
  GetUrl() string
  GetData() []string
}

// Un tipo de cliente para github
type GithubClient struct {
}

// Otro cliente para bitbucket
type BitbucketClient struct {
}

// Si queremos que GithubClient implemente la interfaz Cliente, debemos definir las funciones GetUrl y GetData
func (c GithubClient) GetUrl() string {
  return "www.github.com"
}

func (c GithubClient) GetData() []string {
  return []string{"git","hub"}
}

// Lo mismo para BitbucketClient
func (c BitbucketClient) GetUrl() string {
  return "www.bitbucket.com"
}

func (c BitbucketClient) GetData() []string {
  return []string{"git","bit","bucket"}
}

// Creamos uno de los clientes y se lo pasamos a una funcion
func main() {
  c := BitbucketClient{}
  otrafun(c)
}

// Ahora usamos el cliente en una funcion, agnosticamente de que tipo particular sea
func otrafun(c Client) {
  fmt.Println(c.GetUrl())
  fmt.Println(c.GetData())
}




# interface como valor abstracto
Podemos usar "interface{}" cuando no sabemos que tipo de dato nos van a pasar.
Luego lo convertiremos con: var.(tipo).
Mira reflect.md

Si queremos crear un nuevo interface, dos formas:
var x interface{}  // será Type nil
x := new(interface{})  // será type *interface{}


## punteros interface{}
interface{}

Puntero de interface:
*interface{}

Si nos da el error:
invalid indirect of XXX (type interface {})
Es que estamos intentando usar *nombre con un interface{}, cuando el tipo tiene que ser *interface{}
Tal vez lo hemos puesto mal en el parámetro de la función?
func f(x interface{})  vs  func f(x *interface{})





# Problemas
panic: runtime error: invalid memory address or nil pointer dereference

Lo vi cuando creaba un httpclient usando la dirección de memoria de un struct que creaba en una función.
tiene pinta de que al salir de esa función se borraba ese objecto y la dirección de memoria apuntaba a un sitio no permitido



# Interface como tipo de dato desconocido
m := []interface{}{1, "2", 3.4}

Usando "interface{}" lo que hacemos es no especificar el tipo de dato que nos van a pasar.
Se usa típicamente en argumentos de funciones cuando nos pueden pasar varias cosas:
func ValueOf(i interface{}) Value


Un "interface{}" podemos convertirlo a un tipo de dato usando la sintaxis:
foo.(int)

Leer https://stackoverflow.com/questions/18041334/convert-interface-to-int-in-golang para entender porque no se puede hacer con:
int(foo)

Este formato, x.(T), se llama type assertion: https://golang.org/ref/spec#Type_assertions
v, ok = x.(T)

Si ok es false es que no se ha podido convertir x en el formato T



Convertir una interface{} a map (data.Interface() viene de reflect):
data.Interface().(map[interface{}]interface{})
