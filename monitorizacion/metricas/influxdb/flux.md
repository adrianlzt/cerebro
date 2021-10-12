Lenguaje para obtener los valores y hacer transformaciones.
Sustituye a SQL.

Podemos crear una cuenta gratis en influx cloud y usar un panel que genera las queries con clicks.

Ejemplo:
from(bucket: "foo's Bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "exec_daly")
  |> filter(fn: (r) => r["_field"] == "soc_power")
  |> filter(fn: (r) => r["host"] == "chip")
  |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
  |> yield(name: "mean")



Calcular Wh a partir de W:
https://community.grafana.com/t/transitioning-from-influxdb-1-x-influxql-to-2-x-flux-query-language/34058

myWindow = 600.0 //unit is seconds !!
myDuration = duration(v:(string(v:myWindow)+"s"))
from(bucket: "homeassistant")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "W")
  |> filter(fn: (r) => r["entity_id"] == "efergy815686")
  |> filter(fn: (r) => r["_field"] == "value")
  |> aggregateWindow(every: myDuration, fn: mean)
  |> map(fn: (r) => ({ _value: r._value * myWindow / 3600.0 , _time:r._time, _field:"WattHour" }))
  |> cumulativeSum(columns: ["_value"])
