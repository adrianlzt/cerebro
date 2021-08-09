https://tour.golang.org/concurrency/5

select {
case c <- x:
	x, y = y, x+y
case <-quit:
	fmt.Println("quit")
	return
default:
  log.Println("nos salimos por aqui si no se pueden hacer ninguna de las otras")
}

Podemos volver al "select" usando "break" (continue no vale aqui)
https://golang.org/ref/spec#Break_statements
