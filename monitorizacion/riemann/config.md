/etc/riemann/riemann.config

mirar streams.md

mirar ejemplos.md

# Para chequear la conf
riemann test riemann.config

Parar instrumentación del core (la automonitorización que realiza riemann)
http://riemann.io/api/riemann.config.html#var-instrumentation
(instrumentation {:interval 5
                  :enabled? false})


The TCP and UDP servers listen on port 5555 for TCP connections and UDP datagrams. They accept a stream of protocol buffer messages containing events (or queries, control messages, etc). Those events are then applied to a tree of streams. The TCP server also supports querying the index for the current state of the system. The UDP protocol is much faster but lossy. The TCP protocol is slower, but provides reliable delivery and acknowledgement of receipt.


# Include
; Include relative to the current config file or current working directory
(include "foo.clj")

; Specify an absolute path
(include "/foo/bar.clj")

; Include a whole directory (coge los *.config y los *.clj)
(include "/usr/local/riemann/config")


# Log file
(logging/init {:file "/path/to/some/riemann.log"})

solo a stdout:
(logging/init)

# SSL/TLS
http://riemann.io/howto.html#securing-traffic-using-tls


# Override funciones
http://riemann.io/howto.html#overriding-riemann-functions

Vamos al namespace de la función, la redefinimos y volvemos al namespace de la config

(ns riemann.common)
(defn body [events]
  ; pr-str formats events as a clojure-readable string.
  (pr-str events))
(ns riemann.config)

; And then your servers, streams, etc...
(tcp-server ...)
(streams ...)
