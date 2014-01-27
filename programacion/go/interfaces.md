Un tipo interfaz está definido por un conjunto de métodos:

type ValorAbsoluto interface {
  Abs() float64
}

Ahora puedo definir varias implementaciones de los métodos de ese interfaz:
func (f MyFloat) Abs() float64 {}
func (v *Vertex) Abs() float64 {}

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
