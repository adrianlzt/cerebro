https://clojuredocs.org/clojure.core/list

Lists are sequential and ordered collections

Clojure collections are immutable - they can never change. When you do anything on a list, including adding and removing elements, you actually get a brand new list.

(list 'a 'b 'c)
'(a b c)

Hace falta poner la comilla delante para distinguir de la lista que se usa para llamar a funciones: (func param1 param2)

# Añadir elementos
Lo añade al comienzo

(conj '(1 2 3) 4)
;;=> (4 1 2 3)

user=> (conj '(3 4) 2 1 9)
(9 1 2 3 4)

# Comparacion
user=> (= '(:a :b :c) (list :a :b :c))
true

Tambien se puede comparar conta un vector
user=> (= [:a :b :c] (list :a :b :c))
true

Obtener último elemento
(last lista)

Obtener elemento:
user=> (nth '(:a :b :c) 1)
:b


# Eliminar
user=> (remove odd? [1 2 3 4 5])             
(2 4)

# Filtrar
user=> (filter odd? [1 2 3 4 5])
(1 3 5)

