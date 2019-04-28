http://docs.ceph.com/docs/master/rados/operations/placement-groups#set-the-number-of-placement-groups

Debemos modificar el número de placement groups, el de por defecto, 60, no es ideal.


# Memoria
Metadata servers and monitors must be capable of serving their data quickly, so they should have plenty of RAM (e.g., 1GB of RAM per daemon instance). OSDs do not require as much RAM for regular operations (e.g., 500MB of RAM per daemon instance); however, during recovery they need significantly more RAM (e.g., ~1GB per 1TB of storage per daemon). Generally, more RAM is better.
