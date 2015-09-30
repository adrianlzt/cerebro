https://clojuredocs.org/clojure.core/conj

Une dos sets/listas/vectores/maps
(conj [1 2 3] 4)
;;=> [1 2 3 4]

(conj '(1 2) 3 4)               
;;=> (4 3 1 2)

(conj {1 2, 3 4} [5 6])
;;=> {5 6, 1 2, 3 4}
