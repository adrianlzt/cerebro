https://go.dev/blog/slog
https://pkg.go.dev/golang.org/x/exp/slog
Solución nativa, que tiene niveles, permite formato json, key=values, etc

https://dave.cheney.net/2015/11/05/lets-talk-about-logging
Artículo sobre como logear
Se defiende que solo debería haber un nivel info y otro debug.
https://github.com/go-logr/logr
Esta implementación se basa en esas ideas, pero si pone log error y varios niveles (sin nombre) para debug.
También nos permite ir creando childs para saber por donde vamos y añadir fácilmente contexto a los logs.
mirar klogr.go

klog y klogr tienen una confusión bastante grande de opciones: https://github.com/kubernetes/klog/issues/54

# klog
https://github.com/kubernetes/klog/
Variante de Kubernetes del glog oficial.
mirar klog.md
Si usamos un fichero, y es un proceso que se arranca un momento, genera una cabecera en el log cada vez que es bastante overhead.

Convención que usa kubernetes para decidir que tiene cada nivel: https://github.com/kubernetes/community/blob/master/contributors/devel/logging.md

Ver como lo usan en kubernetes: https://github.com/kubernetes/kubernetes/blob/5e86fa43f59f8ed4fd353ab17dc1e65708a9ae71/staging/src/k8s.io/component-base/logs/logs.go


# Core
https://golang.org/pkg/log/
Bastante limitado. No tiene niveles

Truco para implementarlos: https://www.goinggo.net/2013/11/using-log-package-in-go.html

Uso simple:
import "log"
log.Println("traza")



# Zap
https://godoc.org/go.uber.org/zap
mirar zap.go
Usado por influxdb: https://github.com/influxdata/influxdb/blob/master/logger/logger.go

Mucha mejor performance que el resto
Parece las más activa en desarrollo

Niveles (por defecto info):
DEBUG, INFO, WARN, ERROR, DPANIC, PANIC, FATAL
DPANIC -> developer panic, para los típicos sitios que el código no debería entrar, para poder detectarlos pronto

Sugar() es para poder pasar contexto sin explicitar que tipo de dato es.
Es menos performante que el normal porque tiene que "adivinar" que tipo de dato es para pintarlo.

Info()
Infof() -> como Printf
Infow() -> para poder poner (mensaje, key1, value1, key2, value2)

Named() -> para generar sublogs con una sección
With(k1,v1) -> sublogers con contexto


cfg := zap.NewDevelopmentConfig()
cfg.OutputPaths = []string{"stderr", logFile}
cfg.DisableStacktrace = true // Generadas para >=warn en Development y >=error en Production
cfg.Level.SetLevel(zap.InfoLevel)
l, err := cfg.Build()
if err != nil {
  panic(err)
}
defer l.Sync()
log := l.Sugar()

log.Infow("failed to fetch URL",
  "url", "asda",
  "attempt", 3,
  "backoff", time.Second,
)
sugar.Infof("Failed to fetch URL: %s", "asdas")

Output:
2019-04-04T12:07:09.846+0200    INFO    tmp.7VaWfCopB0/main.go:13       failed to fetch URL   {"url": "asda", "attempt": 3, "backoff": "1s"}
2019-04-04T12:07:09.846+0200    INFO    tmp.7VaWfCopB0/main.go:19       Failed to fetch URL: asdas

Con NewProduction()
{"level":"info","ts":1554372583.0205376,"caller":"tmp.7VaWfCopB0/main.go:13","msg":"failed to fetch URL","url":"asda","attempt":3,"backoff":1}
{"level":"info","ts":1554372583.0205793,"caller":"tmp.7VaWfCopB0/main.go:18","msg":"Failed to fetch URL: asdas"}

Opciones:
cfg := zap.NewDevelopmentConfig()
cfg.OutputPaths = []string{
  "stderr",
  "test.log",
}
// Cambiar el nivel de logging
cfg.Level.SetLevel(zap.InfoLevel)
loggerFile, err := cfg.Build()




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


# glog (de golang)
https://github.com/golang/glog
Usado en kubernetes/openshift

Logging con niveles
Ejemplos: https://github.com/kubernetes/heapster/blob/7a7c2c2c2c31b2d953da407a38fb4fe5d71ba2a1/metrics/sources/summary/summary.go


Mensajes tipo:
E1026 15:26:05.485914   23952 hola.go:14] error message

  L                A single character, representing the log level (eg 'I' for INFO)
  mm               The month (zero padded; ie May is '05')
  dd               The day (zero padded)
  hh:mm:ss.uuuuuu  Time in hours, minutes and fractional seconds
  threadid         The space-padded thread ID as returned by GetTID()
  file             The file name
  line             The line number
  msg              The user-supplied message

Niveles: INFO, WARNING, ERROR, FATAL
