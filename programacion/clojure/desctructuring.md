(let [[smaller bigger] (split-with #(< % 5) (range 10))]
    (println smaller bigger))

=>(0 1 2 3 4) (5 6 7 8 9)




(defn print-user [[name address phone]]
  (println name "-" address phone))

(print-user ["John" "397 King street, Toronto" "416-936-3218"])
=> "John - 397 King street, Toronto 416-936-3218"





(let [{foo :foo bar :bar} {:foo "foo" :bar "bar"}]
  (println foo bar))



(let [{[a b c] :items id :id} {:id "foo" :items [1 2 3]}]
  (println id "->" a b c))
=> "foo -> 1 2 3"

Nos entran los parametros
{
  :id "foo"
  :items [1 2 3]
}

Creamos una estructura para recibir los datos:
{
  :id id
  :items [a b c]
}


Atajo para coger parámetros:
(defn login [{:keys [user pass]}]
 (and (= user "bob") (= pass "secret")))

(login {:user "bob" :pass "secret"})

