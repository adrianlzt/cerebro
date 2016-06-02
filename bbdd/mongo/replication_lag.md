http://blog.mlab.com/2013/03/replication-lag-the-facts-of-life/#What_is_replication_lag

An ISODate formatted date string that reflects the last entry from the oplog that this member applied. If this differs significantly from lastHeartbeat this member is either experiencing “replication lag” or there have not been any new operations since the last update. Compare members.optimeDate between all of the members of the set.

For a given secondary node, replication lag is the delay between the time an operation occurs on the primary and the time that same operation gets applied on the secondary.


The output of the replSetGetStatus command is the data about the set from the point of view of the node where you are running the command; it is not an atomic point in time across all nodes. There is, in fact, no way to atomically query all nodes in a replica set at an exact moment in time, so there isn't a way to calculate lag exactly at any moment in time.


Bug por encontrar un secondary más actualizando que el primary:
https://jira.mongodb.org/browse/SERVER-24360
