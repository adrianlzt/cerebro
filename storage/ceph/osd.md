http://docs.ceph.com/docs/master/rados/deployment/ceph-deploy-osd/
http://docs.ceph.com/docs/master/rados/operations/control/#osd-subsystem

Los OSDs son los discos que usamos para almacenar la info.

Si añadimos nuevos OSDs se mueven los ficheros para reordenar los datos.
En el dashboard veía mensajes tipo:
2019-04-23 11:55:24.143641 [WRN]  Health check update: 47490/569628 objects misplaced (8.337%) (OBJECT_MISPLACED)



Estado de los distintos OSD
ceph osd status

Más info del uso de los discos (el weight se asigna por la capacidad de cada disco, para que la carga sea homogénea. Creo que pocos PGs pueden hacer que la carga siga sin ser homogénea)
ceph osd df

VAR: variancia respecto a la media


Los distintos OSDs almacenan su info en (si estamos con docker, este monta el disco en ese path, por lo que solo lo veremos desde dentro del container):
/var/lib/ceph/osd/ceph-N

El fichero block será un link a la partición en uso:
block -> /dev/disk/by-partuuid/979f43bf-1747-432f-9aa6-367415a72b9f

Para mirar a que disco corresponse usaremos:
blkid | grep 979
/dev/sdc2: PARTLABEL="ceph block" PARTUUID="979f43bf-1747-432f-9aa6-367415a72b9f"

Otra opción, si usamos docker, y el link apunta a /dev/ceph-...
pvs | grep ...

Si usamos docker, para ver el mapeo de OSD.id a disco:
docker run --rm -it -e CEPH_DAEMON=OSD_CEPH_VOLUME_ACTIVATE -e OSD_ID=999 --entrypoint bash --privileged -v /dev:/dev -v /etc/ceph:/etc/ceph -v /var/run/ceph:/var/run/ceph -v /var/run/udev:/var/run/udev -v /run/lvm:/run/lvm -v /var/lib/ceph:/var/lib/ceph ceph/daemon:v4.0.0-stable-4.0-nautilus-centos-7-x86_64 -c 'ceph-volume lvm list | grep -e "osd id" -e "devices"'


# Rebalancear
Si tenemos un uso desigual de los OSDs podemos rebalancear.
Comprobar:
ceph osd df

CUIDADO! que el balanceado no esté bajando constantemente el weight y al final tengamos un problema por que estén todos bajos.
Aunque puede que esto sea un problema antiguo, porque en test-reweight-by-utilization veo el parámetro --no-increasing

Mirar que disco se va a llenar primero analizando el crush map:
https://ceph.com/planet/predicting-which-ceph-osd-will-fill-up-first/
Parece que los parámetros son viejos


## Balancer
Para las versiones >= luminous (12) existe un plugin que balancea los datos automáticamente
http://docs.ceph.com/docs/luminous/mgr/balancer/

ceph mgr module enable balancer
ceph balancer status

ceph balancer on

El balancer no funcionará si tenemos el cluster degraded.
Luego solo se activará si los PGs misplaced superan un %



## Manual automatizado
Primero testear que cambios se van a hacer:
ceph osd test-reweight-by-utilization

Luego hacer el rebalanceo
ceph osd reweight-by-utilization


## Manual
http://lab.florian.ca/?p=186
Temporarily decrease the weight of the OSD.
ceph osd reweight [id] [weight]

id is the OSD# and weight is value from 0 to 1.0 (1.0 no change, 0.5 is 50% reduction in weight)



# Consumo de memoria
https://docs.ceph.com/en/nautilus/rados/configuration/bluestore-config-ref/#automatic-cache-sizing

Cada osd consumirá lo definido en osd_memory_target (bytes)
Esa variable la habremos definido en all.yml (si desplegamos con ceph-ansible).
Ese valor se verá reflejado en /etc/ceph/ceph.conf como:
[osd]
osd_memory_target = 2147483648

CUIDADO! en la doc pone con guiones bajos, pero en algunos sitios aparece con espacios en blanco
En el rol de ansible lo ponen con espacios en blanco!


Si queremos ver el running value para cada osd:
for i in $(ceph osd ls); do echo -n "$i: "; ceph config show osd.$i osd_memory_target; done


Si no coincide el valor del ceph.conf con el running value, podemos reiniciar el osd.


Aqui dicen que recomiendan como mínimo 1GB
https://docs.ceph.com/en/nautilus/rados/troubleshooting/troubleshooting-osd/#insufficient-ram
