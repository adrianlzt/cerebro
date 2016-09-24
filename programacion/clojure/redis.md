https://github.com/ptaoussanis/carmine

riemann.bin=> (require '[taoensso.carmine :as car :refer (wcar)])
nil
riemann.bin=> (defmacro wcar* [& body] `(car/wcar {:pool {} :spec {}} ~@body))
#'riemann.bin/wcar*
riemann.bin=> (wcar* (car/ping))
"PONG"


# GET
riemann.bin=> (wcar* (car/get "CLAVE"))

## Set
=> (wcar* (car/smembers "notifier-contact:tools"))
["izt@gmail.com" "wzt@gmail.com"]


