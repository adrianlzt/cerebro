Go does not have classes. However, you can define methods on struct types.
Pensar esto como los objetos de Java.


type Vertex struct {
    X, Y float64
}

func (v *Vertex) Abs() float64 {
    return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

Importante! Si tenemos que modificar alguno de los valores de "v" tendremos que pasarlo como un puntero.
Ej:
func (v Vertex) Cambia() { v.X = 10 }  // Esto cambiará la copia local, no modificará v visto desde fuera
func (v *Vertex) Cambia() { v.X = 10 }  // Esto si cambiará v globalmente

func main() {
    v := &Vertex{3, 4}
    fmt.Println(v.Abs())
}

Método Abs.
Tiene que llamarle un struct Vertex, y devuelve un float64
Tiene que ser una variable puntero lo que llame al método para poder modificar los valores de ese struct. Otra razon es no duplicar el struct, que consume memoria.
Ejemplo típico con setter y getter:

func (v *Vertex) setX(x float64) {
    v.X = x
}

func (v *Vertex) getX() float64 {
    return v.X 
}

Se pueden hacer métodos de cualquier con cualquier tipo de variable, excepto las de otros paquetes y las básicas.
Aunque con las básicas podemos hacer un truco, definirnos una nosotros:
type MyFloat float64
func (f MyFloat) Abs() float64 {}
f := MyFloat(3.23)

Estos tipos básicos no tenemos que usarlos con punteros, ya que no hay nada que modificar.



# Errores
panic: runtime error: invalid memory address or nil pointer dereference

Si en uno de los métodos creamos una variable y la pasamos por su dirección de memoria, cuando intentemos usar ese valor fuera de ese método ya no existirá.
Ejemplo:


type Cliente struct {
	user	*string
}

func (c Cliente) init() {
	cadena := "pepito"
	c.user = &cadena
	fmt.Println(*c.user) // Esto funciona
}
func main() {
	cli := Cliente{}
	cli.init()
	fmt.Println(*cli.user) // Aqui salta el panic
}
