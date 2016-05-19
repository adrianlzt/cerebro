En el campo REQTIME tenemos el tiempo que tarda en contestar Apache

index=indice | timechart eval(perc99(REQTIME)/1000000) as p99_reqtime, eval(perc95(REQTIME)/1000000) as p95_reqtime, eval(perc90(REQTIME)/1000000) as p90_reqtime, eval(perc75(REQTIME)/1000000) as p75_reqtime, eval(perc50(REQTIME)/1000000) as p50_reqtime, eval(perc25(REQTIME)/1000000) as p25_reqtime

En la grafica mostramos cuanto tiempo tarda en contestar apache para el:
  25% de los usuarios (tardará muy poco)
  50% de los users
  75%
  90%
  95%
  99% este será un número alto, porque serán peticiones que por alguna razón tardan mucho
