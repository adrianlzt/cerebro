https://www.redhat.com/en/resources/red-hat-ceph-storage-hardware-selection-guide
https://access.redhat.com/documentation/en-us/red_hat_ceph_storage/3/html/red_hat_ceph_storage_hardware_selection_guide/index

https://access.redhat.com/documentation/en-us/red_hat_ceph_storage/3/html/red_hat_ceph_storage_hardware_selection_guide/hardware-selection-general-principles
Use Identical Hardware: create pools and define CRUSH hierarchies such that the OSD hardware within the pool is identical.


http://docs.ceph.com/docs/master/rados/operations/placement-groups#set-the-number-of-placement-groups

Debemos modificar el número de placement groups, el de por defecto, 60, no es ideal.


# Memoria
Metadata servers and monitors must be capable of serving their data quickly, so they should have plenty of RAM (e.g., 1GB of RAM per daemon instance). OSDs do not require as much RAM for regular operations (e.g., 500MB of RAM per daemon instance); however, during recovery they need significantly more RAM (e.g., ~1GB per 1TB of storage per daemon). Generally, more RAM is better.

http://docs.ceph.com/docs/master/start/hardware-recommendations/#ram
OSDs that use the BlueStore backend require 3-5 GB of RAM
You can adjust the amount of memory the OSD consumes with the osd_memory_target configuration option when BlueStore is in use.
Por defecto puesto a 4GiB (4294967296)

Según https://access.redhat.com/solutions/3958361 ansible se empeña en poner 4GB como mínimo.
The ceph.conf building script calculates the final osd_memory_target per node based on number of RAM and OSDs on the node. If the calculated value is lower then default 4GB , default is set anyway
if the (GB_RAM/OSDs > 4GB) use calculated value, otherwise default 4GB

En el rol de ansible parece que andan moviéndolo. Al principio con 4GB de mínimo, luego pudiendo definirlo y luego que sea al menso 896MB
https://github.com/ceph/ceph-ansible/commit/aa6e1f20eaa5272ff0bb5e8b3cded16273aa120c

Setting the osd_memory_target below 2GB is typically not recommended (it may fail to keep the memory that low and may also cause extremely slow performance.
https://github.com/ceph/ceph/blob/8624f6f93d2b58ad919a2d9476f90a90d79acf09/doc/start/hardware-recommendations.rst#memory


Monitor and manager daemon memory usage generally scales with the size of the cluster. For small clusters, 1-2 GB is generally sufficient. For large clusters, you should provide more (5-10 GB). You may also want to consider tuning settings like mon_osd_cache_size or rocksdb_cache_size.

Mirar en osd.md
