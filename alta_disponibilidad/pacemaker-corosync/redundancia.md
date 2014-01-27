http://www.hastexo.com/blogs/martin/2012/07/11/failover-testing-some-technical-background

If a Pacemaker setup is based on best practice assumptions, the single nodes will have at least two communication paths that are independent from each other. Normally, within a two-node cluster, one path is a direct back-to-back link between the two servers and the other is the network path over the servers' standard network connection. Redundant communication channels are highly recommended because even if one of the communication links fails, the other one is still available and the cluster nodes will know that they have not "lost" each other.


Si queremos configurar varias interfaces redundantes:
multiinterface_cman.md
multiinterface_corosync.md
