https://smartystreets.com/blog/2015/02/go-testing-part-1-vanillla
https://golang.org/doc/faq#testing_framework esta lib de testing es bastante básica, aquí se justifica el por qué
https://www.youtube.com/watch?v=ndmB0bj7eyw
https://talks.golang.org/2014/testing.slide#4
https://github.com/golang/example
https://github.com/stretchr/testify
  A toolkit with common assertions and mocks that plays nicely with the standard library
http://onsi.github.io/ginkgo/
  BDD, test behavior
https://github.com/maxbrunsfeld/counterfeiter
  A tool for generating self-contained, type-safe test doubles in go

mirar examples.md para testear stdout


Correr test a mano:
go test -v
go test -v -run NameOfTest

go test fichero_test.go MAL!
  esto no pilla el package, parece que corre el fichero _test de forma aislada

Ejecutar los tests según haya modificaciones:
fd \.go | entr -c go test -v"

ver como van las ejecuciones de los test en tiempo real en un navegador:
gotty sh -c "fd \.go | entr -c go test -v"


Usar "assert" como libreria helper para generar los tests (mirar más abajo)


Table driven testing
snippet "testt"
Para tests repetitivos y parecidos, declarar una estructura con los tests que luego lo recorra un for.
Ejemplo: https://github.com/kubernetes/klog/blob/master/klogr/klogr_test.go#L13

  tests := map[string]struct {
    klogr          logr.InfoLogger
    text           string
    keysAndValues  []interface{}
    expectedOutput string
  }{
    "should log with values passed to keysAndValues": {
      klogr:         New().V(0),
      text:          "test",
      keysAndValues: []interface{}{"akey", "avalue"},
      expectedOutput: ` "level"=0 "msg"="test"  "akey"="avalue"
`,
    },
    ...
  // Luego usamos t.Run para generar tests individuales
  for desc, test := range tests {
    t.Run(desc, func(t *testing.T) {
      rcpts, err := parseEmails(test.tags)
      if err != nil {
        t.Fatalf("Should not return an error: %v", err)
      }
    })
  }



# Como crear tests
Crearemos fichero *_test.go para probar cada uno de los ficheros go.
Por ejemplo: main.go -> main_test.go

El "pacakge" deberá ser el mismo que el del fichero go principal.
Ejemplo: "package main"

Importaremos la libreria de testing:
import "testing"

Cada función a testear empezará por "Test" y llevará un único parámetro *testing.T:
func TestSomething(t *testing.T) {
  // test stuff here...
}

Para pasar los tests a mano:
go test -v


Coverage
go test -c


# Log / Errores
t.Logf("mensaje")
t.Errorf("coso %d", numero)
t.Fatalf("asd")
  esto sale en ese punto del test

# Skip
t.Skip("no ejecutar")

# Salir del test
t.FailNow()


# SetUp
https://golang.org/pkg/testing/#hdr-Main
Función que se ejecuta al llamar los test, es un wrapper para cada test

func TestMain(m *testing.M) {
  os.Exit(m.Run())
}


# Mock
Libreria que nos facilita los mock: https://github.com/stretchr/testify
Generador de interfaces para mock: https://github.com/vektra/mockery

Si queremos mockear una función tendrá que ser parte de una interfaz, y lo que haremos es redifinir esa interfaz con las funciones mockeadas.
Ej.: https://play.golang.com/p/fDi-YcLNZuL

Queremos mockear la función Get:
func update(c client) string {
  return c.Get()
}

Crearemos otro "objeto" que implemente la interfaz client:
type FakeClient struct {}
func (c FakeClient) Get() string {
  return "fake result"
}


## Mock ServeHTTP
https://blog.questionable.services/article/testing-http-handlers-go/

p := ProcconMock{}

req, err := http.NewRequest("GET", "/api/projects", nil)
if err != nil {
  t.Fatal(err)
}

rr := httptest.NewRecorder()
p.ServeHTTP(rr, req)

En "rr" tenemos lo que escribe la función al response writer




# Goconvey
http://goconvey.co/

Interfaz web que nos ayuda a comprobar el estado de los checks y crear nuevos de manera sencilla.

Puede estar ejecutando los checks según vamos programando, de manera que si hacemos algo que rompa un test, veremos una notificación del navegador al momento.

No me funciona en arch. Parece que no se "subscribe" a los cambios en los ficheros.
https://github.com/smartystreets/goconvey/issues/478
Workaround, copiar el GOPATH a /var/tmp


Ejemplo de uso:
https://github.com/IzakMarais/reporter

go get github.com/smartystreets/goconvey

Deberemos lanzar goconvey desde algún path debajo del GOPATH

## Composer
https://github.com/smartystreets/goconvey/wiki/Composition
El composer (http://localhost:8080/composer.html) nos permite escribir en texto natural tabulado los tests que queremos escribir. Nos genera un código hueco para los tests.

Vamos escribiendo los distintos tests que queremos ejecutar creando un arbol:
talfuncion
  cosaqueprobar
    subcosa
  otracosa
...

Nos genera un codigo usando la funcionalidad de goconvey. Tendremos que usar los import
import (
  "testing"
  . "github.com/smartystreets/goconvey/convey"
)

Mirar ejemplo en: https://github.com/smartystreets/goconvey/blob/master/examples/bowling_game_test.go

El codigo que nos genera lo meteremos dentro de un:
func TestSomething(t *testing.T) {


## Coverage
Si pulsamos sobre el fichero podremos ver que lineas estan cubiertas por los test



## Assertions
Otra opción: https://pkg.go.dev/gotest.tools/assert

github.com/stretchr/testify/assert
https://godoc.org/github.com/stretchr/testify/assert
assert.Equal(t, 1, 1)

Compara slices sin importar el orden
assert.ElementsMatch(t, [1, 3, 2, 3], [1, 3, 3, 2])



Otra opción:
https://github.com/smartystreets/goconvey/wiki/Assertions


Comparar que dos objetos son iguales
So(cosa1, ShouldEqual, cosa2)

Para arrays, slices, maps y structs
So(cosa1, ShouldResemble, cosa2)


# Cover
Ver cuando código está testeado
Genera un html donde marca que no está testeado

go tool cover -html=cover.out


# Race detector
A data race occurs when two goroutines access the same variable concurrently and at least one of the accesses is a write.
To help diagnose such bugs, Go includes a built-in data race detector.

$ go test -race mypkg    // to test the package
$ go run -race mysrc.go  // to run the source file
$ go build -race mycmd   // to build the command
$ go install -race mypkg // to install the package



# SQL
Mirar en sql.md para mockear go/sql


# BDD
https://github.com/DATA-DOG/godog


# Benchmark
https://golang.org/pkg/testing/
https://dave.cheney.net/2013/06/30/how-to-write-benchmarks-in-go

https://go.googlesource.com/proposal/+/master/design/14313-benchmark-format.md
Utilidades:
 Benchmany runs Go benchmarks across many git commits.
   https://pkg.go.dev/github.com/aclements/go-misc/benchmany?utm_source=godoc
 Benchstat computes and compares statistics about benchmarks.
   https://pkg.go.dev/golang.org/x/perf/cmd/benchstat



Meter un test como:
func BenchmarkHelloWorld(b *testing.B) {
        for i := 0; i < b.N; i++ {
                HelloWorld()
        }
}


Ejecutar con:
go test -v --bench . --benchmem
Si queremos seleccionar que bench ejecutar:
  -test.bench someregex
Si no queremos que ejecute ningún test:
  -run=^$

BenchmarkHelloWorld-8                500           3908505 ns/op         4375424 B/op      74594 allocs/op

Nos devuelve el número de veces que ha ejecutado la función (500).
Tiempo medio por cada operación (3908505)
Bytes allocated (4375424)
Número de memory allocations (74594)



## Benchmark desde código / Big-O
func testMy(b *testing.B, n int32) {
  arr := []int32{}
  for i := int32(0); i < n; i++ {
    arr = append(arr, i)
  }
  // Para empezar a contar el tiempo a partir de aquí
  b.ResetTimer()
  for i := 0; i < b.N; i++ {
    maxSubsetSum(arr)
  }
}

func benchmarkMy(i int) testing.BenchmarkResult {
  fn := func(b *testing.B) {
    testMy(b, int32(i))
  }

  return testing.Benchmark(fn)
}

func main() {
  data := map[int]testing.BenchmarkResult{}

  for i := 1; i < 2000; i += 250 {
    data[i] = benchmarkMy(i)
  }
}


Podemos usarlo para pintar una gráfica (mirar plot.md) para ver la función Big-O que seguimos.


Benchmark tipo TDD
https://blog.golang.org/subtests#TOC_3.

func BenchmarkAppendFloat(b *testing.B) {
    benchmarks := []struct{
        name    string
        float   float64
        fmt     byte
        prec    int
        bitSize int
    }{
        {"Decimal", 33909, 'g', -1, 64},
        {"Float", 339.7784, 'g', -1, 64},
        {"Exp", -5.09e75, 'g', -1, 64},
        {"NegExp", -5.11e-95, 'g', -1, 64},
        {"Big", 123456789123456789123456789, 'g', -1, 64},
        ...
    }
    dst := make([]byte, 30)
    for _, bm := range benchmarks {
        b.Run(bm.name, func(b *testing.B) {
            for i := 0; i < b.N; i++ {
                AppendFloat(dst[:0], bm.float, bm.fmt, bm.prec, bm.bitSize)
            }
        })
    }
}


Benchmark en paralelo
https://golang.org/pkg/testing/#B.RunParallel

func BenchmarkTemplateParallel(b *testing.B) {
    b.RunParallel(func(pb *testing.PB) {
        for pb.Next() {
            // Lo que quremos ejecutar
        }
    })
}



## pprof
go test -bench=. -benchmem -memprofile memprofile.out -cpuprofile profile.out



# clean up
Desde 1.14

func TestXX(..) {
  ...
  t.CleanUp(func() {
    // hacer algo para limpiar lo que hemos hecho
  }
}


# gorutinas
Si usamos gorutinas y queremos llamar a t.Fatal mejor usar un channel y recuperar los errores luego
https://github.com/ipfs/go-ipfs/issues/2043#issuecomment-164136026



# Detectando tests que solo fallan a veces
https://www.influxdata.com/blog/reproducing-a-flaky-test-in-go/

Dependerá de la razón por la que fallan.

Una posible opción es ejecutar los tests N veces (se detiene si encuentra un error):
go test -count=100 -failfast -run ...
