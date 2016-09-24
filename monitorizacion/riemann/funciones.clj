; Definir función:
(defn NOMBRE [PARAM1,PARAM2] (FUNCION))

; Llamar a una función.
(NOMBRE PARAM1 PARAM2 ...)

; Una funcion sencilla
(defn log-info
  [e]
  (info e))


; Podemos necesitar algunas extensiones: http, json, riemann.query
; Las agregaremos de esta manera poniendolas al comienzo del fichero principal de configuracion
(require '[clj-http.client :as client]
         '[cheshire.core :as json]
         '[riemann.query :as query])

Multieventos.
En el caso de funciones que nos vayan a pasar varios eventos lo hacen como un array.
Ejemplo:
(batch 3 10 funcion)

(defn funcion [events]
  (prn (type events))
  (prn (count events))
)

Esto nos devolvera:
clojure.lang.PersistentVector
3


; anonimas (pensadas para funcionar debajo de stream, donde se pasa siempre un evento como argumento
#(prn (:host %))

; equivalente
(fn [e] (prn (:host e)))
