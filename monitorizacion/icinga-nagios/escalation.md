http://docs.icinga.org/latest/en/escalations.html

Icinga supports optional escalation of contact notifications for hosts and services. Escalation of host and service notifications is accomplished by defining host escalations and service escalations in your object configuration file(s).


HACE falta un fichero por cada host-service.

# Como funciona
Esto funciona según la generacion de notificaciones.
CUIDADO! si tenemos configurado el notification_interval a 0, solo se produce una notificación, por lo que no se escalarán las notificaciones porque solo se producirá una.

Si en la conf de un host o service tenemos un notificacion_interval=1, si llegan 5 critical seguidos, como solo se genera, como máximo, una por minuto, solo se generará un evento de notificación.

Si el host/service no tiene un contacto asociado, no se escalarán correctamente las notificaciones porque se estarán perdiendo y no se contarán.
Ejemplo: sin contacto y el escalation  tiene el first_notification a 2, nunca se escalará, porque la primera notificacion se debería enviar al contacto, pero como no tiene, se pierde y nunca se produce una segunda notificacion.

Si tenemos un escalation con first_notification a 0 (da igual poner 0 o 1) y otro con first_notification a 3, y no tenemos contacto, nunca funcionará el escalado al seguno, porque en el agujero (notificación 2) se perderán las notificaciones.


Notification interval: el notification interval que definamos en un escalation afecta al host/service.
Si un escalation pone el notification interval a 0, cuando llegúe ahí se dejarán de enviar notificaciones.

Recepción de recoveries. Solo recibirán los recoveries los últimos contactos a los que fue escalada la notificación. Si primero escalamos a nivel1, luego a nivel2 y se recupera, solo nivel 2 recibirá el recovery (https://dev.icinga.org/issues/3943 Won't fix)
Si queremos que nivel1 reciba también el recovery, tenemos que ponerle en el segundo (y siguientes) escalados (lo que conllevará a que reciba la notificación una vez por cada escalado).
Podemos ir metiendo a los niveles en los siguientes escalados poniendo su last_notification a 0, o añadiendolos a la sección contacts con comas.

Si tenemos un escalado para warning y otro para critical. Si la alamar esta en warning y pasa a crítica, el contador de notificaciones se cuenta a partir de la primera warning.


# Condiciones
http://docs.icinga.org/latest/en/escalation_condition.html
Se puede hacer que solo es escale si otro host/service está en un determinado estado

También se puede poner según un timeperiod.


# Cosas
No se puede poner * es host y service.
http://docs.icinga.org/latest/en/objecttricks.html

Dara el error:
Error: Could not expand services specified in service escalation



Esto nos puede servir para que ciertos contactos solo sean avisados para ciertos services. Poniendo el escalado con notification_interval a 1. Tambien deberemos meter al contacto "normal" para que pueda recibir la notificación.


CUIDADO! no meter al contacto de escalado en el contact group de los hosts que van a levantar el escalado.
Parece que asi no avisa ni al usuario de forma normal ni mediante el escalado.
