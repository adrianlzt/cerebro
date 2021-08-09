https://talks.golang.org/2016/applicative.slide#36
http://blog.codeship.com/an-intro-to-concurrency-patterns-in-go/
https://blog.golang.org/pipelines
https://blog.mozilla.org/services/2014/03/12/sane-concurrency-with-go/
https://tour.golang.org/concurrency/2
http://guzalexander.com/2013/12/06/golang-channels-tutorial.html
https://www.golang-book.com/books/intro/10
https://www.goinggo.net/2014/02/the-nature-of-channels-in-go.html
https://softwareengineering.stackexchange.com/questions/222642/are-go-langs-goroutine-pools-just-green-threads
https://www.reddit.com/r/golang/comments/b80dlt/go_advanced_concurrency_patterns/
https://drive.google.com/file/d/1nPdvhB0PutEJzdCq5ms6UI58dp50fcAN/view
  Rethinking Classical Concurrency Patterns
race_detector.md
context.md

Desde el punto de vista del procesador, un programa de go es un único thread.
Internamente se tiene un Go Runtime Scheduler que gestiona cual goroutine se va a ejecutar 1847


# goroutines / threads
go f(x,y,z)
Crea un nuevo thread y ejecuta f en el.
La evaluación de x,y,z se hace en el thread actual, y la ejecución de f en el nuevo thread.

Ambos threads comparten el mismo 'address space', por lo que el acceso a memoria debe estar sincronizado.

Ejemplo de como usar gorutinas y canales para crear una serie de "workers" que procesan unos trabajos: https://play.golang.com/p/Xej_bnYnlSr
Mirar tambien workerpool

No debemos de intentar obtener el id de una gorutine: https://blog.sgmansfield.com/2015/12/goroutine-ids/

Cuidado con "capturar" variables de un loop dentro de un closure
https://stackoverflow.com/questions/40326723/go-vet-range-variable-captured-by-func-literal-when-using-go-routine-inside-of-f
El problema puede venir porque estemos pasando el mismo puntero a todas las gorutinas, por lo que estarán usando la misma variable, cuando en realidad quermos pasar una variable determinada en cada vuelta del loop.



## Channels
Es la forma de comunicarse entre la hebras creadas y la principal
ch <- v   envia v al canal ch (espera hasta que el recibidor este listo)
v <- ch   espera un valor del canal ch (se queda esperando hasta que consigue el valor)

len(ch): número de elementos en el canal (podemos llamarla con el canal cerrado)
cap(ch): capacidad del canal (podemos llamarla con el canal cerrado)

Canal vacío (usado para señalizar)
signal := make(chan struct{})


Los canales se crean: ch := make(chan <tipo dato>)
Y se les pasa a la función que va a ser un nuevo thread como parámetro
Se puede pasar el mismo canal a varias hebras distintas.
Recordar crear el canal si hemos definido el canal en un struct

Una idea potente es que podemos pasar los channels como variables.
Podemos enviar, por ejemplo, una petición de trabajo a un worker y pasarle en ella el canal donde debe contestar.

Podemos especificar si un canal solo se va a usar como entrada o salida:
chan T denotes a bidirectional channel type. Compilers allow both receiving values from and sending values to bidirectional channels.
chan<- T denotes a send-only channel type. Compilers don't allow receiving values from send-only channels.
<-chan T denotes a receive-only channel type. Compilers don't allow sending values to receive-only channels.


func sum(x int ,ch chan int) {
  ...
  ch <- v
}

func main() {
  c := make(chan int)
  go sum(3,c)
  go sum(4,c)
  m,n := <- c, <- c

Almacenar valor:
p := <- c

Un channel puede tener un buffer; su capacidad la sabemos con cap(ch): 
ch := make(chan int, 20)

Los datos se van metiendo en el buffer uno a uno, y sacando de la misma manera.
Si metemos más datos de los que cabe en el buffer:
fatal error: all goroutines are asleep - deadlock!


Los escritores del canal pueden cerrar el canal para indicar que no van a escribir más. Por lo general no es necesario cerrar los canales.
El consumidor puede saber el estado del canal con testeando la variable ok:
v,ok <- ch

The loop for i := range c receives values from the channel repeatedly until it is closed.
Para este loop es necesario que el escritor cierre el canal, si no el for no sabrá cuando terminar.

select
Podemos tener varios canales configurados, y con select actuar sobre el que nos llegue información. Generalmente tendremos un for forever por encima. Este es el tipico esquema de envio, recibo:
select {
  case c1 <- x:
    f1()
  case <- c2:
    f2()
  default: 
    se_ejecuta_si_ninguno_esta_listo
    suele_ir_con_timer
}
En ese ejemplo hace f1 mientras alguien vaya consumiendo los datos de c1.
Si llega algún dato por c2, hará c2


Si necesitamos un reloj podemos usar time.Tick.
O un 'despertador', time.After



Para cosas en paralelo:
func SearchParallel(query string) ([]Result, error) {
    c := make(chan Result)
    go func() { c <- Web(query) }()
    go func() { c <- Image(query) }()
    go func() { c <- Video(query) }()

    return []Result{<-c, <-c, <-c}, nil
}


Funciones que retornan un canal:
func (c *RedisClient) Messages() <-chan []byte {
  return c.messages  // esto es un chan []byte
}



## Operaciones sin bloqueo
Usar select
https://gobyexample.com/non-blocking-channel-operations

Ejemplo de send sin bloqueo:
    select {
    case messages <- msg:
        fmt.Println("sent message", msg)
    default:
        fmt.Println("no message sent")
    }


# Drain / vaciar un channel
go func() {
  for range c {
  }
}()


# Cerrar un canal
https://gobyexample.com/closing-channels

close(c)


# Timeout

  link_chan := make(chan string)
  go wait_for_success(body_json.Jid, link_chan)
  select {
  case link := <- link_chan:
    fmt.Printf("Link: %v\n", link)
  case <- time.After(2 * time.Second):
    fmt.Printf("Mucho tiempo esperando")
  }


# Stateful goroutines
https://gobyexample.com/stateful-goroutines



# Waiting groups
https://golang.org/pkg/sync/#example_WaitGroup
https://play.golang.org/p/j3aHaeMyjt

import "sync"
var wg sync.WaitGroup
wg.Add(1)
go func() {
  // Este esquema lo veo mucho para no tener que pasar el wg a la rutina
  // Si intento pasar el wg como parámetro govet dará error: copylocks: call of worker copies lock value: sync.WaitGroup contains sync.noCopy
  defer wg.Done()
  rutina()
}()
wg.Wait()

func rutina() {
  ...
}


# Extraer un valor de un canal tipo X para meterlo en un canal tipo []X
input :=  make(chan int, 100)
...
output := make(chan []int, 100)
output <- []int{<-input} // Generamos un array de int y lo inicializamos con el valor obtenido de input



# Mutex
mutual exclusion lock.
Para crear zonas de exclusión, donde solo una goroutina puede estar en todo momento.
Se usa cuando tenemos que compartir recursos entre goroutinas.
var mu sync.Mutex

https://golang.org/pkg/sync/#Mutex.Lock
https://golang.org/pkg/sync/#RWMutex.Lock
  este último solo bloquea dos escritores, pero permite varios lectores.

CUIDADO con hacer un Lock y luego salirse de la función por otro sitio sin hacer el Unlock.
Intentar siempre que usemos el Lock y defer Unlock seguido.

foo := sync.Mutex{}
foo.Lock()
foo.Unlock()

Tambien tenemos RWMutex, que nos permite poner solo locks de read (permitimos muchos lectores, pero solo un escritor)



# Gestion de locks entre procesos
https://github.com/nightlyone/lockfile
ejemplos/lock.go




Otra lib:
https://github.com/tgulacsi/go-locking


mu.Lock()
mu.Unlock()

Si una goroutina hace "Lock" en un mutex ya locked, se quedará esperando hasta que se haga el unlock.




Funcion que nos puede ser util para debuguear gorutinas. Pintando cada mensaje de caa una en una columna distinta
func Print(numWorker int, str string, vars ...interface{}) {
  var tab string
  for i := 0; i < numWorker*5+1; i++ {
    tab += "\t"
  }
  log.Printf("%v%v: %s\n", tab, numWorker, fmt.Sprintf(str, vars...))
}



# Single run
https://golang.org/pkg/sync/#Once.Do
Ejecutar una función una única vez, aunque se llame varias veces.


# Singleflight
https://godoc.org/golang.org/x/sync/singleflight

Asegurarnos que una función solo se está ejecutando una única vez en cada momento.
Nos puede valer para cuando tenemos varias goroutinas y una función solo puede ser ejecutada en cada momento una sola vez.
El resultado de llamadas concurrentes siempre será el mismo (el resto de llamadas concurrentes solo recibirán la respuesta al terminar la primera llamada, sin reejecutar)

Ejemplo básico: singleflight.go





# Patrones de concurrencia

## Una única ejecucción
Podemos usar Singleflight. Pero tal vez no queremos obtener nada y sería encolar muchas tasks. Ejemplo, un endpoint web para arrancar un proceso batch

O tal vez un select que intente coger un elemento de un canal de tamaño 1 y un default por si no hay nada que coger.


## Proxy
https://github.com/google/tcpproxy/blob/master/tcpproxy.go#L386
Un proxy que copia datos entre un origen y un destino.
La idea principal es dos gorutinas que trabajan en paralelo.
Le pasamos un canal para avisar de que han terminado (el mismo para ambas).
En cuanto una termina (estamos escuchando en el canal), cerramos todo (defers) y salimos.


## Semáforos
https://medium.com/@matryer/golang-advent-calendar-day-two-starting-and-stopping-things-with-a-signal-channel-f5048161018
Usar un canal vacío (struct{}) para señalizar, esperar, etc
Podemos usarlo para solo permitir a N gorutinas estár ejecutando algo, por ejemplo, peticiones a un server, para no saturarlo.

done := make(chan struct{}, 2)
done <- struct{}{} // coger un hueco
<-done // soltar un "hueco"


## Pipelines
https://blog.golang.org/pipelines


## Fan-out
Enviar a un canal donde hay muchos workers

## Fan-in
Un worker escuchando en muchos canales


## Broadcasting
Mismo mensaje a varios workers
https://github.com/golang/go/issues/28157

Broadcast patterns are covered in the section starting at slide 67, with some extended examples on 102–105.
https://drive.google.com/file/d/1nPdvhB0PutEJzdCq5ms6UI58dp50fcAN/view
