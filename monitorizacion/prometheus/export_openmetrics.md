Exportar el contenido a un fichero de texto

```bash
promtool tsdb --experimental dump-openmetrics /var/lib/prometheus/data --match='{__name__="go_info"}' > metrics_go_info.openmetrics
```

Ejemplo del formato de openmetrics:

```
go_info{app="prometheus",instance="localhost:9090",job="prometheus",version="go1.25.6 X:nodwarf5"} 1 1770712799.145
```

Pasar de openmetrics a TSDB:

```bash
promtool tsdb --experimental create-blocks-from openmetrics single_go_info.openmetric blocks_output
```
