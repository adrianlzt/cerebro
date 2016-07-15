; Estos requires suelen ir al comienzo del fichero principal de riemann
(require '[clj-http.client :as client]
         '[cheshire.core :as json])

(defn post "POST to localhost"
  [e]
  (client/post "http://localhost:7891"
               {
                 :body (riemann.common/event-to-json e)
                 :socket-timeout 5000
                 :conn-timeout 5000
                 :content-type :json
                 :accept :json
                 :throw-entire-message? true
               }
  )
)

; Para llamarla
#(post %)

; Esto enviara la siguiente peticion
; POST / HTTP/1.1
; Connection: close
; content-type: application/json
; accept: application/json
; accept-encoding: gzip, deflate
; Content-Length: 165
; Host: localhost:7891
; User-Agent: Apache-HttpClient/4.5 (Java/1.8.0)
;
; {"host":"creo1","service":"cpu","state":"ok","description":"top","metric":null,"tags":["icinga","dsmctools"],"time":"2016-07-14T08:55:57.518Z","ttl":100.0}
