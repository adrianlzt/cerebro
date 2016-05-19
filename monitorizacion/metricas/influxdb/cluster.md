El cluster es solo para la version de pago:
https://influxdata.com/blog/update-on-influxdb-clustering-high-availability-and-monetization/
Parece que el precio será: $399 per month

Para la version opensource hay disponible high availability: mirar ha.md


# ANTIGUO

https://docs.influxdata.com/influxdb/v0.10/guides/clustering/
0.10.0

# Meta nodes
coordinate activity in the cluster. Meta nodes do not require significant system resources and can run on a very lightweight server.

# Data nodes
store data and respond to queries. Data nodes must run on systems with at least 2 CPUs, 4GB RAM, and storage with 1000 IOPS. See the hardware sizing guide for more detail.


# Del post de la nueva version 0.10.0
We now have the concept of a Meta Node and a Data Node. By default, all servers in a cluster will act as both. However, it’s now possible to separate them. This means in very large clusters or configurations where Data Nodes are under heavy load, Meta Nodes can be separated. Another configuration that is useful is with two nodes that act as both Meta and Data nodes, while a third, lesser powered node can act only as a Meta node. This is kind of similar to some other databases that allow you to run with two large servers and an “arbiter”.

Clustering is still marked as experimental, but our testing is ramping up and we’ve found it to be much more reliable. If you’re interested in running clusters in production with the current versions, contact@influxdata.com to schedule a consultation on how to get deployed to production with the least amount risk.
