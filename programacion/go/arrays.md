https://blog.golang.org/slices
https://github.com/golang/go/wiki/SliceTricks
Una slice se puede pensar como un struct que contiene un puntero a un array, su longitud. y una capacidad.
Cuando pasamos una slice por parametro, la función puede modificar el contenido del array, pero no de la cabecera (len).
Si queremos modificar la cabecera pasaremos el slice como puntero y modificaremos el puntero en la función.
Este ejemplo muestra bien lo que ocurre: https://play.golang.org/p/SvvN1HkUtq
El array siempre es el mismo (la letra 'B' se modifica), pero el len que tiene cada slice varia, por eso muestran cosas distintas.

mirar lista.md


http://golang.org/doc/articles/slices_usage_and_internals.html
p := []int{1,2,3,4}
p[0] = 1
len(p) = 4
fmt.Println lo muestra [1 2 3 4]
p[1:3] = [2 3]
p[2:2] = null

También podemos usar: p[1:3:3]
En este caso elegimos los elementos segundo y tercero, y el array devuelto solo tendrá una capacidad de 3 elementos.
Un caso de uso lo podemos ver al partir un array (sección más abajo)

n := []int{0,1,2,3,4,5,6,7,8,9}
n1 := n[0:4]
n2 := n[0:4:5]
fmt.Printf("n:  len=%v cap=%v\n", len(n), cap(n))
fmt.Printf("n1: len=%v cap=%v\n", len(n1), cap(n1))
fmt.Printf("n2: len=%v cap=%v\n", len(n2), cap(n2))
// n:  len=10 cap=10
// n1: len=4 cap=10
// n2: len=4 cap=5


Se pueden crear arrays con un tamaño máximo
b := make([]int, 2, 5)  Array con capacidad para 5 elementos, inicializado con dos ceros (len=2)
cap(b): capacidad de b
b[3] = 3  da error, los valores se meten con append.
b = append(b,3)


# Join / Unir / append
https://play.golang.org/p/x_2tFngxFI
En ese ejemplo vemos como funciona append. Append agrega elementos al mismo array si hay capacidad, si no, genera uno nuevo doblando la capacidad

append([]int{1,2},[]int{3,4}...)
Si hacemos append(a,b...) estaremos uniendo al slice a el contenido del slice b

Si queremos usar esto es una func:
func foo(is []int) {
   nil
}


# Borrar
https://github.com/golang/go/wiki/SliceTricks#cut

CUIDADO! si los elementos de la lista son punteros, o struct que contienen punteros, debemos usar una implementación especial para que el garbage collector funcione bien

Borrar el emento "i" sin preservar el orden del slice y pudiendo usar punteros (safe para el garbage collector)
a[i] = a[len(a)-1]  // copiamos el último elemento del array a la posición de i
a[len(a)-1] = nil   // marcamos el último elemento como borrado (para el GC)
a = a[:len(a)-1]    // reducimos el tamaño del slice en 1


# Comparar
https://yourbasic.org/golang/compare-slices/

1. Crear una función con un bucle.
2. bytes.Equal (para []byte)
3. reflect
https://golang.org/pkg/reflect/#DeepEqual

reflect.DeepEqual(a,b)

In general DeepEqual is a recursive relaxation of Go's == operator.
Si tenemos elementos en un array desordenados, dará false
reflect.DeepEqual([]int{1,2,3}, []int{2,3,1}) -> false

## Comparar ignorando posición
Una opción es ordenar y luego comparar:
https://godoc.org/github.com/google/go-cmp/cmp#example-Option--SortedSlice

https://play.golang.org/p/xUS2ngrUWUl
Opción generalizada a partir de ElementsMatch https://github.com/stretchr/testify/blob/85f2b59c4459e5bf57488796be8c3667cb8246d6/assert/assertions.go#L836
Compara cualquier tipo de dato e ignora la posición en los arrays.




# Elemento dentro del array
http://stackoverflow.com/a/33323321

No hay función, tendremos que implementarla.
Si es pequeño podremos recorrerlo con un for. Cuidado si es grande

Si esta ordenado, podemos usar Sort.Search

A lo mejor nos vale hacer algo tipo?
    switch category {
    case
        "auto",
        "news",
        "sport",
        "music":
        return true
    }


Cuidado! con sort.SearchString (https://www.geeksforgeeks.org/searching-an-element-of-string-type-in-golang-slice/)
No nos vale para saber si un elemento está en la lista.
Nos da la posición donde debería meterse el elemento para mantener la lista ordenada
Para saber si el elemento estaba en la lista tendremos que comparar el elemento en esa posición con el que estamos buscando.


Ejemplo:
// Contains tells whether a contains x.
func Contains(a []string, x string) bool {
        for _, n := range a {
                if x == n {
                        return true
                }
        }
        return false
}

# Ordenar
https://golang.org/pkg/sort/#Ints
a1 := []string{"hola", "ananas", "aaa"}
sort.Strings(a1)
// Tras la funcion a1 estará ordenada

Para ordenar ints
sort.Ints(s)

Ordernar slice con fechas:
sort.Slice(keys, func(i, j int) bool {
  return keys[i].Before(keys[j])
})


b := []int{3,4,1,6}
sort.Slice(b, func(i,j int) bool { return b[i] < b[j] })
[1 3 4 6]       // []int


# Diferencia
http://stackoverflow.com/questions/19374219/how-to-find-the-difference-between-two-slices-of-strings-in-golang

A base de bucles for o con map

# Copia
http://stackoverflow.com/a/30182622

arr := []int{1, 2, 3}
tmp := make([]int, len(arr))
copy(tmp, arr)
fmt.Println(tmp)
fmt.Println(arr)


# Sacar el último elemento
p := []int{1,2,3,4}
p[len(p)-1]
p[:len(p)-1]

Quedarnos con todo menos el primer elemento:
p[1:len(p)]



# Partir un array en grupos de un tamaño
actions := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
batchSize := 3
var batches [][]int

for batchSize < len(actions) {
    actions, batches = actions[batchSize:], append(batches, actions[0:batchSize:batchSize])
    // Al hacer el append está añadiendo a batches un array con solo los números que necesitamos
    // Usando el formato [i:j:k] consigue meter slices con la capacidad justa, sin gastar capacidad
    // mirar https://play.golang.org/p/tTgwVuLZE7M
}
batches = append(batches, actions)
// resultado: [[0 1 2] [3 4 5] [6 7 8] [9]]
batches seguirá apuntando a la misma estructura de "actions", por lo que si modificamos "actions" veremos el cambio en los valores de "batches"
batches seguirá apuntando a la misma estructura de "actions", por lo que si modificamos "actions" veremos el cambio en los valores de "batches"
