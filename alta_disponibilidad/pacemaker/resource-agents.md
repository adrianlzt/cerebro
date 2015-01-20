Resource Agents:
/usr/lib/ocf/
/usr/share/cluster

# crm ra
Mirar las clases de resources disponibles:
crm(live)ra# classes

crm(live)ra# list <clase>
crm(live)ra# list ocf

OCF a su vez tiene 3 sublistas (pacemaker, heartbeat y redhat) [redhat en el caso de ser redhat, claro]
crm(live)ra# list ocf pacemaker

Para ver las posibles configuraciones
crm(live)ra# meta nombrescript

