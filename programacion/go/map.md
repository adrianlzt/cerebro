https://golang.org/ref/spec#MapType
https://blog.golang.org/go-maps-in-action

Une keys a valores

map([TIPO_DATO_CLAVE]TIPO_DATO_VALOR)

mapa := make(map[string]int)
mapa["uno"]=1
fmt.Println(mapa["uno"])

var mapa = map[string]Punto {
  "Bell": {3.4, 45.3},
  "Google": {34.23,45.4},
}
Hace falta esa coma para este literal para poder poner una nueva línea

m["key"] = valor
delete(m,"key")  //borra la pareja clave-valor
value,exists = m["key"]  //existe=false, el valor estará al por defecto del tipo de dato (int=0, string='', etc)
if !exists {
  fmt.Errorf("No existe la clave key\n")
}
fmt.Printf("m->key = %v", value)

if _,exists := mapa[clave]; !exists {
  fmt.Errorf("No existe la clave\n")
}



pepe := make(map[string][]int)
pepe["maria"] = append(pepe["maria"], 5)
pepe["maria"]
[]int{
 5,
}


Si hacemos len(pepe) nos dará el número de claves que tenemos


# Iterador
    kvs := map[string]string{"a": "apple", "b": "banana"}
    for k, v := range kvs {
        fmt.Printf("%s -> %s\n", k, v)
    }

# Copiar map
cv_copy := make(map[string]string)
for k,v := range cv {
    cv_copy[k] = v
}

Si metemos maps en un array estamos pasando su referencia.


# Arrays
CUIDADO al meter maps en arrays, porque se copia la referencia, no el valor, por lo que si modificamos a posteriori el array se modificará también el valor que está almacenado en el array.

Ejemplo:
http://play.golang.org/p/S3wj1EJGjH

Si queremos copiar el valor usar la copia de maps que pongo más arriba.

# Mapa de mapa
make(map[string]map[int]UnStruct)


# Flatten
Convertir un map en un array
flatten.go


# Obtener arrays de keys, values, o key-values
https://www.dotnetperls.com/convert-map-slice-go

// Convert map to slice of keys.
keys := []string{}
for key, _ := range m {
    keys = append(keys, key)
}

// Convert map to slice of values.
values := []string{}
for _, value := range m {
    values = append(values, value)
}

// Convert map to slice of key-value pairs.
pairs := [][]string{}
for key, value := range m {
    pairs = append(pairs, []string{key, value})
}

// Convert map to flattened slice of keys and values.
flat := []string{}
for key, value := range m {
    flat = append(flat, key)
    flat = append(flat, value)
}



// Declarar un diccionario con distintos tipos de datos, subdict, etc
params := map[string]interface{}{
	"EXTERNAL_USER_NAME": "mon",
	"MONITOR_NAME": map[string]string{
		"MS_NAME":   "SAP CCMS Monitor Templates",
		"MONI_NAME": "Operating System",
	},
}


// Acceder a un valor subdict usando interfaces
Tenemos que convetir el tipo "interface{}" al tipo que sepamos que es para poder extraer el dato.
data := map[string]interface{} {
  "foo": map[string]interface{} {
     "bar": "xxx",
  },
}

fmt.Println(data["foo"].(map[string]interface{})["bar"])
