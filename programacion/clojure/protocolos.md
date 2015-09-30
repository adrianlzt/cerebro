http://yogthos.github.io/ClojureDistilled.html
Protocols

Un Protocolo es una interfaz.
Definimos que funciones va a haber pero no las definimos:

Protocolo Foo, que define las funciones bar y baz (que puede llevar o no llevar parametros)
(defprotocol Foo
  "Foo doc string"
  (bar [this b] "bar doc string")
  (baz [this] [this b] "baz doc string"))


Creamos el tipo Bar que implementa Foo:
(deftype Bar [data] Foo
  (bar [this param]
    (println data param))
  (baz [this]
    (println (class this)))
  (baz [this param]
    (println param)))


Como llamar (primero creamos el "objeto" b de tipo Bar con su valor de inicialización, luego llamamos a las distintas funciones):
(let [b (Bar. "some data")]
  (.bar b "param")
  (.baz b)
  (.baz b "baz with param"))


# Extender una clase existente
(extend-protocol Foo String
  (bar [this param] (println this param)))

(bar "hello" "world")
=>"hello world"
