# atom
used in cases where we need to do uncoordinated updates 

Definir atom de nombre global-val con valor nil
(def global-val (atom nil))

Leer la variable global-val
(println (deref global-val)) => nil
(println @global-val)

Deinir valor:
(reset! global-val 10)
(swap! global-val inc)
  swap! se usa para modificar el valor con una función



# ref
used when we might need to do multiple updates as a transaction

(def names (ref []))

(dosync
  (ref-set names ["John"])
  (alter names #(if (not-empty %)
                  (conj % "Jane") %)))

No entiendo para que chequeamos el not-empty si en la transacción, antes ya hemos dicho que tiene valor.
