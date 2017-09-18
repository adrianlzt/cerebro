https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-gateway.html

The local gateway module stores the cluster state and shard data across full cluster restarts.




gateway.recover_after_time
If the expected number of nodes is not achieved, the recovery process waits for the configured amount of time before trying to recover regardless. Defaults to 5m if one of the expected_nodes settings is configured.

Entiendo que cuando se para el cluster, al rearrancar, espera 5' a todos los nodos
Si no, empezará a reasignar los shards para poder tener la duplicidad necesaria con los nodos que encuentre
