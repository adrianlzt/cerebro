https://github.com/jwilder/docker-gen

Escucha eventos del socket de docker y puede generar templates a partir de esos eventos y ejecutarlos.
Realmente no hace nada con los eventos, los usa como triggers.
Cuando recibe un evento pide la lista de containers y genera la conf.
En el ToDo tienen pendiente actuar ante eventos

Ejemplo típico:
Escucho eventos de creacion de nginx, si encuentro uno nuevo, genero un script para almacenar la informacion del nuevo en etcd.
Luego regenero la conf de todos los nginx y reload a todos.


Otro caso:
Cuando un container se levante ponerlo a monitorizar.
