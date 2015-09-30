Sirve para meter varias funciones como un solo parametro:

Si por ejemplo una funcion espera tres argumentos:
(func
  (println "uno")
  (println "dos"))

Podemos meter más funciones en el primer argumento así:

(func
  (do
    (println "uno")
    (println "uno-bis"))
  (println "dos"))
