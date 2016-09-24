Una palabra sin nada "especial" es un simbolo (serán los identificadores de las variables)

Si le ponemos dos puntos es un :keyword (normalmente usados como keys en los maps)

Entre comillas es una "string" (pueden contener múltiples líneas)

Los caracteres: \a \u1123 \space \newline

Regex: #"[Cc]lojure"


Las vars mutable storage locations.

Booleans: true or false (nil == false)

Numbers: integers, doubles, floats and fractions

List: '(1 2 3)

Vector: [1 2 3]

Map: {:foo "a" :bar "b"}

Set: #{"a" "b" "c"}

# Asignacion - def
(def NOMBRE VALOR)

Ej.:
user=> (def pedro 1239)
#'user/pedro
user=> println pedro
#object[clojure.core$println 0x21881a7 "clojure.core$println@21881a7"]
1239
user=> pedro
1239
user=> user/pedro
1239

# Asignacion - let
https://clojuredocs.org/clojure.core/let

(let [variable valor]
  scope donde podemos usar la variable)
aqui la variable ya no vale

(let
  [a 1
   b 2]
  ()
)

"user/" indica el namespace
