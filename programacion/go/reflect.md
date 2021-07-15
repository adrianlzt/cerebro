https://golang.org/pkg/reflect/
https://golang.org/doc/articles/laws_of_reflection.html

Para convertir de string a numeros mirar strconv.md

Para convertir un named type a su tipo original:
  type pepe string
  var p pepe
  unaString := string(p)

Package reflect implements run-time reflection, allowing a program to manipulate objects with arbitrary types. 

Con TypeOf obtendremos los "metadatos". Por ejemplo, de un struct obtendremos el nombre de los campos y el tipo.
Con ValueOf obtendremos los valores.

Ejemplo.
Tenemos un interface{} (m) que sabemos que es un slice, cuyo primer elemento es un struct.

slice := reflect.ValueOf(m) // Obtenemos los valores del interface{} m
typ := reflect.TypeOf(slice.Index(0).Interface()) // Convertimos el primer elemento del slice m en una interfaz y obtenemos sus "metadatos"
val := reflect.ValueOf(slice.Index(0).Interface()) // Lo mismo pero obtenemos los valores

Tenemos una func para chequear si algo es zero
reflect.ValueOf("").IsZero()

Si es un tipo Reflect:
variable.Interface().(foo)


if typ.Kind() != reflect.Struct { // Comprobamos que estamos cogiendo un struct
  fmt.Printf("%v type can't have attributes inspected\n", typ.Kind())
}

// Vamos navegando el struct sacando el nombre del campo, el tipo de dato y el valor
for i := 0; i < typ.NumField(); i++ {
  p := typ.Field(i)
  v := val.Field(i)
  if !p.Anonymous {
    fmt.Printf("Name: %+v   Type: %+v   Val: %+v\n\n", p.Name, p.Type, v)
  }
}
timestampData := val.FieldByName("Data") // Cogemos del struct el compo "Data"
timestamp := binary.BigEndian.Uint32(timestampData.Bytes()[0:4]) // Lo convertimos a un array de bytes y cogemos los 4 primeros para convertirlos en un uint32


## Iterar por un interface{} que sabemos que implementa un map debajo
iter := reflect.ValueOf(m).MapRange()  // panic si no es un Map
for iter.Next() {
	k := iter.Key()
	v := iter.Value()
	...
}


# Assertions / convertir de tipo
https://tour.golang.org/methods/15
Si intentamos convertir algo que no es posible dará un panic

t, ok := i.(T)
  esto es para convertir interface{} a un tipo. Debera matchear con lo que se encuentre en interface, si no fallará. Mirar el "switch" de abajo para este tipo de conversiones.

Si i es *interface{} pondremos:
(*i).(T)

Si omitimos el valor de retorno "ok" (f = i.(float64)), y no se puede convertir, dará un panic.

No podemos convertir una interface{} con un integer en float64 con un type assertion.
Tendremos que hacerlo asi: float64(i.(float64))

Pero si "i" es una interface{} y tiene una string, dará un panic.


Convertir usanto "reflect":
https://stackoverflow.com/questions/20767724/converting-unknown-interface-to-float64-in-golang

import "reflect"

var floatType = reflect.TypeOf(float64(0))

func getFloat(unk interface{}) (float64, error) {
    v := reflect.ValueOf(unk)
    v = reflect.Indirect(v)
	  if !v.Type().ConvertibleTo(floatType) {
        return 0, fmt.Errorf("cannot convert %v to float64", v.Type())
    }
    fv := v.Convert(floatType)
    return fv.Float(), nil
}


# Truco convertir con switch
https://tour.golang.org/methods/16

	switch v := col.(type) {
	case string:
		fields[colName] = v
	case []byte:
		fields[colName] = string(v)
	case int64, int32, int:
		fields[colName] = fmt.Sprintf("%d", v)
	default:
		log.Println("hana: unknown data type to covert field", colName)
	}
