Gestor de colas.

El master gestiona unas colas donde pone tareas.
Los slaves leen de esa cola, ejecutan los comandos, y ponen la respuesta en una cola específica de respuestas.
El master lee los resultados de esa cola de respuestas.

/etc/mod_gearman/mod_gearman_neb.conf <- este fichero es el que se configura en el master
/etc/mod_gearman/mod_gearman_worker.conf <- este fichero es el que se configura en los slaves

Este software lo usamos junto con icinga para distribuir la carga de los checks.

# gearman_top -> para ver como están las colas
# gearadmin


perfdata_mode=1
Setting the value to 1 makes sure that performance data doesn't pile up endlessly in the queue when perfdata worker isn't consuming.  It's basically a precaution which prevents the queue to fill up to a point all available system memory is consumed. 


Eventhandlers
# This settings determines if all eventhandlers go into a single
# 'eventhandlers' queue or into the same queue like normal checks
# would do.
route_eventhandler_like_checks=no
