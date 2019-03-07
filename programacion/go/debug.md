# Delve
https://github.com/derekparker/delve
go get -u github.com/derekparker/delve/cmd/dlv

UI: https://github.com/aarzilli/gdlv
  go get -u github.com/aarzilli/gdlv
  cd path/package/main
  gdlv debug -arg1 val1
  > b main.main
  > c

neovim plugin: https://github.com/jodosha/vim-godebug
  :GoToggleBreakpoint
  :GoDebug
  Pero esto solo nos funciona si estamos en el package main


Tenemos que buscar donde está el "package main" de nuestra aplicación.
Por ejemplo en telegraf: github.com/influxdata/telegraf/cmd/telegraf

Arrancamos el debugger:
dlv debug github.com/influxdata/telegraf/cmd/telegraf
  tambien podemos ir a ese directorio y simplemente "dlv debug"
  Si queremos pasar parámetros agregar al final: -- -arg1 -arg2 value2

> break main.main
> c
>

Poner un breakpoint en un fichero determinado:
b /home/adrian/.gvm/pkgsets/go1.9.2/global/src/github.com/influxdata/telegraf/plugins/aggregators/zabbix_lld/zabbix_ldd.go:54

Con "help" podemos ver los comandos disponibles

Típicos:
p X  		mostrar valor de X
funcs 	mostrar lista de funciones (nos puede valer para poner breakpoints)
s		  	entrar en una func
stepout	salir a la funcion de arriba
n  			siguiente linea
stack		mostrar stack


# Cutre
println("traza %s", valor)
mirar pretty_print.md


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


# Stack trace
