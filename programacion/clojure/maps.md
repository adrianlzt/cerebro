Maps are key-value collections, where the keys can be any object. Here, we've used what Clojure calls a keyword (:foo) for one of the keys, and a number for the other key.

Clojure collections are immutable - they can never change. When you do anything on a list, including adding and removing elements, you actually get a brand new list.

{:foo "bar" 3 4}


# Añadir elementos
(conj {:firstname "John" :lastname "Doe"} {:age 25 :nationality "Chinese"})
;;=> {:nationality "Chinese", :age 25, :firstname "John", :lastname "Doe"}

# Coger elemento
user=> (get {:name "adri" :edad 4} :name)
"adri"


(get-in {:project "sm2m", :service "pepe"} [:project :service])
