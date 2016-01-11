# Arrays. Go le llama 'Slices'. Un 'slice' apunta a un array y tiene un tamaño
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

