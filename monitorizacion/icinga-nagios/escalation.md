http://docs.icinga.org/latest/en/escalations.html

Icinga supports optional escalation of contact notifications for hosts and services. Escalation of host and service notifications is accomplished by defining host escalations and service escalations in your object configuration file(s).

Avisar a otros hostgroups cuando se produzcan más notificaciones.
No me queda claro si avisar a la segunda notificación es:
ok->crit->ok->crit
o, ok->crit (y que los siguientes checks sigan petando)


No se puede poner * es host y service.
http://docs.icinga.org/latest/en/objecttricks.html

Dara el error:
Error: Could not expand services specified in service escalation

