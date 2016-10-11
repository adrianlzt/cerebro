http://docs.icinga.org/latest/en/flapping.html

Detectar hosts o services que están cambiando rápidamente su estado.
Es difícil como se detecta esto, es respecto a un porcentaje sobre las últimas muestras.


(7 observed state changes / possible 20 state changes) * 100 = 35 %


Para desactivarlo:
flap_detection_enabled 0

Si ya está flappin no se va
Parar icinga, quitar estados flapping el status.dat y volver a arrancar.

Enviar muchos estados OK al serv/host ?
