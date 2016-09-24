https://blog.cloudflare.com/go-has-a-debugger-and-its-awesome/
https://github.com/mailgun/godebug



# Cutre
println("traza %s", valor)


// Mostrar una linea diciendo donde estamos, fichero, linea y funcion
func trace() {
	pc := make([]uintptr, 10)  // at least 1 entry needed
	runtime.Callers(2, pc)
	f := runtime.FuncForPC(pc[0])
	file, line := f.FileLine(pc[0])
	//log.Debugf("%s:%d %s\n", file, line, f.Name())
	fmt.Printf("%s:%d %s\n", file, line, f.Name())
}

Luego pondremos trace() al comienzo de las funciones (por ejemplo)
