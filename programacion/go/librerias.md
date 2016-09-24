https://golang.org/pkg/fmt/
http://go-search.org/
https://golanglibs.com
  para buscar librerias

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

# Formatos para imprimir
%v  the value in a default format
  when printing structs, the plus flag (%+v) adds field names
%#v a Go-syntax representation of the value
%T  a Go-syntax representation of the type of the value
%%  a literal percent sign; consumes no value
%t	the word true or false
%b	base 2
%c	the character represented by the corresponding Unicode code point
%d	base 10
%o	base 8
%q	a single-quoted character literal safely escaped with Go syntax.
%x	base 16, with lower-case letters for a-f
%#x lo pone como 0xAAAA
%X	base 16, with upper-case letters for A-F
%U	Unicode format: U+1234; same as "U+%04X"
%b	decimalless scientific notation with exponent a power of two,
	in the manner of strconv.FormatFloat with the 'b' format,
	e.g. -123456p-78
%e	scientific notation, e.g. -1.234456e+78
%E	scientific notation, e.g. -1.234456E+78
%f	decimal point but no exponent, e.g. 123.456
%F	synonym for %f
%g	%e for large exponents, %f otherwise
%G	%E for large exponents, %F otherwise
%s	the uninterpreted bytes of the string or slice
%q	a double-quoted string safely escaped with Go syntax
%x	base 16, lower-case, two characters per byte
%X	base 16, upper-case, two characters per byte
%p	base 16 notation, with leading 0x

The default format for %v is:

bool:                    %t
int, int8 etc.:          %d
uint, uint8 etc.:        %d, %x if printed with %#v
float32, complex64, etc: %g
string:                  %s
chan:                    %p
pointer:                 %p

For compound objects, the elements are printed using these rules, recursively, laid out like this:

struct:             {field0 field1 ...}
array, slice:       [elem0  elem1 ...]
maps:               map[key1:value1 key2:value2]
pointer to above:   &{}, &[], &map[]

%f     default width, default precision
%9f    width 9, default precision
%.2f   default width, precision 2
%9.2f  width 9, precision 2
%9.f   width 9, precision 0


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
