Core:
https://golang.org/pkg/log/
Bastante limitado. No tiene niveles

Truco para implementarlos: https://www.goinggo.net/2013/11/using-log-package-in-go.html

Uso simple:
import "log"
log.Println("traza")



# Zap
https://godoc.org/go.uber.org/zap
Usado por influxdb

Niveles:
Debug -> [D]
Info -> [I]
Warn -> [W]
Error -> [E]
DPanic -> ??
Panic -> [P]
Fatal -> [F]

https://github.com/uber-go/zap/blob/master/text_encoder_test.go#L154



# SpaceMonkey
https://godoc.org/github.com/spacemonkeygo/spacelog

# Log15
https://github.com/inconshreveable/log15

El que usan en grafana:
https://github.com/grafana/grafana/issues/4590#issuecomment-224503589


# Logrus
https://github.com/Sirupsen/logrus
go get github.com/Sirupsen/logrus

import (
  log "github.com/Sirupsen/logrus"
)


Tiene plugins de output para un monton de servicios: influxdb, mail, graylog, json, fluentd, etc

## Basico
log.Debug("Useful debugging information.")
log.Info("Something noteworthy happened!")
log.Warn("You should probably take a look at this.")
log.Error("Something failed but I'm not quitting.")
// Calls os.Exit(1) after logging
log.Fatal("Bye.")
// Calls panic() after logging
log.Panic("I'm bailing.")

Con una variable:
log.WithField("variable", var).Info("cuantas veces pedimos verbose")

Con variables:
log.WithFields(log.Fields{
	"omg":    true,
	"number": 122,
}).Warn("The group's number increased tremendously!")

## Nivel
Definir nivel (por defecto info):
log.SetLevel(log.InfoLevel)

## Output
Por defecto trazas tipo:
INFO[0000] Mensaje
   entre corchetes son los segundos pasados desde el inicio de la aplicación

Para JSON:
log.SetFormatter(&log.JSONFormatter{})

Texto (por defecto):
log.SetFormatter(&log.TextFormatter{})

With the default log.Formatter = new(&log.TextFormatter{}) when a TTY is not attached, the output is compatible with the logfmt format:
time="2015-03-26T01:27:38-04:00" level=debug msg="Started observing beach" animal=walrus number=8

Si queremos sacarlas por stderr:
log.SetOutput(os.Stderr)

## Context
contextLogger := log.WithFields(log.Fields{
  "common": "this is a common field",
  "other": "I also should be logged always",
})

contextLogger.Info("I'll be logged with common and other field")
contextLogger.Info("Me too")

Output:
INFO[0000] I'll be logged with common and other field    common=this is a common field other=I also should be logged always
INFO[0000] Me too                                        common=this is a common field other=I also should be logged always


## Crear instancia
import (
  "github.com/Sirupsen/logrus"
)

// Create a new instance of the logger. You can have any number of instances.
var log = logrus.New()


## Hooks
Cada vez que se lance una traza, enviarla a un endpoint (statsd, influxdb, slack, etc)

## Formater
https://github.com/Sirupsen/logrus#formatters


## Configuracion
Si queremos definir en un fichero json la configuración del logger podemos usar
https://github.com/gogap/logrus_mate

## Testing
https://github.com/Sirupsen/logrus#testing

## A un fichero
func init() {
	logFile,err := os.OpenFile("/tmp/dcip_eventhandler.log", os.O_CREATE|os.O_APPEND|os.O_WRONLY, 0644)
	if err != nil {
		panic(err)
	}
	log.SetOutput(logFile)
}


# glog (de golang) (abandonado)
https://github.com/golang/glog

Logging con niveles
Ejemplos: https://github.com/kubernetes/heapster/blob/7a7c2c2c2c31b2d953da407a38fb4fe5d71ba2a1/metrics/sources/summary/summary.go



