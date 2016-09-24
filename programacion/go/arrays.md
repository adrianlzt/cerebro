https://github.com/golang/go/wiki/SliceTricks
Arrays. Go le llama 'Slices'. Un 'slice' apunta a un array y tiene un tamaño

http://golang.org/doc/articles/slices_usage_and_internals.html
p := []int{1,2,3,4}
p[0] = 1
len(p) = 4
fmt.Println lo muestra [1 2 3 4]
p[1:3] = [2 3]
p[2:2] = null

Se pueden crear arrays con un tamaño máximo
b := make([]int, 2, 5)  Array con capacidad para 5 elementos, inicializado con dos ceros
cap(b): capacidad de b
b[3] = 3  da error, los valores se meten con append.
b = append(b,3)


# Join / Unir
append([]int{1,2},[]int{3,4}...)

Si queremos usar esto es una func:
func foo(is []int) {
   nil
}

# Comparar
https://golang.org/pkg/reflect/#DeepEqual

reflect.DeepEqual(a,b)

In general DeepEqual is a recursive relaxation of Go's == operator.


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
