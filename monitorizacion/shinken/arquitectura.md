Arbitrador: parte principal. Se encarga de manter al resto. Lee la configuración, la divide en trozos y la entrega a los schedulers. Recibe los external commands, y los chequeos pasivos (los redirige al scheduler adecuado)


Scheduler: se encarga de ordenar acciones al poller y al reactioner. Trata la cola de resultados de los checks, analizandola y correlandola. Hace una carga distribuída sobre los poller. Para tener "status persistence" hay que usar un modulo retention (pickle, nagios, memcache, redis or MongoDB)


Poller: son los que lanzan los chequeos ordenados por los scheduler, y devuelven los resultados a estos. Pueden especializarse para usarse, por ejemplo, para todas las máquinas windows el mismo poller, o para un proyecto determinado.


Reactioner: envia notificaciones y ejecuta los event_handlers


Broker: exporta y maneja la información de los schedulers. No me queda muy claro su función.


Receiver (opcional): se encarga de recoger los checks pasivos, y enviar la información a los scheduler directamente. De esta manera se libera al arbitrador de esta tarea.



The various daemons can be run on a single server for small deployments or split on different hardware for larger deployments as performance or availability requirements dictate. For larger deployments, running multiple Schedulers is recommended, even if they are on the same server. Consult planning a large scale Shinken deployment for more information. http://www.shinken-monitoring.org/wiki/scaling_shinken





