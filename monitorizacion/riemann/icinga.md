Riemann can send events (http://riemann.io/api/riemann.nagios.html) to nagios (using nsca) and Riemann-ocsp (https://github.com/camptocamp/riemann-ocsp/) can send events from nagios.

# Riemann ocsp
https://github.com/camptocamp/riemann-ocsp/

Hace uso del "Obsessive Compulsive Service Processor" http://docs.icinga.org/latest/en/configmain.html#configmain-ocsp_command

./riemann_ocsp "juanon" "disco" "ok" "ta todo bien | sda=2;;;" 40 localhost:5555

Mete esto en riemann

[
    {
        "description": "ta todo bien | sda=2;;;", 
        "host": "juanon", 
        "metric": 0, 
        "service": "disco", 
        "state": "ok", 
        "tags": [
            "nagios"
        ], 
        "time": 1468411251, 
        "ttl": 40
    }
]


Conf en icinga.

Definir el command:
define command {
        command_line                   /usr/local/bin/submit_ocsp $HOSTNAME$ $SERVICEDESC$ $SERVICESTATEID$ $SERVICEDESC$ $_PROJECT$ $SERVICEDOWNTIME$
        command_name                   submit_ocsp
}
define command {
        command_line                   /usr/local/bin/submit_ocsp $HOSTNAME$ $HOSTSTATEID$ $HOSTOUTPUT$ $_PROJECT$ $HOSTDOWNTIME$
        command_name                   submit_ochp
}

Crear el script /usr/local/bin/submit_ocsp (recordar chmod a+rx):
#!/bin/sh
if [[ ! -z "$5" ]]; then
  PROJECT="-p $5"
else
  PROJECT = ""
fi
/usr/local/bin/riemann_ocsp -h "$1" -s "$2" -r "$3" -m "$4" -p "$PROJECT" -d $6

Crear el script /usr/local/bin/submit_ochp (recordar chmod a+rx):
#!/bin/sh
if [[ ! -z "$4" ]]; then
  PROJECT="-p $4"
else
  PROJECT = ""
fi
/usr/local/bin/riemann_ocsp -h "$1" -s "HOSTSTATE" -r "$2" -m "$3" -p "$PROJECT" -d $5



Copiar el binario (recordar chmod a+rx)
/usr/local/bin/riemann_ocsp

Habilitarlo en icinga:
# Integracion con Riemann
obsess_over_services=1
ocsp_command=submit_ocsp
obsess_over_hosts=1
ochp_command=submit_ochp


Añadir un fichero especifico a la config de riemann:

(let [index (index)]
  ; Inbound events will be passed to these streams:
  (streams
    (default :ttl 60
      ; Index all events immediately.
      index

      ; Log expired events.
      (expired
        (fn [event] (info "expired" event)))))
  ; Icinga
  (tagged-any ["nagios"]
    (include "icinga.clj")))

En icinga.clj ponemos las reglas. Ejemplo:
(streams
  #(info %))



Notifica un cambio de estado similar a como funciona icinga con los estados soft y hard
Por cada pareja host/service, si llegan 3 estados consecutivos no-ok, se notifica
Si llega un estado ok, se pone a ok.
(by [:host :service]
  (pipe -
    (where (not (state "ok"))
      (runs 3 :state
        -
      )
    (else
      -
    ))
    (changed :state {:init "ok"}
      #(warn "Ha cambiado de estado" %)
    )
  )
)



# Problemas
Con el metodo de ocsp no podemos enviar las metricas, porque está pensado para enviar una métrica por cada evento, mientras que en icinga pueden venir varios valores de perfdata.

Al almacenar en la base de datos dice que lo hace usando de clave primaria la pareja host-service. ¿Qué pasa si tenemos dos hosts que se llamen igual y la misma métrica?
