(array 1 2 3)

(last array)
obtiene el ultimo elemento del array

=> (vector? [1 2 3])
true


Aplicar una operacion sobre un array
(apply + [1 2 3 4])


Realiza una operación sobre el último elemento de un array:
((fn [x] (* x x)) (last [1 2 3]))

Tamaño
(count [1 2 3])


Condicion sobre todos los elementos
https://clojuredocs.org/clojure.core/every_q

=> (every? true? [true true false true])
false

=> (every? (fn [e] (= "ok" (:state e))) [{:state "ok"}, {:state "ok"}])
true

