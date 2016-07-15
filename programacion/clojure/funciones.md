https://clojuredocs.org/clojure.core/defn
Ejemplos complejos: https://github.com/mythz/clojure-linq-examples


Llamar a una función.
(NOMBREFUNC PARAM1 PARAM2 ...)

(defn name doc-string? attr-map? [params*] prepost-map? body)

(defn nombre "texto de ayuda" [param1 param2] (que hacer))


Definir función:
(defn NOMBRE [PARAM1,PARAM2] (FUNCION))

Ej.:
(defn square [x] (* x x))

defn es un shortcut para:
(def square (fn [x] (* x x)))


Una función puede tener muchas expresiones:
(defn bmi [height weight]
  (println "height:" height)
  (println "weight:" weight)
  (/ weight (* height height)))


Las funciones deben declararse antes de usarse
En el caso de que esté definida después primero deberemos "avisar" con:
(declare nombre_de_la_func_que_se_define_despues)



# Funciones anónimas
Usar funcion sin definirla (definimos la función y la usamos directamente)
((fn [x] (* x x), 10)

De manera más corta:
#(* % %)

Ejemplo:
(#(* % %), 3)

Otro ejemplo:
((fn [arg] (println arg)) "hello")
es equivalente a:
#(println %)

Si tenemos varios argumentos los usaremos como:
%1 %2 %3...

user=> (#(* %1 %2), 3 4)    
12


# High-order functions
Mirar funciones_high_order.md

# Funciones modificadoras
Mirar funciones_listado.md

# Parámetros / argumentos / variadic
http://clojure-doc.org/articles/language/functions.html#variadic-functions
Mirar desctructuring.md
Si en los parámetros ponemos "& NOMBRE", todos los parámetros que excedan los definidos se meterán en un array accesible mediante NOMBRE.

(defn funcion [a b & resto]  
(println a)
(println b)
(println resto))

user=> (funcion "a" "b" "c" "d" "e")
a
b
(c d e)


(defn funcion [[a b c]] ... )
Ahora podemos llamar a funcion con:
(funcion ["uno" "dos" "tres"]) y se asignará:
  a -> "uno"
  b -> "dos
  c -> "tres"

Si ponemos los argumentos como [a b c...] los pasaremos uno a uno (fun a b c)
Si ponemos dobles corchetes tendremos que pasar una lista/vector: (fun '(a b c))

(defn adri [[_ & variable]]
  Si pasamos una cadena, "hola" -> _=h variable=(o l a)
  Si pasamos una lista igual, '(h o l a) -> _=h variable=(o l a)
  Lo mismo para un vector


Atajo para coger parámetros:
(defn login [{:keys [user pass]}]
 (and (= user "bob") (= pass "secret")))

(login {:user "bob" :pass "secret"})


Obtener valores de un map sin destruirlo:
(defn register [{:keys [id pass repeat-pass] :as user}]
  Tenemos disponibles las variables: id pass repeat-pass
  Tambien seguimos teniendo disponible la variable user (que será algo tipo {:id "nombre" :pass "pwd" :repeat-pass "pwd"})


# Multi-arity / diferente numero de argumentos
http://theburningmonk.com/2013/09/clojure-multi-arity-and-variadic-functions/

(defn greet
     ([] (greet "you"))
     ([name] (print "Hello" name)))

(greet) 
;; => Hello you

(greet "World")
;; => Hello World

# Threading expressions
Organización más sencilla

(reduce + (interpose 5 (map inc (range 10))))
(->> (range 10) (map inc) (interpose 5) (reduce +))


# Funciones privadas
https://clojuredocs.org/clojure.core/defn-

(defn- foo [] "World!")
