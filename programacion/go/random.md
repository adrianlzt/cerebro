https://golang.org/pkg/math/rand/
import "math/rand"
rand.Intn(n int)  // devuelve un numero entre [0,n) (entre 0 y n-1)

Generar una string de tamaño fijo con letras y numeros
https://play.golang.org/p/2uTFDGkwxZ



Generar un bool true/false.
Si no usamos seed, siempre tendremos la generación de valores en el mismo orden.
func RandBool() bool {
    rand.Seed(time.Now().UnixNano())
    return rand.Intn(2) == 1
}


# Shuffle / barajar
a := []int{1,2,3,4,5,6}
rand.Shuffle(len(a), func(i, j int) { a[i], a[j] = a[j], a[i] })
