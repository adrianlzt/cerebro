# Godebug
https://blog.cloudflare.com/go-has-a-debugger-and-its-awesome/
https://github.com/mailgun/godebug

No parece muy potente como debugger, pero parece útil para generar un binario debuggeable para probarlo en producción.

go get github.com/mailgun/godebug

Para meter breakpoints poner líneas:
_ = "breakpoint"

Ejecutar con:
godebug run main.go

Comandos
h help
n next
s step
c continue
l list
p [expr]
q quit


# Cutre
println("traza %s", valor)


# Mostrar una linea diciendo donde estamos, fichero, linea y funcion
func trace() {
	pc := make([]uintptr, 10)  // at least 1 entry needed
	runtime.Callers(2, pc)
	f := runtime.FuncForPC(pc[0])
	file, line := f.FileLine(pc[0])
	//log.Debugf("%s:%d %s\n", file, line, f.Name())
	fmt.Printf("%s:%d %s\n", file, line, f.Name())
}

Luego pondremos trace() al comienzo de las funciones (por ejemplo)



# Debug
https://golang.org/pkg/runtime/debug/
Package debug contains facilities for programs to debug themselves while they are running.


