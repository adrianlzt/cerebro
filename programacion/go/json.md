https://github.com/Jeffail/gabs
libreria para facilitar el acceso a los json

# Caso simple
type Test struct {
  Host string
  Item string
}
json.Unmarshal([]byte("{\"Host\":\"hola\", \"Item\":\"pepe\"}"), &t)
json.Marshal(&t)



# Original
http://blog.golang.org/json-and-go
https://golang.org/pkg/encoding/json/
https://gobyexample.com/json

Si queremos tener una clave de json diferente al nombre de la key del struct:
type T struct {
    FieldA int    `json:"field_a"`
    FieldB string `json:"field_b,omitempty"`
}

omitempty hace que el Marshaling saque campos con valor vacío.
También podemos omitar un campo del json si ponemos: `json:"-"`
El Unmarshal pillá por defecto también el nombre del field en minúsculas

IMPORTANTE: los fields del struct deben empezar por mayúscula

Si vamos a parsear un numero es mejor usar json.Number
Esta estructura captura el valor, pero no falla si por ejemplo en vez de un número tenemos "".
A posteriori realizamos la conversión, gestionando si no se puede parsear correctamente.
Ejemplo: https://play.golang.org/p/9noIXK9imm
type User struct {
  Otro     json.Number
}
...
y,err := user.Otro.Float64()
if err != nil {
  fmt.Printf("Error parseando Otro: %v\n", err)
  y = 0.0
}


# Struct a JSON
type FileContent struct {
  LastScan time.Time
  Msg string
}
res2D := &FileContent{
    Msg:   "asd1",
    LastScan: time.Now(),
}
res2B, _ := json.Marshal(res2D)
fmt.Println(string(res2B))

Si queremos que este identado:
json.MarshalIndent(data, ", "    ")

Y a un fichero:
err = ioutil.WriteFile("/tmp/dat1", res2B, 0644)
if err != nil {
  panic(err)
}


Tambien podemos pasar un map a json:
a := make(map[string]string)
a["uno"] = "111"
a["dos"] = "222"

mijson, _ := json.Marshal(a)
fmt.Println(string(mijson))
// {"dos":"222","uno":"111"}



# JSON a struct
type FileContent struct {
  LastScan time.Time
  Msg string
}

fileRead, err := ioutil.ReadFile("/tmp/jobs_list.json") // file_read es un []byte
var prevExec FileContent
err = json.Unmarshal(fileRead, &prevExec)
if err != nil {
  panic(err)
}


Si alguno de los campos no hace match, se quedará con el valor por defecto.



Desempaquetar cuando conocemos la estructura:
https://gist.github.com/border/775526

Almacenar en una estructura tipo string:interface:
https://socketloop.com/tutorials/golang-decode-unmarshal-unknown-json-data-type-with-map-string-interface
https://play.golang.org/p/-aM7yokAHd



En prinipio para decodificar un json a un objeto de go debemos conocer
a priori el formato del json.
Las cosas que no tengan su hueco se perderán.

Otra forma es almacenarlo en un tipo genérico interface{} y luego decirle
como vamos a tratar el dato

Para generar la estructura de datos automaticamente podemos usar esta web:
https://mholt.github.io/json-to-go/


# Optional fields
    Pepe string `json:"pepe,omitempty"`
    Field int `json:",omitempty"` // si el campo se llama "Field"


# Problemas
Si tenemos algo tipo:

{
    "hosts" : {
        "hostA": {
            "cosa": 3
        },
        "hostB": {
            "cosa": 3
        }
    }
}

El tipo de dato deberia llamarse hostA, pero eso no vale, porque ese valor
es dinámico.


# Doble array

type Response1 struct {
    Page   int
    Fruits [][]string
}
res1D := &Response1{
    Page:   1,
    Fruits: [][]string{[]string{"apple", "peach", "pear"}}}
res1B, _ := json.Marshal(res1D)
fmt.Println(string(res1B))

{"Page":1,"Fruits":[["apple","peach","pear"]]}


# Escapar caracteres
https://play.golang.org/p/SJM3KLkYW-



# JSON desconocido
Idea que he tenido usando el switch para probar conversiones:

jsonReq := map[string]interface{}{}
json.Unmarshal(data, &jsonReq)

for k, v := range jsonReq {
  switch v.(type) {
  case string:
    fmt.Printf("%v: %v (string)\n", k, v.(string))
  case float64:
    fmt.Printf("%v: %v (float64)\n", k, v.(float64))
  case int:
    fmt.Printf("%v: %v (int)\n", k, v.(int))
  case map[string]interface{}:
    fmt.Printf("%v: %v (map[string]interface{})\n", k, v.(map[string]interface{}))
  default:
    fmt.Println("unknown")
  }
}

