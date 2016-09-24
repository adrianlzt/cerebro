https://gobyexample.com/pointers
https://tour.golang.org/moretypes/1

Un puntero almacena la dirección de memoria de una variable.
var p *int
  esto es un puntero a una variable de tipo int


i := 1
&i  dirección de memoria de i (esta variable será de tipo *int)
    & genera un puntero a su variable

*p  denota el valor al que apunta el puntero
Si tenemos un tipo de datos *x, para acceder al valor al que apunta usaremos *x


Pasar un puntero de una variable a una funcion
func coso(x *int) {
  *x = 3
}

coso(&i)



# Jugando con un struct de golang
var web url.URL
  variable conteniendo directamente el struct

var web *url.URL
  puntero no inicializado

web := &url.URL{}
  puntero a un struct inicializado

# Pasando un struct por referencia
https://play.golang.org/p/V2sDyaKUJS

data := Datos{inic: "inicio"}
add_fin(&data)

func add_fin(data *Datos) {
  data.fin = "fin"
}
