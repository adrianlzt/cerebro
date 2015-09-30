Vectors are sequential and ordered collections

Clojure collections are immutable - they can never change. When you do anything on a list, including adding and removing elements, you actually get a brand new list.

[1 2 3 4]

(get [:a :b :c] 2)
:c

(nth [:a :b :c] 2)
:c

# Añadir elementos
(conj [1 2 3] 4)
;;=> [1 2 3 4]

Se añade el elemento al final


# Comparacion
user=> (= [:a :b :c] (vector :a :b :c))
true

Tambien se puede comparar conta un vector
user=> (= [:a :b :c] (list :a :b :c))
true

