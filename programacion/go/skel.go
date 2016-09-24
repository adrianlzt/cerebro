/*
* Usar fichero Makefile para compilar el binario
* Al compilar le pasamos el numero de version.
*
* -h redirige a --help
* -V a --version
*
* -v nivel info de log
* -vv nivel debug de log
*/

package main

import (
	"runtime"
	log "github.com/Sirupsen/logrus"
	"gopkg.in/alecthomas/kingpin.v2"
	"github.com/kataras/iris"
)

var (
	version_app = "NA"
	_ = kingpin.Version(version_app)
	verbose  = kingpin.Flag("verbose", "Have more verbose output. Twice for debug").Short('v').Counter()
	grafana_render_url = kingpin.Flag("nombre_flag", "Descripcion flag").Short('s').String()
)

func main() {
	kingpin.CommandLine.HelpFlag.Short('h')
	kingpin.CommandLine.VersionFlag.Short('V')
	kingpin.Parse()

	switch *verbose {
	case 0:
		log.SetLevel(log.WarnLevel)
	case 1:
		log.SetLevel(log.InfoLevel)
	default:
		log.SetLevel(log.DebugLevel)
	}

  log.Warn("Haz curl localhost:8080/")

	api := iris.New()
	api.Get("/", test)
	api.Listen("8080")
}

// Mostrar una linea diciendo donde estamos, fichero, linea y funcion
func trace() {
        pc := make([]uintptr, 10)  // at least 1 entry needed
        runtime.Callers(2, pc)
        f := runtime.FuncForPC(pc[0])
        file, line := f.FileLine(pc[0])
        log.Debugf("%s:%d %s\n", file, line, f.Name())
}

func test(ctx *iris.Context) {
  trace()

	ctx.Text(iris.StatusOK, "Generando y enviando notificacion")
}
