http://blog.codeship.com/an-intro-to-concurrency-patterns-in-go/?utm_campaign=Weekly%20Newsletters&utm_content=concurrency%20in%20go&utm_medium=newsletter&utm_source=email&utm_campaign=Weekly+Newsletters&utm_source=hs_email&utm_medium=email&utm_content=26891717&_hsenc=p2ANqtz-9-haV8Zf1MI8VK9n6mC4cWT_utyGwbXOqk2upRikBt_7jSGuKKzwnjE56xQ1miGnxzlAFZZ3CDEGKMUFSI2jpdSE48wQ&_hsmi=26891717


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
Se puede pasar el mismo canal ha varias hebras distintas.

func sum(x int ,ch chan int) {
  ...
  ch <- v
}

func main() {
  c := make(chan int)
  go sum(3,c)
  go sum(4,c)
  m,n := <- c, <- c


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
Podemos tener varios canales configurados, y con select actuar sobre el que nos llegue información. Generalmente tendremos un for forever por encima.
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
