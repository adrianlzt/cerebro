https://clojuredocs.org/clojure.core/partial

user=> (def hundred-times (partial * 100))
#'user/hundred-times

user=> (hundred-times 5)
500


Lo que esta haciendo es llamar a
(* 100 5)


Añade los nuevos argumentos a la funcion que hemos configurado en partial
