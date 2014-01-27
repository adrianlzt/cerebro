Gestor de colas.

El master gestiona unas colas donde pone tareas.
Los slaves leen de esa cola, ejecutan los comandos, y ponen la respuesta en una cola específica de respuestas.
El master lee los resultados de esa cola de respuestas.

/etc/mod_gearman/mod_gearman_neb.conf <- este fichero es el que se configura en el master
/etc/mod_gearman/mod_gearman_worker.conf <- este fichero es el que se configura en los slaves

Este software lo usamos junto con icinga para distribuir la carga de los checks.

# gearman_top -> para ver como están las colas
# gearadmin
