Monitorización:
# crm status
# crm_mon (es lo mismo)

Generar una página web con el estado del cluster:
# crm_mon --daemonize --as-html /path/to/docroot/filename.html

Display your cluster status, group resources by node, and include inactive resources in the list:
# crm_mon --group-by-node --inactive

Comprobar la conexión del cluster:
# corosync-cfgtool -s
  Aqui tenemos que mirar que la ip sea la que hemos configurado (si aparece 127.0.0.x tenemos un error), y que nos diga "no faults"
  Esto no nos informa si está conectado correctamente con el otro nodo.
  No fiarse de esta herramienta, ya que aunque el nodo esté fuera del cluster (por bloquear todas las conex al puerto configurado) sigue diciendo que todo ok
There's a catch. In a two-node cluster, if both nodes were to start while all cluster communication links are down, then Corosync would form two memberships with healthy, one-member rings. Both of the nodes would show a ring status similar to the above, but your cluster still wouldn't be communicating. So, you can't rely on corosync-cfgtool -s alone. You must also check Corosync's member list.

corosync-objctl | grep member
Tenemos que ver que esten los miembros con status "joined"


Herramientas de la version 2.x

corosync-cmapctl - A tool for accessing the object database. 
corosync-quorumtool - Set and display quorum settings

# Check the rings
corosync-objctl | fgrep members
# Check secauth, rrp_mode, transport etc.
corosync-objctl | egrep ^totem
