http://golang.org/pkg/strings/

string (por defecto '') 

var data string
a := "hola"

vacia? http://stackoverflow.com/questions/18594330/the-best-way-to-test-for-an-empty-string-in-go
if len(s) > 0 { ... }
if s != "" { ... }

# Concatenar
concatenated := fmt.Sprint(chinese +" "+ english +" "+ malay)

# Split
strings.Split("a,b,c", ",")
  devuelve: ["a" "b" "c"]

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
