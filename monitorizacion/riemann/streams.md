http://riemann.io/howto.html#working-with-streams
http://riemann.io/api/riemann.streams.html

Cada evento pasa por todos los streams.
Un evento que expira tambien vuelve a pasar por los streams.
Si queremos guardar un evento, al final del stream pondremos "index".

You can think of streams like rivers in the real world. Events flow through tributaries and streams, pool in lakes and dams, and are filtered by grates and boulders. Riemann streams aren't really queries; they're more like pipelines which events flow through.



The prn prints all events to STDOUT and the #(info %) sends events to the log file
;print events to the log
(streams
  prn

  #(info %))


# where
(where (host "db04")

custom attributes:
(where (< (:build event) 1055)

(where (service "www")
  (notify-www-team)
  (else
    (notify-misc-team)))

# match
http://riemann.io/api/riemann.streams.html#var-match

Ejecuta función si se cumple la condición.

(match :service nil prn)
(match :state #{"warning" "critical"} prn)
(match :description #"error" prn)
(match :metric 5 prn)
(match expired? true prn)
(match (fn [e] (/ (:metric e) 1000)) 5 prn)

# tags
http://riemann.io/api/riemann.streams.html#var-tagged-all
http://riemann.io/api/riemann.streams.html#var-tagged-any

tagged es un alias de tagged-all

(tagged-all ["foo" "bar"] prn) ; se llama a prn si el evento tiene esos dos tags
(tagged-any ["foo" "bar"] prn) ; se llama a prn si tiene alguna de las tags


# expired
http://riemann.io/api/riemann.streams.html#var-expired

(expired & children)
Passes on events with :state "expired".


# with
http://riemann.io/howto.html#split-streams

Cambia o define el valor de un campo (podemos inventarnos nuevos campos)
(with {:keyword "nuevovalor} 
  escope donde vale el cambio)


# by
http://riemann.io/howto.html#distinct-streams-for-each-host-service-etc

Separa por los campos que digamos. En el ejemplo changed solo aplica al state de un host determinado.
Es crear un stream separado por cada pareja host-service
(by [:host :service]
  (changed :state
    cosas que hacer))

(by [:keyword_nuestra]
  esto es valido

# changed / changed-state
(streams
  (by [:host :service]
    (changed :state
      (email "ops@startup.io"))))

Equivalente a:
(streams
  (changed-state
    (email "ops@startup.io"))) 

Para definir un estado inicial:
(streams
  (changed-state {:init "ok"}
    (email "ops@startup.io")))

#aggregate / combinar
http://riemann.io/howto.html#combine-streams

(streams
  (where (host "nombre")
    (let [aggregate (rate 5 (with :service "req rate" prn))]
      ; Return a stream which splits up events based on their service
      (splitp = service
        ; HTTP requests pass straight to the aggregate stream
        "http req rate" aggregate
        ; But we'll double the metrics for 0mq requests
        "0mq req rate"  (scale 2 aggregate)))))

Filtramos por host="nombre"
Luego creamos la variable "aggregate" que apunta a una función que agrega cada 5" cambiando el nombre de service a "req rate" y lo imprime.
Luego hacemos un switch, cogiendo los services que se llamen "http req rate" y "0mq req rate" (multiplicado por 2) y los enviamos al stream aggregate



# pipe
http://riemann.io/api/riemann.streams.html#var-pipe

(streams
  (pipe -
    (where (host "adri")
      (with :piped "true"
        prn
        -)
      (else
        (with :piped "false"
          prn)))
    (with :finpipe "true" prn)))

(pipe SIMBOLO
  ...)

Lo que hacemos es que si ponemos el SIMBOLO, seguimos por el PIPE, si no, terminamos.
En este caso, si host="adri" lo marcaremos como piped="true", lo imprimiremos y seguiremos por la pipe, marcándolo como finpipe=true" y lo volveremos a imprimir.

Si es host!="adri" lo marcaremos como piped="false" y terminaremos.

En resumen:
(pipe -
  (fun1
    (where (host "adri")
      -
      (else fin)))
  (fun2 -)
  (fun3))

host="adri" haría: fun1 -> fun2 -> fun3
host!="adri" haría: fun1 -> fin




# rate
http://riemann.io/api/riemann.streams.html#var-rate

(rate TIEMPO
  ...)

Suma todas las métricas durante TIEMPO (en segundos) y pasado ese tiempo, divide entre TIEMPO y nos da la salida.
Ejemplo, si ponemos TIEMPO=10 y enviamos, durante un periodo de 10" dos métricas con valor=1:
(1+1)/10=0.2



# rollup
http://riemann.io/api/riemann.streams.html#var-rollup
(rollup N TIEMPO
  ...)

Pasa un array de eventos al children
TIEMPO en segundos

  Deja pasar N mensajes en TIEMPO segundos. Si llegan más mensajes los guarda y los escupe todos de golpe pasados esos segundos.
  Por ejemplo, envia 3 emails máximo en una hora. El resto de eventos que lleguen durante la hora se envian todos juntos en un solo email al final de la hora


# splitp / switch
http://riemann.io/api/riemann.streams.html#var-splitp

Es como el típico switch-case

(splitp < metric
  0.9  (with :state "critical" index)
  0.75 (with :state "warning" index)
       (with :state "ok" index))

(streams
  (splitp = (:projecto event)
    "malo" (with :skype_id "23b45" prn)
    "bueno" (with :state "ok" prn)
            (with :state "warn" prn)))

(splitp = (:state event)
  "ok"        #(info "Alarma ok" %)
  "warning"   #(alerta %)
  "critical"  #(alerta %)
  "unknown"   #(alerta %)
              #(alerta %)
)


El ultimo caso es el que matchea en caso de que ninguno de los anteriores lo haya hecho. Si no poemos esta condicion, cuando algo no matchee nos saltará una expceción.



# coalesce / fusionar
http://riemann.io/api/riemann.streams.html#var-coalesce

(coalesce TIEMPO funcion)

Por cada pareja host-service, emite cada TIEMPO el último evento que recuerda, durante el ttl.

Tenemos TIEMPO=1, enviamos host1-service1-ttl10-7 una única vez, durante 10", cada segundo se enviará esa métrica a la funcion.
Si durante esos 10" cambiamos la métrica (u otro campo que no sea host-service), se enviará ese nuevo evento cada segundo a la función.

Si enviamos varios host-service distintos, cada TIEMPO enviará las dos últimas métricas almacenadas.


(streams
  (by [:project]
    (coalesce 1 prn)))

De esta manera conseguimos que también se distinga por el project. Si no pusiesemos ese by, solo aplicaría la pareja host-service y no se distinguiría

(by :service
  (coalesce
    (smap folds/sum
      (with :host nil
        prn))))

Se suman las metricas de todos los services que se llamen igual y se saca cada segundo.
by - separa por nombre de métrica
coalesce - cada segundo saca una lista del último valor de cada host
smap - suma las metricas de todos los hosts
with :host nil - quita el tag de host


# smap
http://riemann.io/api/riemann.streams.html#var-smap

Calls children with (f event)

(smap :metric prn) ; prints the metric of each event.
(smap #(assoc % :state "ok") index) ; Indexes each event with state "ok"
