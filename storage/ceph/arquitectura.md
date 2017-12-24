http://docs.ceph.com/docs/master/architecture/
http://ceph.com/geen-categorie/zero-to-hero-guide-for-ceph-cluster-planning/
http://docs.ceph.com/docs/jewel/start/hardware-recommendations/
https://es.slideshare.net/mirantis/ceph-talk-vancouver-20
https://www.virtualtothecore.com/en/adventures-ceph-storage-part-2-architecture-dummies/
  video de como funciona la arquitectura

Minimum hardware recomentations: http://docs.ceph.com/docs/master/start/hardware-recommendations/#minimum-hardware-recommendations

# Red
http://docs.ceph.com/docs/master/start/hardware-recommendations/#networks
Usar redes de 10Gbps
We recommend that each host have at least two 1Gbps network interface controllers (NICs) (una para la red por donde se realiza la replicación y otra para la red de servicio/frontend)
Consider starting with a 10Gbps network in your racks. Replicating 1TB of data across a 1Gbps network takes 3 hours, and 3TBs (a typical drive configuration) takes 9 hours. By contrast, with a 10Gbps network, the replication times would be 20 minutes and 1 hour respectively

# OSDs (ceph-osd)
Los servidores donde se hace el almacenamiento deben ser dedicados.
Con un servicio OSD por cada disco duro
Mínimo dos
CPU: Ceph OSDs run the RADOS service, calculate data placement with CRUSH, replicate data, and maintain their own copy of the cluster map. Therefore, OSDs should have a reasonable amount of processing power (e.g., dual core processors).
Memoria: 500MB of RAM per daemon instance (during recovery they need significantly more RAM, ~1GB per 1TB of storage per daemon)
Disco: Ceph has to write all data to the journal before it can send an ACK (for XFS at least, parece que brtfs arregla esto, pero no esta listo para producción), having the journal and OSD performance in balance is really important!
Parece que es razonable meter los journal en discos SSDs separados, pero si no podemos usar los propios discos para almacenar tambien el journal.
En los discos donde esten los OSDs no poner nada más (no servidor de metadata, no server de mon)
Ceph best practices dictate that you should run operating systems, OSD data and OSD journals on separate drives.
Red: the sum of the total throughput of your OSD hard disks doesn’t exceed the network bandwidth required to service a client’s need to read or write data


# Monitores (ceph-mon)
Al menos tres (para tener quorum).
No requiere mucho hardware (A 1U server with low cost processor E5-2603,16GB RAM and 1GbE network should be sufficient in most of the cases)
Cuidado porque pueden generar muchas trazas de log, sobre todo si el cluster esta un healthy.
Correr los monitores sobre hardware separado para evitar un single point of failure (no montar tres VMs sobre la misma máquina física)
Podemos meterlos en los nodos que vayan a ser los cientes del cluster ceph
CPU: Monitors simply maintain a master copy of the cluster map, so they are not CPU intensive
Memoria: 1GB of RAM per daemon instance.

# Managers (ceph-mgr)
http://docs.ceph.com/docs/master/mgr/
A partir de Luminious (12.x) se requiren nodos mananger. Generalmente se configurarán los nodos monitores también como managers


# RGW (ceph-rgw)=
RESTful API interface compatible with Amazon S3 , OpenStack Swift .

# RBD (Raw Block Device)
Provides Block Storage to VM / bare metal as well as regular clients , supports OpenStack and CloudStack . Includes Enterprise features like snapshot , thin provisioning , compression

# CephFS
Filesystem distribuido

# Metadata (ceph-mds)
CPU: Ceph metadata servers dynamically redistribute their load, which is CPU intensive. So your metadata servers should have significant processing power (e.g., quad core or better CPUs).
Memoria: 1GB of RAM per daemon instance
Creo que este server solo es necesario si usamos cephfs


# Recomendaciones

## POC Environment
Can have a minimum of 3 physical nodes with 10 OSD’s each. This provides 66% cluster availability upon a physical node failure and 97% uptime upon an OSD failure. RGW and Monitor nodes can be put on OSD  nodes but this may impact performance  and not recommended for production.

## Production Environment
a minimum of 5 physically separated nodes and minimum of 100 OSD @ 4TB per OSD the cluster capacity is over 130TB  and provides 80% uptime on physical node failure and 99% uptime on OSD failure. RGW and Monitors should be on separate nodes.
