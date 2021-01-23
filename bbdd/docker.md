Razones que ofrece la gente de EventStore para no usar containers para su db:
https://eventstore.com/blog/event-store-on-kubernetes/

Problemas con el aislamiento del page cache.
Las db pueden hacer uso intensivo del page cache, que si no está correctamente aislado puede impactar:
https://engineering.linkedin.com/blog/2016/08/don_t-let-linux-control-groups-uncontrolled
Parece que puede ser un problema con máquinas que tengan escasez de memoria.
La memoria no se reserva para los cgroups, solo se limita. Por lo que si solicitamos memoria que nos corresponde y está ocupada, el OS tendrá que liberarla, penalizando a nuestra app (sigue pasando para cgroups v2?)
Esto último no me cuadra mucho con los requests/limit de k8s: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#how-pods-with-resource-requests-are-scheduled
Entiendo que bien configurados no debería ser un problema.
Dicen que puede ser un probema si el root cgroup come más memoria de la prevista.


Latencias por las capas de virtualización de red (para dbs distribuídas). Evitar redes que no se basen en componentes userland.

Problemas con la cantidad de IOPS ofrecidas (aunque esto puede ser una limitación igualmente en bare metal).

Problemas durante la migración de procesos, que puedan colgarse las IOPS a disco.

Problemas con el deployment K8s por defecto puede no ofrecernos todo lo que necesitamos para poder hacer un rolling update o un deployment de una db distribuída (necesario un operator que conozca el estado).
