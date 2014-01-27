En la configuración puesta en telefónica tenemos dos nodos master puestos en activo-pasivo con pacemaker.
Dos searchers, dos indexers y dos heavy forwarders.

http://docs.splunk.com/Documentation/Splunk/6.0/Indexer/Takeapeeroffline
Si necesitamos parar uno de los indexes deberemos hacerlo con el comando offline, porque de otra manera podremos romper búsquedas en progreso, y actualizaciones que se estén realizando sobre los buckets.

splunk offline: This is the fast version of the offline command, intended mainly for taking a peer offline temporarily. The peer goes down after a maximum of 5-10 minutes, even if searches are still in progress. You can use this version of the command to bring the peer down briefly without kicking off any bucket-fixing activities. You can also use this version in cases where you want the peer to go down permanently but quickly, with the bucket-fixing occurring after it's down.

splunk offline --enforce-counts: This is the enforce-counts version of the command, intended for use when you want to take a peer offline permanently but only after the cluster has returned to the complete state. If you invoke the enforce-counts flag, the peer doesn't shut down until all search and remedial activities have completed.

After the peer shuts down, you have 60 seconds (by default) to complete any maintenance and bring the peer back online. If the peer does not return to the cluster within this time, the master initiates bucket-fixing activities to return the cluster to a complete state. If you need more time, you can extend the time the master waits for the peer to come back online by configuring the restart_timeout attribute, as described in "Extend the restart period".

Si necesitamos más tiempo: splunk edit cluster-config -restart_timeout <seconds>

Para subir los 60 segundos en la configuración: splunk/etc/system/default/server.conf:restart_timeout = 600


Después de poner el nodo down podremos reiniciarlo si fuese necesario.



Para los master, en caso de tener pacekamer, migraremos el recurso splunk al otro nodo.

Para los searchers y forwarders será suficente con 'splunk stop'
