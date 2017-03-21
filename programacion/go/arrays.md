https://blog.golang.org/slices
https://github.com/golang/go/wiki/SliceTricks
Una slice se puede pensar como un struct que contiene un puntero a un array, su longitud. y una capacidad.
Cuando pasamos una slice por parametro, la función puede modificar el contenido del array, pero no de la cabecera (len).
Si queremos modificar la cabecera pasaremos el slice como puntero y modificaremos el puntero en la función.
Este ejemplo muestra bien lo que ocurre: https://play.golang.org/p/SvvN1HkUtq
El array siempre es el mismo (la letra 'B' se modifica), pero el len que tiene cada slice varia, por eso muestran cosas distintas.

http://golang.org/doc/articles/slices_usage_and_internals.html
p := []int{1,2,3,4}
p[0] = 1
len(p) = 4
fmt.Println lo muestra [1 2 3 4]
p[1:3] = [2 3]
p[2:2] = null

Se pueden crear arrays con un tamaño máximo
b := make([]int, 2, 5)  Array con capacidad para 5 elementos, inicializado con dos ceros (len=2)
cap(b): capacidad de b
b[3] = 3  da error, los valores se meten con append.
b = append(b,3)


# Join / Unir / append
https://play.golang.org/p/x_2tFngxFI
En ese ejemplo vemos como funciona append. Append agrega elementos al mismo array si hay capacidad, si no, genera uno nuevo doblando la capacidad

append([]int{1,2},[]int{3,4}...)

Si queremos usar esto es una func:
func foo(is []int) {
   nil
}

# Comparar
https://golang.org/pkg/reflect/#DeepEqual

reflect.DeepEqual(a,b)

In general DeepEqual is a recursive relaxation of Go's == operator.


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

# Ordenar
a1 := []string{"hola", "ananas", "aaa"} 
sort.Strings(a1) 
// Tras la funcion a1 estará ordenada

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
