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
