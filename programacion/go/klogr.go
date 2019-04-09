package main

/*
Ejemplo del output que produce este programa:

I0404 09:31:03.165026    8710 main.go:41]  "level"=2 "msg"="level 2"
I0404 09:31:03.165136    8710 main.go:42]  "level"=0 "msg"="info msg"
E0404 09:31:03.165154    8710 main.go:43]  "msg"="explicacion" "error"="some error"  "contexto"=123.123
I0404 09:31:03.165179    8710 main.go:55] foo "level"=0 "msg"="some data"  "data"={"abc":23,"zyx":1}
I0404 09:31:03.165190    8710 main.go:61] foo/bar "level"=0 "msg"="deep"

El formato es:
E|I -> error / info (en klog hay más)
MES/DIA (MMDD)
hora
PID del proceso
fichero:linea donde se genera la traza
  hasta aqui es formato de klog
WithName añadidos, separados por "/"
level de la traza info (por defecto es 0)
msg
variables que añadamos
*/

import (
	"flag"
	"fmt"

	"github.com/go-logr/logr"
	"k8s.io/klog"
	"k8s.io/klog/klogr"
)

func main() {
	// La inicialización se hace como en klog (mirar klog.go)
	klog.InitFlags(nil)
	flag.Set("stderrthreshold", "INFO")
	flag.Set("v", "2")
	flag.Parse()

	log := klogr.New() // interface logr.Logger
	log.V(2).Info("level 2")
	log.Info("info msg")
	log.Error(fmt.Errorf("some error"), "explicacion", "contexto", 123.123)

	foo(log)

	klog.Flush()
}

func foo(log logr.Logger) {
	// Podemos ir creando subloggers. Nos sirve para tracear por donde estamos
	log = log.WithName("foo")
	// Podemos añadir key/values para dar contexto
	data := map[string]int{"zyx": 1, "abc": 23}
	log.Info("some data", "data", data)
	bar(log)
}

func bar(log logr.Logger) {
	log = log.WithName("bar")
	log.Info("deep")
}
