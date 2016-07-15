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
        command_line                   /usr/local/bin/submit_ocsp $HOSTNAME$ $SERVICEDESC$ $SERVICESTATEID$ $SERVICEDESC$ $_PROJECT$
        command_name                   riemann_submit
}

Crear el script /usr/local/bin/submit_ocsp (recordar chmod a+rx):
#!/bin/sh
if [[ ! -z "$5" ]]; then
  PROJECT="-p $5"
else
  PROJECT = ""
fi
/usr/local/bin/riemann_ocsp -h "$1" -s "$2" -r "$3" -m "$4" $PROJECT



Copiar el binario (recordar chmod a+rx)
/usr/local/bin/riemann_ocsp

Habilitarlo en icinga:
# Integracion con Riemann
obsess_over_services=1
ocsp_command=riemann_submit
obsess_over_hosts=0
#ochp_command=somecommand


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



# Problemas
Con el metodo de ocsp no podemos enviar las metricas, porque está pensado para enviar una métrica por cada evento, mientras que en icinga pueden venir varios valores de perfdata.

Al almacenar en la base de datos dice que lo hace usando de clave primaria la pareja host-service. ¿Qué pasa si tenemos dos hosts que se llamen igual y la misma métrica?
