http://docs.ceph.com/docs/master/rados/operations/placement-groups#set-the-number-of-placement-groups

Debemos modificar el número de placement groups, el de por defecto, 60, no es ideal.


# Memoria
Metadata servers and monitors must be capable of serving their data quickly, so they should have plenty of RAM (e.g., 1GB of RAM per daemon instance). OSDs do not require as much RAM for regular operations (e.g., 500MB of RAM per daemon instance); however, during recovery they need significantly more RAM (e.g., ~1GB per 1TB of storage per daemon). Generally, more RAM is better.

http://docs.ceph.com/docs/master/start/hardware-recommendations/#ram
OSDs that use the BlueStore backend require 3-5 GB of RAM
You can adjust the amount of memory the OSD consumes with the osd_memory_target configuration option when BlueStore is in use.


Monitor and manager daemon memory usage generally scales with the size of the cluster. For small clusters, 1-2 GB is generally sufficient. For large clusters, you should provide more (5-10 GB). You may also want to consider tuning settings like mon_osd_cache_size or rocksdb_cache_size.
