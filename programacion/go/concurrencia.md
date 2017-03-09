https://talks.golang.org/2016/applicative.slide#36
http://blog.codeship.com/an-intro-to-concurrency-patterns-in-go/
https://blog.golang.org/pipelines
https://blog.mozilla.org/services/2014/03/12/sane-concurrency-with-go/


# goroutines / threads
go f(x,y,z)
Crea un nuevo thread y ejecuta f en el.
La evaluación de x,y,z se hace en el thread actual, y la ejecución de f en el nuevo thread.

Ambos threads comparten el mismo 'address space', por lo que el acceso a memoria debe estar sincronizado.

## Channels
Es la forma de comunicarse entre la hebras creadas y la principal
ch <- v   envia v al canal ch (espera hasta que el recibidor este listo)
v <- ch   espera un valor del canal ch (se queda esperando hasta que consigue el valor)

Los canales se crean: ch := make(chan <tipo dato>)
Y se les pasa a la función que va a ser un nuevo thread como parámetro
Se puede pasar el mismo canal a varias hebras distintas.

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
go rutina(&wg)
wg.Wait()

func rutina(wg *sync.WaitGroup) {
  defer wg.Done()
  ...
}


# Extraer un valor de un canal tipo X para meterlo en un canal tipo []X
input :=  make(chan int, 100)
...
output := make(chan []int, 100)
output <- []int{<-input} // Generamos un array de int y lo inicializamos con el valor obtenido de input
