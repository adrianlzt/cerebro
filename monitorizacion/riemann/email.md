http://riemann.io/api/riemann.email.html
https://kartar.net/2015/03/custom-emails-with-riemann/

Para enviar emails custom (sin hacer uso de riemann):

(postal.core/send-message
  {}
  {
    :from "reimann@domain.org"
    :to "email@gmail.com",
    :subject "Alarma riemann",
    :body "Cuerpo"
  }
)

# Se baja un email de internet, y la pone en un email html
(let [tfile (java.io.File/createTempFile "email-" ".png")]
  (with-open [
  						in (io/input-stream "http://i.imgur.com/9ujUx5X.png")
  						out (io/output-stream tfile)]
  					  (io/copy in out)
  )
  (postal.core/send-message {
  								:from "me@draines.com"
  								:to "adrianlzt@gmail.com"
  								:subject "Hi!"
  								:body [
  												{
  													:type "text/html"
  													:content "<b>Test!</b><img src='cid:pepito-123'/>"
  												}
  												{
  													:type :attachment
  													:content tfile
  													:file-name "test.png"
  													:description "una descr"
  													:content-type "image/png"
  													:content-id "pepito-123"
  												}
  											]
  								}
  	)
)

# Templates
http://www.refactorium.com/tech/Riemann-custom-email-template/

cd /etc/riemann
wget https://clojars.org/repo/selmer/selmer/1.0.7/selmer-1.0.7.jar
wget https://clojars.org/repo/json-html/json-html/0.4.0/json-html-0.4.0.jar
wget https://clojars.org/repo/hiccup/hiccup/1.0.5/hiccup-1.0.5.jar

Añadir el jar de selmer (para usar templates)
sudo EXTRA_CLASSPATH=selmer-1.0.7.jar:json-html-0.4.0.jar:hiccup-1.0.5.jar bash -x /usr/bin/riemann /etc/riemann/riemann.config

En riemann.config (algunos de los includes seguramente no hagan falta, estan todos los que tengo activados):

(require '[clj-http.client :as client]
         '[cheshire.core :as json]
         '[riemann.query :as query]
         '[clojure.java.shell :as shell]
         '[selmer.parser :as selmer])

; Definimos el path de los templates
(selmer/set-resource-path! "/etc/riemann/templates")

(defn send-event-to-email
  "Envia un evento a la lista de emails del proyecto"
  [to subject body]
  (postal.core/send-message
    {}
    {
      :from FROM_EMAIL
      :to to,
      :subject subject,
      :body body
    }
  )
)

; Funcion de ejemplo para enviar un email
(defn alerta
  "Envia evento de alerta a un proyecto"
  [e]
  (let [
         msg-body [{
                    :type "text/html"
                    :content (selmer/render-file "template.html" e)
                  }]
       ]
    (send-event-to-email ["worklzt@gmail.com", "adrianlzt@gmail.com"] "cabecera" msg-body)
  )
)


No hace falta reiniciar reimann al modificar un template
http://stackoverflow.com/a/19297746




