http://golang.org/pkg/strings/

string (por defecto '') 

var data string
a := "hola"

vacia? http://stackoverflow.com/questions/18594330/the-best-way-to-test-for-an-empty-string-in-go
if len(s) > 0 { ... }
if s != "" { ... }


String -> byte array
database = []byte("block")


Byte array -> string
s := string(byteArray[:n])
