https://access.redhat.com/solutions/162193

No usar con GFS2.
Cuidado por que genera más tráfico.

UDPU transport in use
RHEL 6: <cman transport="udpu"/> in `/etc/cluster/cluster.conf
RHEL 7: totem { transport: udpu } in /etc/corosync/corosync.conf



As of the Red Hat Enterprise Linux 6 Update 2 release and the release of RHEL 7, Red Hat High-Availability Add-On nodes can communicate with each other using the UDP Unicast transport mechanism. It is recommended, however, that you use IP multicast for the cluster network. UDP unicast is an alternative that can be used when IP multicast is not available.

The recommendation to avoid UDPU is especially true when using GFS2. UDPU works by sending group messages directly to all nodes separately, rather than sending a single packet to the multicast address and allowing the network infrastructure to deliver it to subscribed members. This method has higher overhead, and thus does not scale as well with very large numbers of messages as well as multicast would. Because GFS2-based workloads often can result in these increased levels of communication, they are often susceptible to demonstrating worse performance on UDP-unicast than with UDP-multicast. As such, Red Hat does not recommend using UDPU with GFS2-based workloads.

The performance implications of UDPU can also be expected to increase with larger clusters.

NOTE: In some cases other workloads besides those based on GFS2 with large amounts of group-messing traffic such as those that use cmirror or messaging applications could suffer similar degradation by the use of UDPU. It is recommended that each use deployment with UDPU be thoroughly evaluated and tested to determine which transport is optimal.
