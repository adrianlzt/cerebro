http://blog.golang.org/error-handling-and-go
https://gobyexample.com/errors

Mirar tambien panic.md

# Error handling
Tipica estructura de manejo de error

f, err := os.Open("filename.ext")
if err != nil {
    //opciones
    log.Fatal(err)
    return fmt.Errorf("cosa: %v", err)
    panic(err)
}

if err := funcion_que_solo_retorna_error(); err != nil {
    ...
}

La funcion se define de la siguiente manera:
func Open(name string) (file *File, error)


Una tipica forma de sacar errores en una fución:
func check_routers(a int) (int, error) {
    ...
    return 0, fmt.Errorf("cadena %v", variable)

Creo que otra forma seria
import "errors"
    ...
    return 0, errors.Net("cadena")


Si hacemos:
fmt.Print(err)
  fmt llama a err.Error para obtener la cadena de texto




Nuestro error solo tiene que cumplir una intefaz:

type error interface {
    Error() string
}

Podemos definirlo de cualquier manera con total que tengamos esa interfaz para sacar el texto
