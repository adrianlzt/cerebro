En clojure usamos los namespaces en vez de las clases.
Organizamos las funciones en namespaces.

Las funciones de un mismo namespace se pueden llamar directamente

(ns colors)
(defn func1 ...)
(defn func2 ...)


# Use
(ns :myns
  (:use colors))
(func1 ...)


Para evitar que dos namespaces tengan la misma función (o queramos definir una func con el mismo nombre) podemos "importar" solo determinadas funciones de un ns:
(ns myns
  (:use [colors :only [func1]]))


# Require
Con require permitimos usar las funciones, pero tenemos que llamarlas con el namespace completo:

(my ns
  (:require colors))
(colors/func1 ...)


shortcut para los nombres:
(ns myotherns
  (:require [colors :as c]))
(c/func1 ...)

Require actuando como use:
(ns myns
  (:require [colors :refer :all]))

(ns myns
  (:require [colors :refer [rgb->hex]))

