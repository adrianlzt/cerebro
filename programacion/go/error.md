https://golang.org/pkg/errors/
https://golang.org/pkg/builtin/#error
http://blog.golang.org/error-handling-and-go
https://gobyexample.com/errors
http://www.golangpatterns.info/error-handling
https://www.innoq.com/en/blog/golang-errors-monads/

https://godoc.org/github.com/spacemonkeygo/errors

Mirar tambien panic.md

https://github.com/palantir/stacktrace
Generar stacktraces de los errores

Un ejemplo de como gestionar los errores:
https://github.com/upspin/upspin/blob/master/errors/errors.go

Una buena práctica es definir los errores que vayamos a usar como variables globales. Esto nos permitirá en los tests comparar que el error que sale es el esperado:
var (
   // texto explicativo para godoc
   ErrSomething1 = errors.New("Alguna cosa que falla")
   ErrSomething2 = fmt.Errorf("Usamos fmt si tenemos que formatear %v", something)
)
Ejemplo: https://github.com/hashicorp/yamux/blob/master/const.go

Otra opción es definir nuestros propios errores (un struct que cumple la intefaz "Error() error")
Mirar más abajo



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


# Error wrapping
newerr := fmt.Errorf("mas info: %w", err)

errors.Is(err, os.ErrNotExist)
  nos dice si el "err" dentro de "newerr" es del tipo os.ErrNotExist


# Named return values
http://golangtutorials.blogspot.com.es/2011/06/return-values-from-go-functions.html

Damos un nombre a las variables de retorno, las poblamos y al final llamamos simplemente a return sin parametros.

func MySqrt2(f float64) (ret float64, err error) {
    if (f < 0) {
        //then you can use those variables in code
        ret = float64(math.NaN())
        err = errors.New("I won't be able to do a sqrt of negative number!")
    } else {
        ret = math.Sqrt(f)
        //err is not assigned, so it gets default value nil
    }
    //automatically return the named return variables ret and err
    return
}



# Custom error
https://gobyexample.com/errors
https://blog.golang.org/error-handling-and-go

type dashboardExistsError struct {
  code int
  msg string
}

func (e *dashboardExistsError) Error() string {
  return fmt.Sprint("Ya existe un dashboard con ese nombre")
}


...
return &dashboardExistsError{
      code: resp.StatusCode,
      msg: resp.Body,
    }



# Métodos para detectar errores custom
Patrón donde creamos funciones que nos servirán para identificar el tipo de error:
filename := "a-nonexistent-file"
if _, err := os.Stat(filename); os.IsNotExist(err) {
  fmt.Printf("file does not exist")
}


Ejemplo de como crear esas funciones:
func IsRedisError(err error) bool {
  _, ok := err.(proto.RedisError)
  return ok
}



# Ejemplo de como saber el tipo de un error que no implementa un interfaz específico
Esto se hace ahora con los nuevos métodos de unwrap/is/etc
if !strings.HasSuffix(err.Error(), ": use of closed network connection") {
  psl.AddError(err)
}




# Context / Wrap errors
https://github.com/pkg/errors#adding-context-to-an-error
Capturado un error, añadirle el contexto donde estamos y pasar el error hacia arriba.



# Closure errors
Si tenemos muchas llamadas iguales donde solo chequeamos que el error sea != nil

var err error
write := func(buf []byte) {
  if err != nil {
    return
  }
  _, err = w.Write(buf)
}
write(p0[a:b])
write(p1[c:d])
write(p2[e:f])
if err != nil {
  return err
}


# multierror
https://github.com/hashicorp/go-multierror

Librería para cuando tenemos que devolver un único "error", pero estamos iterando por un slice y podemos generar varios errores.

var result error
for i := 0; i < 3; i++ {
	result = multierror.Append(totalErr, fmt.Errorf("error en %d", i))
}
fmt.Printf("%v\n", result)

Salida:
3 errors occurred:
        * error en 0
        * error en 1
        * error en 2

Se puede customizar el output (por ejemplo si queremos una única linea)

Para devolver los errores, si hay, o en caso contrario, nil.
return result.ErrorOrNil()


# invalid flag in #cgo CFLAGS
https://github.com/golang/go/wiki/InvalidFlag
https://golang.org/cmd/cgo/
Solo ciertas flags de build están white listed.
Con la variable de entorno CGO_CFLAGS_ALLOW podemos pasar una regex para adminitar más.

Workaround cutre para pasar todas:
export CGO_CXXFLAGS_ALLOW=".*"
export CGO_LDFLAGS_ALLOW=".*"
export CGO_CFLAGS_ALLOW=".*"



# build constraints exclude all Go files in
Tenemos puesto en los ficheros cosas tipo:
// +build
que evitan poder ser usados para determinadas versiones y/o archs
