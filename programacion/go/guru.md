https://godoc.org/golang.org/x/tools/cmd/guru

guru: a tool for answering questions about Go source code.

Pensado para ser usado desde los editores de texto.

El código tiene que poder compilar para que guru funcione.

Ejemplo:
guru -scope github.com/influxdata/telegraf/agent callers "/home/adrian/go/src/github.com/influxdata/telegraf/agent/agent.go:#452"
