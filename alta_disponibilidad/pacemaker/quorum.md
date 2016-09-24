En la configuración por defecto, el cluster tendra activos los recursos siempre que exista quorum.
En un cluster con dos nodos esto no tiene sentido, porque al caer uno de los nodos no existirá quorum (necesitaríamos los dos votos).
Existe quorum cuando: 2 * active_nodes > total_nodes

Para desactivarlo:
property $id="cib-bootstrap-options" \
    ...
    no-quorum-policy="ignore"


Podemos ver si hay o no quorum mirando en la línea "Current DC" del crm_mon.


pcs property set no-quorum-policy=ignore

