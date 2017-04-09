http://docs.ceph.com/docs/hammer/rados/operations/user-management/

/usr/bin/ceph auth get-or-create client.cyclops mon 'allow r' > /etc/ceph/client.cyclops.keyring

ceph -k /etc/ceph/client.cyclops.keyring -n client.cyclops health


Estado de los monitores:
ceph mon stat

nos dice los nombres de los monitores


You should also consider what percentage of the overall data the cluster stores on each host. If the percentage on a particular host is large and the host fails, it can lead to problems such as exceeding the full ratio, which causes Ceph to halt operations as a safety precaution that prevents data loss.
