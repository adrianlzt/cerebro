Write functions that return other functions as their result. One use for such functions is to provide the functionality facilitated by constructors in object-oriented languages.

(defn greeting [greeting-string]
  (fn [guest]
    (println greeting-string guest)))

(let [greet (greeting "Welcome to the wonderful world of Clojure")]
  (greet "Jane")
  (greet "John"))


El let asigna a "greet" la funcion "(println greeting-string guest)"
Una vez la tenemos, la usamos un par de veces con distintos nombres.


user=> (def casa (greeting "hola que tal "))
user=> (casa "juan")
hola que tal  juan


La funcion "greeting" se llama "closure" porque se cierra con los parámetros que le hayamos pasado.
