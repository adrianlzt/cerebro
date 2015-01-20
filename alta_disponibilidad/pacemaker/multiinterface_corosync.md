http://www.sebastien-han.fr/blog/2012/08/01/corosync-rrp-configuration/


/etc/corosync/corosync.conf

rrp_mode: passive

definir dos "interface {}"


The usage of NIC bonding is mandatory for all production environment. Enabling NIC bonding + RRP make your setup ‘highly highly’ available.
NIC bonding: When bonded, two NICs appear to be the same physical device and they also have the same MAC address.


Redundant Ring Protocol (RRP)
Corosync supports the Totem Redundant Ring Protocol. It allows the use of multiple redundant local-area networks for resilience against partial or total network faults. This way, cluster communication can still be kept up as long as a single network is operational. For more information, refer to http://www.rcsc.de/pdf/icdcs02.pdf.

When having defined redundant communication channels in Corosync, use RRP to tell the cluster how to use these interfaces. RRP can have three modes (rrp_mode): if set to active, Corosync uses both interfaces actively. If set to passive, Corosync uses the second interface only if the first ring fails. If rrp_mode is set to none, RRP is disabled.
