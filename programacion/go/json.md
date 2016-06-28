https://github.com/Jeffail/gabs
libreria para facilitar el acceso a los json


# Original
http://blog.golang.org/json-and-go
https://golang.org/pkg/encoding/json/

Si queremos tener una clave de json diferente al nombre de la key del struct:
type T struct {
    FieldA int    `json:"field_a"`
    FieldB string `json:"field_b,omitempty"`
}


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

