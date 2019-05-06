https://golang.org/ref/spec#MapType
https://blog.golang.org/go-maps-in-action

Une keys a valores
Hace falta inicializarlo (si solo hacemos "var x map..." nos dirá "assignment to entry in nil map")

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
mapa := make(map[string]map[int]UnStruct)

El "submapa" no estará inicializado, por lo que no podremos hacer:
mapa["asda"][23] = ...

Tendremos que inicializarlo, podemos hacerlo chequeando si ya lo está:
if _,ok := mapa["adas"]; !ok {
  mapa["adas"] = make(map[int]UnStruct)
}
mapa["adas"][23] = ...



# Flatten
Convertir un map en un array
flatten.go


# Obtener arrays de keys, values, o key-values
https://www.dotnetperls.com/convert-map-slice-go

// Convert map to slice of keys.
// CUIDADO el orden de las keys que metemos en el array es random
keys := []string{}
for key := range m {
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


// Acceder a un map en orden de su key
https://stackoverflow.com/questions/23330781/sort-go-map-values-by-keys

A partir de go 1.12 si hacemos un print si estará ordenado, pero si iteramos estará desordenado apropósito.

func sortedMapIntString(m map[int]string, f func(k int, v string)) {
    var keys []int
    for k, _ := range m {
        keys = append(keys, k)
    }
    sort.Ints(keys)
    for _, k := range keys {
        f(k, m[k])
    }
}

sortedMapIntString(m,
        func(k int, v string) { fmt.Println("Key:", k, "Value:", v) })



# Ordenar time.Time como key de un mapa
sort.Slice(timeSlice, func(i, j int) bool { return timeSlice[i].Before(timeSlice[j])})

mapa := map[time.Time]int{}
mapa[time.Now()] = 1
mapa[time.Now().Add(2*time.Second)] = 2
mapa[time.Now().Add(4*time.Second)] = 4
mapa[time.Now().Add(6*time.Second)] = 6

keys := []time.Time{}
for k, _ := range mapa {
  keys = append(keys, k)
}

sort.Slice(keys, func(i, j int) bool {
  return keys[i].Before(keys[j])
})

for _, v := range keys {
  fmt.Printf("%v -> %v\n", v, mapa[v])
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



# Funciones
Si queremos pasar un map en una función, se pasará automáticamente por referencia (se pasará el puntero al map).
No tenemos que hacer nada para usarlo.
Ejemplo:
x := map[string]string
f(x)

func f(x map[string]string) {
  x["esto se vera"] = "en la x del main"
}

https://play.golang.com/p/AC-vyWPnX8p



# Compare / comparar maps
reflect.DeepEqual(map1, map2)