Clojure strings are Java strings. This means that you can use any of the Java string methods on Clojure strings.

(.toUpperCase "hello world")

(clojure.string/join ", " ["pedro" "juan" "mario"])
"pedro, juan, mario"

Concatenar:
(clojure.string/join ["pedro" "juan" "mario"])



Convetir una string que "parece" un elemento de clojure a clojure:
(read-string "(:a :b :c)")
(read-string "2.3")

