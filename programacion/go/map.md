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
valor,existe = m["key"]  //existe=false, el valor estará al por defecto del tipo de dato (int=0, string='', etc)



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
