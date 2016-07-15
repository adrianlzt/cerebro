; Generar un json a partir de una estructura de clojure
(require '[cheshire.core :as json])

(json/generate-string request)


El elemento que pasaremos:
{
  :origin (str "riemann/" hostname)
  :tags [version]
  :type "Heartbeat"
}



Convertir un evento en json:
(riemann.common/event-to-json e)


Guardar un evento en un fichero json:
(defn save-file "Save event in file in JSON format"
  [e]
  (spit "/tmp/rieman_evento.json"
    (riemann.common/event-to-json e)  
  )
)
