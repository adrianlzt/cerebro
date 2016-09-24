http://golang.org/pkg/strings/

string (por defecto '') 

var data string
a := "hola"

La cadena vacía es ""
http://stackoverflow.com/questions/18594330/the-best-way-to-test-for-an-empty-string-in-go
if len(s) > 0 { ... }
if s != "" { ... }

# Concatenar
concatenated := fmt.Sprint(chinese +" "+ english +" "+ malay)

# sustituir
https://golang.org/pkg/strings/#Replace
fmt.Println(strings.Replace("oink oink oink", "oink", "moo", -1))

# Join
strings.Joins(["a","b"], "")
"ab"

# Split
strings.Split("a,b,c", ",")
  devuelve: ["a" "b" "c"]

strings.Split("60123234","")
[6 0 1 2 3 2 3 4]

# Contains
strings.Contains("seafood", "foo")

# Multilinea
var := `muchas cosas
en varias
lineas`

# Conversiones
String -> byte array
database = []byte("block")


Byte array -> string
s := string(byteArray[:n])


int -> string
t := strconv.Itoa(123)

float -> string
https://golang.org/pkg/strconv/#FormatFloat

b := float64(4.234234)
s := strconv.FormatFloat(b,'G',2,64)

'G' es el formato ('E' for large exponents, 'f' otherwise)
  'f' -ddd.dddd, no exponent
  'E' -d.ddddE±dd
2 es el numero de decimales de resolución
64 es que es un float64


string -> float
a,err := strconv.ParseFloat("3.1415", 64)
if err != nil {
  //gestionar el error
}
