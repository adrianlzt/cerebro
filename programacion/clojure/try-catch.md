(try
  (client/get (str "http://localhost:8081/" (get event :host)))
(catch Exception e
  (warn "Excepcion notificando" (str e))
))

