https://github.com/ClusterLabs/resource-agents

Resource Agents:
/usr/lib/ocf/
/usr/share/cluster

Ejecutar a mano un ocf (ejemplo con lvm):
export OCF_ROOT=/usr/lib/ocf
export OCF_RESKEY_volgrpname="vg_MySQL"
/usr/lib/ocf/resource.d/heartbeat/LVM status


# crm ra
Mirar las clases de resources disponibles:
crm(live)ra# classes

crm(live)ra# list <clase>
crm(live)ra# list ocf

OCF a su vez tiene 3 sublistas (pacemaker, heartbeat y redhat) [redhat en el caso de ser redhat, claro]
crm(live)ra# list ocf pacemaker

Para ver las posibles configuraciones
crm(live)ra# meta nombrescript



Los timeouts de start, stop, status vienen definidos, sus valores por defecto, en los agentes.
