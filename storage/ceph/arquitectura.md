http://ceph.com/geen-categorie/zero-to-hero-guide-for-ceph-cluster-planning/
http://docs.ceph.com/docs/jewel/start/hardware-recommendations/
https://es.slideshare.net/mirantis/ceph-talk-vancouver-20

# OSDs (ceph-osd)
Los servidores donde se hace el almacenamiento deben ser dedicados.
Con un servicio OSD por cada disco duro
Mínimo dos
Ceph OSDs run the RADOS service, calculate data placement with CRUSH, replicate data, and maintain their own copy of the cluster map. Therefore, OSDs should have a reasonable amount of processing power (e.g., dual core processors).

# Monitores (ceph-mon)
Al menos tres (para tener quorum).
No requiere mucho hardware (A 1U server with low cost processor E5-2603,16GB RAM and 1GbE network should be sufficient in most of the cases)
Cuidado porque pueden generar muchas trazas de log, sobre todo si el cluster esta un healthy.
Correr los monitores sobre hardware separado para evitar un single point of failure (no montar tres VMs sobre la misma máquina física)
Podemos meterlos en los nodos que vayan a ser los cientes del cluster ceph
Monitors simply maintain a master copy of the cluster map, so they are not CPU intensive


# RGW (ceph-rgw)=
RESTful API interface compatible with Amazon S3 , OpenStack Swift .

# RBD (Raw Block Device)
Provides Block Storage to VM / bare metal as well as regular clients , supports OpenStack and CloudStack . Includes Enterprise features like snapshot , thin provisioning , compression

# CephFS
Filesystem distribuido

# Metadata (ceph-mds)
Ceph metadata servers dynamically redistribute their load, which is CPU intensive. So your metadata servers should have significant processing power (e.g., quad core or better CPUs).
Creo que este server solo es necesario si usamos cephfs


# Recomendaciones

## POC Environment
Can have a minimum of 3 physical nodes with 10 OSD’s each. This provides 66% cluster availability upon a physical node failure and 97% uptime upon an OSD failure. RGW and Monitor nodes can be put on OSD  nodes but this may impact performance  and not recommended for production.

## Production Environment
a minimum of 5 physically separated nodes and minimum of 100 OSD @ 4TB per OSD the cluster capacity is over 130TB  and provides 80% uptime on physical node failure and 99% uptime on OSD failure. RGW and Monitors should be on separate nodes.
