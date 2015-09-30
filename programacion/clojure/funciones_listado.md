(interpose VALOR DATOS)
  Mete VALOR entre cada par de DATOS. Ej.: [1,2,3] -> [1,9,2,9,3]

(partition N variable)
  Nos divice la variable en una lista con N sublistas
    user=> (let [rgb '(1 2 3 4 5)]
                (partition 2 rgb))
    ((1 2) (3 4))
 

(apply f args)
  Aplica la funcion f sobre los argumentos
