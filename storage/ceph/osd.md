http://docs.ceph.com/docs/master/rados/deployment/ceph-deploy-osd/

Los distintos OSDs almacenan su info en
/var/lib/ceph/osd/ceph-N

El fichero block será un link a la partición en uso:
block -> /dev/disk/by-partuuid/979f43bf-1747-432f-9aa6-367415a72b9f

Para mirar a que disco corresponse usaremos:
blkid | grep 979
/dev/sdc2: PARTLABEL="ceph block" PARTUUID="979f43bf-1747-432f-9aa6-367415a72b9f"
