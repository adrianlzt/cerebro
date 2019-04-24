http://docs.ceph.com/docs/master/rados/deployment/ceph-deploy-osd/
http://docs.ceph.com/docs/master/rados/operations/control/#osd-subsystem

Los OSDs son los discos que usamos para almacenar la info.

Si añadimos nuevos OSDs se mueven los ficheros para reordenar los datos.
En el dashboard veía mensajes tipo:
2019-04-23 11:55:24.143641 [WRN]  Health check update: 47490/569628 objects misplaced (8.337%) (OBJECT_MISPLACED)



Estado de los distintos OSD
ceph osd status

Más info del uso de los discos
ceph osd df

VAR: variancia respecto a la media


Los distintos OSDs almacenan su info en
/var/lib/ceph/osd/ceph-N

El fichero block será un link a la partición en uso:
block -> /dev/disk/by-partuuid/979f43bf-1747-432f-9aa6-367415a72b9f

Para mirar a que disco corresponse usaremos:
blkid | grep 979
/dev/sdc2: PARTLABEL="ceph block" PARTUUID="979f43bf-1747-432f-9aa6-367415a72b9f"


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



## Manual
Primero testear que cambios se van a hacer:
ceph osd test-reweight-by-utilization

Luego hacer el rebalanceo
ceph osd reweight-by-utilization
