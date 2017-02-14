https://github.com/ClusterLabs/resource-agents

Resource Agents:
/usr/lib/ocf/
/usr/share/cluster

Ejecutar a mano un ocf (ejemplo con lvm):
export OCF_ROOT=/usr/lib/ocf
export OCF_RESKEY_volgrpname="vg_MySQL"
/usr/lib/ocf/resource.d/heartbeat/LVM status

Debug del lvm status
OCF_ROOT=/usr/lib/ocf OCF_RESKEY_volgrpname="vg_pnp4nagios" bash -x  /usr/lib/ocf/resource.d/heartbeat/LVM status


# Como funciona el ocf de LVM
Comprueba si el directorio /dev/NOMBREVOLUMEN existe
Si existe, hace un cd dentro y un ls. Si el ls está vacío 
https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Configuring_the_Red_Hat_High_Availability_Add-On_with_Pacemaker/s1-exclusiveactive-HAAA.html





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
