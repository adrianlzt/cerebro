http://golang.org/pkg/strings/
https://blog.golang.org/strings

string (por defecto "")
inmutables
Si queremos trabajar con las letras que la forman, mirar runes más abajo

var data string
a := "hola"

La cadena vacía es ""
http://stackoverflow.com/questions/18594330/the-best-way-to-test-for-an-empty-string-in-go
if len(s) > 0 { ... }
if s != "" { ... }

# Concatenar
concatenated := chinese +" "+ english +" "+ malay

# sustituir
https://golang.org/pkg/strings/#Replace
fmt.Println(strings.Replace("oink oink oink", "oink", "moo", -1))

https://golang.org/pkg/strings/#NewReplacer
Nos permite definir un diccionario de substituciones y aplicarlas en un solo comando.
strings.NewReplacer(
    "G", "C",
    "C", "G",
    "T", "A",
    "A", "U",
  ).Replace(input)


# Join
strings.Join(["a","b"], "")
"ab"

# Cortar
"cadena"[2:5] -> "den"

# Prefix / Suffix
HasPrefix(str, prefijo)
HasSuffix(string, sufijo)

# Trim / strip
strings.TrimPrefix("Goodbye,, world!", "Goodbye,")
", world!"

strings.TrimSpace(a)
borra caracteres en blanco, tabs y new lines.
TrimSpace returns a slice of the string s, with all leading and trailing white space removed, as defined by Unicode.


# Recorrer
s := "cadena"
for i:=0; i<len(s); i++ {
   fmt.Printf("%s", s[i])  // imprime el valor del uint8
}



# Split / Fields
strings.Split("a,b,c", ",")
  devuelve: ["a" "b" "c"]

strings.Split("60123234","")
[6 0 1 2 3 2 3 4]

strings.Fields("  foo bar  baz   ")
["foo", "bar", "baz"]

len(strings.Split("", ","))
1


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

string -> int
strconv.Atoi("987")

string -> int32
strconv.ParseInt("987", 10, 32)

string -> uint
strconv.ParseUint("987", 10, 32)

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


# Runes
string -> runes
m := []rune("cadena")
m[1] = 'p'

rune('a')  // int32



# Repetir
https://stackoverflow.com/questions/33139020/can-golang-multiply-strings-like-python-can

strings.Repeat("-", 20)


# Escape
https://yourbasic.org/golang/multiline-string/

No se pueden escapar las ` si estamos en un backtick escape
