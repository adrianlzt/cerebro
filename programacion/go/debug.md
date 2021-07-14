https://github.com/google/gops
Nos permite recolectar información de procesos que están ejecutándose
Sacar su stack, forzar GC, tracear, etc


# GODEBUG
Setting the GODEBUG environment variable to inittrace=1 now causes the runtime to emit a single line to standard error for each package init, summarizing its execution time and memory allocation. This trace can be used to find bottlenecks or regressions in Go startup performance. The GODEBUG documentation describes the format.



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

También se puede poner con un path relativo:
b plugins/aggregators/zabbix_lld/zabbix_ldd.go:54

Con "help" podemos ver los comandos disponibles

Típicos:
p X     mostrar valor de X
funcs   mostrar lista de funciones (nos puede valer para poner breakpoints)
s       entrar en una func
stepout salir a la funcion de arriba
n       siguiente linea
stack   mostrar stack

condicinonal breapoints
cond b2 num == 3

Podemos cambiar valores de variables:
set a = 3

Podemos llamar funciones (limitado)
call myFunc(2,3,4)

Podemos listar las funciones disponibles y seleccionar con regex

## Docker
Para poder correr delve dentro de un container
docker run --security-opt=apparmor=unconfined" --cap-add=SYS_PTRACE ...

También podemos hacer un "docker run" para arrancar delve en modo servior y conectar remotamente

delve connect IP:PORT

Para mapear los ficheros del container a nuestro path local:
~/.dlv/config.yml
  tenemos que forzar el path (mirar charla fosdem 2020 advanced debugging go)
> config
  aqui parece que también se puede configurar


## Debug tests
dlv test -- -test.run TestZabbixLLDForceSamePointSeveralPushes$
(dlv) b TestZabbixLLDForceSamePointSeveralPushes


## Scripting
https://github.com/go-delve/delve/blob/master/Documentation/cli/starlark.md
Scriptable con starlark (https://github.com/bazelbuild/starlark)

Nos permite crear funciones para usar en el debugger


## rr (deterministic debugging)

### Manual
Build sin optimizaciones

### Automático
dlv debug --backend=rr

> b main.main
> c

### Scripting
Un ejemplo interesante hacemos un pequeño script que ejecuta el programa hasta que falla.
Y en ese momento tenemos el record para hacer debug


# Trace
https://blog.gopheracademy.com/advent-2017/go-execution-tracer/


## runtime/trace
f, _ := os.Create("trace.out")
defer f.Close()
trace.Start(f)
defer trace.Stop()
trace.Logf(context.Background(), "agent", "interval: %v", a.Config.Agent.Interval)

Un problema que veo es que si el programa está fallando y lo tenemos que matar con kill -9, no se generará el trace.out

go tool trace trace.out
Nos abrirá una ventana del navegador con mucha info


## cutre
println("traza %s", valor)
mirar pretty_print.md


## mostrar una linea diciendo donde estamos, fichero, linea y funcion
func trace() {
  pc := make([]uintptr, 10)  // at least 1 entry needed
  runtime.Callers(2, pc)
  f := runtime.FuncForPC(pc[0])
  file, line := f.FileLine(pc[0])
  //log.Debugf("%s:%d %s\n", file, line, f.Name())
  fmt.Printf("%s:%d %s\n", file, line, f.Name())
}

Luego pondremos trace() al comienzo de las funciones (por ejemplo)


## mostrar el stack trace
debug.PrintStack()


# Numero CPUs
https://golang.org/pkg/runtime/#NumCPU
runtime.NumCPU()

NumCPU returns the number of logical CPUs usable by the current process.

The set of available CPUs is checked by querying the operating system at process startup. Changes to operating system CPU allocation after process startup are not reflected.



# Gorutinas
Saber cuantas tenemos activas
runtime.NumGoroutine()


# Debug
https://golang.org/pkg/runtime/debug/
Package debug contains facilities for programs to debug themselves while they are running.


# Stack trace
kill -ABRT xxx
hace dump de las corutinas y mata el proceso.
Útil para cuando se nos está quedando pillado el proceso

Tal vez esté en /var/log/messages
O en el log del programa


Si queremos separar cada gorutina en un fichero:
csplit -n 3 out.txt /goroutine/ '{*}'


## Entender output
https://www.ardanlabs.com/blog/2015/01/stack-traces-in-go.html

### Cabeceras
La cabecera "running" nos indica la gorutina que se estaba ejecutando en el momento del panic.

"chan receive", el hilo está esperando, ejemplo "<-ch"

Si tenemos un tiempo será la duración que llevan en ese estado por estar blocked/sleeping/waiting

Ejemplos de cabeceras:
[chan receive]:
[chan receive, 1072 minutes]:
[IO wait]:
[IO wait, 1072 minutes]:
[runnable]:
[running]:
[select]:
[select, 1072 minutes]:
[syscall, 1072 minutes]:
[syscall, 9 minutes, locked to thread]:
  Locked to thread is due to this syscall being blocking, so an operating system thread is assigned to this goroutine for the duration of the syscall and a new one has been created to replace the loss of this one


### Cuerpo
Se nos muestra la anidación de llamadas (más arriba, la llamada que estaba siendo/iba a ser procesada.

Por cada llamada se nos muestra la función donde estábamos, son sus parámetros y debajo una línea indicando la línea del código fuente.

El paso de parámetros dependerá del tipo de dato que estemos pasando.

bool: false=0, true=1
integer, un word, ejemplo: 0xa (10 en decimal)
string -> pointer + length, ejemplo: 0x425c0, 0x5
slice -> (puntero, length, capacity), ejemplo: 0x2080c3f50, 0x2, 0x4
struct, el contenido del struct, por ejemplo, para un struct que tiene un puntero y un bool: 0xc0018e4090, 0x0
valores que caben en una única palabra se empaquetan juntos: func Example(b1, b2, b3 bool, i uint8) -> main.Example(0x19010001)

En el caso de ser métodos, ejemplo "func (t *trace) Foo()", veremos en el nombre de la función esa declaración y el primer parámetro será el puntero al "receiver":
02 main.(*trace).Example(0x1553a8, 0x2081b7f50, 0x2, 0x4, 0xdc1d0, 0x5, 0xa)
                            ^
                            |
                        puntero a t

Ejemplo:
runtime.throw(0x540e13e, 0x26)
  /usr/local/go/src/runtime/panic.go:1116 +0x72 fp=0xc00343f620 sp=0xc00343f5f0 pc=0x1f507c2
runtime.mapiternext(0xc00343f720)
  /usr/local/go/src/runtime/map.go:853 +0x552 fp=0xc00343f6a0 sp=0xc00343f620 pc=0x1f2b5c2
github.com/skydive-project/skydive/graffiti/graph.(*MemoryBackend).GetNodeEdges(0xc00044fa60, 0xc0018e4090, 0x0, 0x203001, 0x58d9c60, 0xc0017dcfc0, 0xc00343f860, 0x1f28376, 0xc0017b17a0)
  /go/src/github.com/skydive-project/skydive/graffiti/graph/memory.go:150 +0xf1 fp=0xc00343f790 sp=0xc00343f6a0 pc=0x25e3ed1





# GDB
No funciona por defecto porque los binarios son DWARF comprimidos.
Tenemos que compilar go sin compresión dwarf

Creo que hay que cargar algun .py para que se vea bien (mirar fosdem 2020 advanced debugging go)
bit.ly/adv_debug_goF0SD3M

No funciona bien, pero puede ser útil para CGo


> b main.main
> c
> run



# Go / ASM / reverse engineering




# Tamaño variables / size
https://github.com/DmitriyVTitov/size

Hay otra opciones en la librería estandar, pero no "siguen" indirecciones (no vale para calcular el tamaño total de un slice, dict, etc)
