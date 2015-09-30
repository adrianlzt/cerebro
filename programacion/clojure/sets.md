Sets are not ordered, and they cannot contain duplicate elements

Clojure collections are immutable - they can never change. When you do anything on a list, including adding and removing elements, you actually get a brand new list.

#{1 2 3 4}


# Añadir elementos
(conj #{1 3 4} 2)
;;=> #{1 2 3 4}

https://clojuredocs.org/clojure.set/union
Esta función no funciona: 
CompilerException java.lang.RuntimeException: Unable to resolve symbol: union in this context, compiling:(NO_SOURCE_PATH:33:1) 

user=> (union #{1 2} #{2 3})
#{1 2 3}


# Elementos distintos
(distinct [:a :b :a :c :a :d])
