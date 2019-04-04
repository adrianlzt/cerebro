package main

import (
	"flag"
	"fmt"

	"k8s.io/klog"
)

// Fatal - error Fatal, stacktrace y sale con rc=255
// Exit - error Fatal y sale con rc=1
// Error - Always an error
// Warning - Something unexpected, but probably not an error
// Info V(0) - Generally useful for this to ALWAYS be visible to an operator (Programmer errors, Logging extra info about a panic, CLI argument handling)
// Info V(1) - A reasonable default log level if you don't want verbosity (Information about config (listening on X, watching Y), Errors that repeat frequently that relate to conditions that can be corrected (pod detected as unhealthy))
// Info V(2) - Useful steady state information about the service and important log messages that may correlate to significant changes in the system. This is the recommended default log level for most systems. (Logging HTTP requests and their exit code, System state changing (killing pod), Controller state change events (starting pods), Scheduler log messages)
// Info V(3) - Extended information about changes (More info about system state changes)
// Info V(4) - Debug level verbosity (Logging in particularly thorny parts of code where you may want to come back later and check it)
// Info V(5) - Trace level verbosity (Context to understand the steps leading up to errors and warnings, More information for troubleshooting reported issues)

// Los mensajes la idea es que se vayan componiendo, tipo: componente: fallo tal: error conex: invalid port

// Por defecto solo sale por stderr los mensajes error, el resto se escriben en /tmp/NombreApp.HOSTNAME.USER.log.NIVEL.YYYYMMDD-HHMMSS.PID
// También deja unos fichero /tmp/NombreApp.NIVEL que son enlaces al último fichero generado.
// Cada fichero tiene las trazas de su nivel y las superiores (WARNING tiene trazas warning y error)

// Cuando escribimos en un fichero, al comienzo pondrá una cabecera tipo:
// Log file created at: 2019/01/18 19:24:44
// Running on machine: archer
// Binary: Built with gc go1.11.4 for linux/amd64
// Log line format: [IWEF]mmdd hh:mm:ss.uuuuuu threadid file:line] msg
func main() {
	klog.InitFlags(nil) // Si ponemos nil, pilla flag.CommanLine
	/*
	* Ejemplo pasando unas flags sin usar los parámetros del programa:
	* fs := flag.FlagSet{}
	* fs.Set("stderrthreshold", "INFO")
	* klog.InitFlags(&fs)
	 */

	// Al usar la lib flag quiere decir que podemos pasar todos estos parámetros como parte de la ejecucción. Ej.: go run main.go -stderrthreshold INFO ...
	flag.Set("log_file", "myfile.log") // Escribir los logs en este fichero. Si no pasamos un path comleto será respecto al working dir. Tiene prioridad sobre "log_dir" (se ignorará log_dir si este está definido)
	// Los ficheros de logs de abren en append: https://github.com/kubernetes/klog/commit/ad78c012873af5914b0dfa8d34eab92d7daf914c
	// No está aun en la versión 0.2.0
	// Cada vez que abre/rota el fichero le mete la cabecera de cuando se ha creado, que máquina, binary, etc
	// Flag para quitar esas headers: https://github.com/kubernetes/klog/pull/52
	// Si ponemos un fichero, cada nivel de log lo abrirá independientemente, bug: https://github.com/kubernetes/klog/issues/53

	//flag.Set("log_dir", "/tmp/go/")    // Escribir los ficheros de log a este dir. Default "/tmp". Si no existe el dir, se usará /tmp
	// Parece que los ficheros tienen un tamaño máximo, 1800MB (https://github.com/kubernetes/klog/blob/f0c3f94178c11fe3a3503886466b306562049e72/klog_file.go#L33)

	//flag.Set("alsologtostderr", "true") // Sacar los logs por stderr y por fichero (default false)
	//flag.Set("logtostderr", "true") // No logear en ficheros, solo por stderr (default true)

	flag.Set("stderrthreshold", "INFO") // Definir el nivel de log por stderr (default ERROR). Posibilidades: FATAL ERROR WARNING INFO
	// Esto tiene más prioridad, aunque pongamos el logtostderr a false, los que superen este nivel se enviarán a stderr

	flag.Set("v", "2") // Modificar el nivel de verbosidad de INFO. Por defecto 0. Valores posibles 0-5
	//flag.Set("vmodule", "simp*=5,other*=3") // Modificar el nivel de verbosidad de INFO para los ficheros cuyo nombre haga match. Lista separada por comas

	//flag.Set("skip_headers", "true") // Si lo activamos (true), quitará los prefijos de las trazas. Ejemplo de prefijo: E0118 19:42:18.793308   17862 simple.go:39]
	//flag.Set("log_backtrace_at", "simple.go:24") // Si ponemos un fichero y una línea donde haya una traza de log activa (que el nivel esté activado), escribe un stack trace en el nivel INFO de esa línea

	flag.Parse()

	// Cada nivel tiene Info, Infoln, Infof, InfoDepth
	klog.V(0).Info("info v0")
	klog.V(1).Info("info v1")
	klog.V(2).Info("info v2")
	klog.V(3).Info("info v3")
	klog.V(4).Info("info v4")
	klog.V(5).Info("info v5")
	klog.Info("info level")
	klog.Warning("warning level")
	klog.Error("error level")
	//klog.Fatal("fatal level") // Fuerza una salida con RC=255 en este punto
	//klog.Exit("exit level") // Como Fatal, pero saliendo con RC=1

	test()

	//klog.CopyStandardLogTo("NIVEL") // Capturar con klog también los logs generados con el paquete "log"

	// Se hace flush automáticamente cada 30" (https://github.com/kubernetes/klog/blob/f0c3f94178c11fe3a3503886466b306562049e72/klog.go#L939)
	// Parece que tambien si se pasa de 256k (https://github.com/kubernetes/klog/blob/f0c3f94178c11fe3a3503886466b306562049e72/klog.go#L918)
	klog.Flush() // Forzar el flush a disco

	// Podemos usar klog.V(N) como condicional
	if klog.V(2) {
		fmt.Println("nivel 2 activo")
	}

	// Ejemplo escribiendo a un io.Writer (SetOutput): https://github.com/kubernetes/klog/blob/master/examples/set_output/usage_set_output.go
	// También tenemos SetOutputBySeverity, para poder enviar cada nivel a un io.Writer distinto
}

// Con depth vamos subiendo por el stack, cambiando en las cabeceras fichero y linea
func test() {
	klog.InfoDepth(0, "info level, depth 0") // Muestra que se ha ejecutado en esta linea, en este fichero
	klog.InfoDepth(1, "info level, depth 1") // Muestra que se ha ejecutado en la linea que ha llamado a "test()" en este fichero
	klog.InfoDepth(2, "info level, depth 2") // Muestra el fichero proc.go que es quien ha ejecutado este programa
}

// https://github.com/kubernetes/klog/blob/f0c3f94178c11fe3a3503886466b306562049e72/klog.go#L733:20
// Esta es la función (output) que escribe. Tiene un lock al comienzo.
// Podría que escribir muchas trazas bloquease en parte el programa?
