Por defecto riemann envia estadísticas internas.

Ejemplo:
WARN [2016-07-28 12:47:13,903] Thread-12 - riemann.config - evento #riemann.codec.Event{:host archer, :service riemann server ws 127.0.0.1:5556 in latency 0.999, :state ok, :description nil, :metric nil, :tags nil, :time 1469702833803/1000, :ttl 20}

Si queremos deshabilitarlas:
(instrumentation {:interval 5 :enabled? false})

