https://grafana.com/blog/2023/09/13/grafana-beyla-open-source-ebpf-auto-instrumentation/?mdm=social&utm_source=li&utm_medium=social
https://github.com/grafana/beyla

Autoinstrumentación usando eBPF.

Parece que van buscando como funciona cada librería para ir sacando los datos.
Un poco como la POC que hice en Telegraf de sacar las conexiones para enviarlas a Skydive, pero sacando más info.

# Download
Compilados en la web de releases
https://github.com/grafana/beyla/releases

# Captura
Via variables hay que especificarle donde enganchar, por puerto o por binario.
Una vez lo encuentra, comienza a capturar.

## TLS
He hecho una prueba con un programita en go que hace una llamda TLS:
"""
package main

import (
    "net/http"
    "time"
)

func main() {
    time.Sleep(5 * time.Second)
    http.Get("https://httpbin.org/get?bar=baz")
}
"""

Y por otro lado capturar las trazas del binario, donde vemos la captura TLS:
"""
➜ BEYLA_PROMETHEUS_PORT=9400 PRINT_TRACES=true EXECUTABLE_NAME=/var/tmp/tmp.nPBycivdYo/orueba/prueba ./beyla
time=2023-09-15T09:28:29.999+02:00 level=INFO msg=inspecting component=ebpf.TracerProvider pid=498944 comm=/var/tmp/tmp.nPBycivdYo/orueba/prueba
time=2023-09-15T09:28:30.092+02:00 level=INFO msg="Starting main node" component=beyla.Instrumenter
time=2023-09-15T09:28:30.092+02:00 level=INFO msg="opening prometheus scrape endpoint" component=connector.PrometheusManager port=9400 path=/metrics
2023-09-15 09:28:33.91592833 (788.817901ms[788.817901ms]) 200 GET /get []->[httpbin.org:0] size:0B comm=[prueba] traceparent=[]
"""
