## FMT (ForMaT)##
Printf("tipo %T. Valor=%v",var,var)
%T -> imprime el tipo de dato
%v -> imprime el valor del dato
%s -> imprime string
 
Println es inteligente, sabe imprimir todo lo que le pases.
Si le pasamos una string y luego unos parámetros, los imprimirá dejando un espacio de separación. Sabrá como imprimirlo sin especificarlo.
fmt.Println("hola",var1,var2)
 
Primero ejecuta las funciones pow, y por último imprime todos los valores retornados
fmt.Println(
        pow(3, 2, 10),
        "\nhola\n",
        pow(3, 3, 20),
)


## Strings ##
s := []string{"foo", "bar", "baz"}
fmt.Println(strings.Join(s, ", "))

En un array de bytes que corresponden a un string, el valor 0 es EOF



## strconv ##
Hacer casts entre tipos de datos

float64 -> string  http://golang.org/pkg/strconv/#FormatFloat
strconv.FormatFloat(e,'f',0,64)
  'f': no exponent
  0: precision digits
  64: 64 bits de variable (float64)

 
 
## Math ##
math.Pow(n,x)   n^x
math.Sqrt(a)
cmplx.Sqrt(n)  numeros complejos
rand.Intn(n)
math.Sqrt2  valor de la raiz de 2
 
 
Se pueden usar números complejos:
n = 2+3i


## Date ##
time.Now().Weekday()
time.Now().Hour()
time.Saturday == time.Friday + 1

time.Sleep(1000 * time.Millisecond)

Crean dos channels, en el primero se despierta cada 100ms. El segundo canal se activa solo una vez a los 500ms
tick := time.Tick(100 * time.Millisecond)
boom := time.After(500 * time.Millisecond)

Ambos canales envian la fecha empezando a contar en: 2009-11-10 23:00:00.0 +0000 UTC


## net/http ##

type Hello struct{}

func (h Hello) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Hello!")
}
func main() {
    var h Hello
    http.ListenAndServe("localhost:4000", h)
}


## io ##
Cuidado con estas funciones. La variable p está inicializada.
Si intentamos meter el Read en una variable nuestra tipo: var buf []byte, no funcionara
func (r rot13Reader) Read(p []byte) (n int, err error) {
        n, err = r.r.Read(p)
        return
}
