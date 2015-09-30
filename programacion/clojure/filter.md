(filter FUNC DATOS)
  nos devuelve una lista de solo con los DATOS que hayan dado true en la FUNC


(filter even? [1 2 3 4 5]) => (2 4)


Primero multiplicamos cada elemento del vector por 3, luego devolvemos solo los elementos impares
(filter even?
  (map #(* 3 %) [1 2 3 4 5]))
