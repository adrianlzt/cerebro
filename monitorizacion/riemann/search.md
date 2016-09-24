# Lookup
 riemann.bin=> (riemann.index/lookup (:index @riemann.config/core) "mongodb1" "cpu")
 #riemann.codec.Event{:host "mongodb1", :service "cpu", :state "critical", :description "cpu chunga | sys=2;;;", :metric nil, :tags ["icinga"], :time 1.46883501347E9, :ttl 100.0, :project "dsmctools"}


Imprimir valor del evento anterior al que esta pasando por el stream:
 #(prn (riemann.index/lookup (:index @riemann.config/core) (:host %) (:service %)))

# Search
http://riemann.io/api/riemann.index.html#var-search

(search this query-ast)

(riemann.index/search (:index @riemann.config/core) '(= :host "nodo2"))

El simbolo ' lo que hace es pasar como una cadena el la siguiente función.
En programación imperativa sería algo como:
  riemann_index_search(index, '(= :host "nodo2")')

Si queremos ejecutar una función dentro de la cadena entrecomillada tendremos que usar otros operadores:
(riemann.index/search (:index @riemann.config/core) `(= :host ~(str "nodo2")))

La backtick (`) crea un entrecomillado especial, y con ~ diremos que esa función debe procesarse.


Luego veremos que es típico usar el operador ->> para crear las querys (mirar en programacion/clojure/operadores.md)
La búsqueda anterior reescrita quedaría:
(->> `(= :host ~(str "nodo2")) (riemann.index/search (:index @riemann.config/core)))

Este operador nos permite concatenar operaciones de forma más sencilla. Por ejemplo:

Obtener el hostname del primer elemento de la búsqueda:
(->> `(= :host ~(str "nodo2")) (riemann.index/search (:index @riemann.config/core)) (first) (:host))

Obtener los hostnames de todos los eventos:
(->> `(= :host ~(str "nodo2")) (riemann.index/search (:index @riemann.config/core)) (map #(:host %)))

## Ejemplos
riemann.bin=> (->> '(and (= :host "mongodb1") (= :state "ok"))(riemann.index/search (:index @riemann.config/core)))
(#riemann.codec.Event{:host "mongodb1", :service "cpu", :state "ok", :description "cpu OK | sys=2;;;", :metric nil, :tags ["icinga"], :time 1.46883518463E9, :ttl 100.0, :project "dsmctools"})

Servicios no-ok de un host:
(->> '(and (= :host "mongodb1") (not (= :state "ok")))(riemann.index/search (:index @riemann.config/core)))


Podemos utilizar el index para consultar el estado anterior de un service (si la consulta la realizamos antes de indexar).

