mirar ansible.md

http://ceph.com/install/
http://www.virtualtothecore.com/en/adventures-ceph-storage-part-3-design-nodes/
https://www.howtoforge.com/tutorial/how-to-build-a-ceph-cluster-on-centos-7/
http://www.virtualtothecore.com/en/adventures-ceph-storage-part-1-introduction/

Tienen codigo para desplegar con ansible, puppet, chef, etc

# Compatibilidades
http://docs.ceph.com/docs/master/start/os-recommendations/

Recomiendan kernels nuevos (4.4, 4.9)
CentOS 7 vale
As of December 2014, XFS is the recommended underlying filesystem type for production environments, while Btrfs is recommended for non-production environments. ext4 filesystems are not recommended because of resulting limitations on the maximum RADOS objects length.[11]



# Un unico nodo
http://docs.ceph.com/docs/master/rados/troubleshooting/troubleshooting-pg/
DO NOT mount kernel clients directly on the same node as your Ceph Storage Cluster, because kernel conflicts can arise. However, you can mount kernel clients within virtual machines (VMs) on a single node.

If you are trying to create a cluster on a single node, you must change the default of the osd crush chooseleaf type setting from 1 (meaning host or node) to 0 (meaning osd) in your Ceph configuration file before you create your monitors and OSDs. This tells Ceph that an OSD can peer with another OSD on the same host. If you are trying to set up a 1-node cluster and osd crush chooseleaf type is greater than 0, Ceph will try to peer the PGs of one OSD with the PGs of another OSD on another node, chassis, rack, row, or even datacenter depending on the setting.
