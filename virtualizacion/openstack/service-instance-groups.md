# Service instance groups
Es para separar (o juntar) VMs en los mismos compute nodes.
La idea es, por ejemplo, marcar las instancias con mucho consumo IO para que no corran en los mismos hosts
Affinity / Anti-affinity schedule

Como funciona:
nova server-group-create NOMBRE_GRUPO --policy anti-affinity
nova boot --group NOMBRE_GRUPO

