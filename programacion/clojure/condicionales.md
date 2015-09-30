https://clojuredocs.org/clojure.core/=

(= 1 1)

(= a b c d)
  compara que todos los elementos sean iguales

# If
(if (comparacion) (caso verdadero) (caso falso))

(defn print-args [arg1 & [arg2]]
  (println
    (if arg2
      "got two arguments"
      "got one argument")))

Si queremos meter más funciones en el caso true o false:
(if (comparacion)
    (do
      (primera_func ...)
      (segunda_func ...)
    (println "en caso de false")))



# Operadores
= == not= < > <= >=

# Test
nil? identical? zero? pos? neg? even? odd? true? false? nil?
