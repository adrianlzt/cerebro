https://blog.golang.org/context

Makes it easy to pass request-scoped values, cancelation signals, and deadlines across API boundaries to all the goroutines involved in handling a request

Muchas veces se suele usar context para parar y limpiar las goroutines. La ventaja sobre un canal para cerrar, es que puede cerrarse desde muchas zonas distintas, porque si cerramos dos veces un canal tendremos un panic (panic al cerrar un canal cerrado).


ctx, cancel := context.WithCancel(context.Background())

