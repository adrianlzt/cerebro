Nodos de mgmt + nodos ndbd
Todos aceptan queries de lectura/escritura (rol "mysqld")

Todos los nodos tendran un fichero my.cnf donde pondrá donde encontrar al nodo de mgmt y una linea activando el storage engine NDB.

Los nodos de mgmt tendran tambien un fichero config.ini que les dice cuantas replicas deben mantener, cuanta memoria "allocate" para los datos e indices, donde buscar los data nodes, donde almacenar los datos en cada data node y donde estan los nodos "mysqld".


Performance characteristics unique to NDB Clusters requires careful building of queries. Unlike MyISAM or
InnoDB, NDB queries must be crafted to query the smaller tables first, then the larger tables in succession. Polymorphic or
several ‘join’ type queries that are popular using the non-cluster tables are simply not efficient to run on NDB tables.


Data nodes operate in a similar fashion as disk RAIDs with machines mirroring each other in pairs and writing parity to other pairs.
In order to scale, data nodes are added in pairs to the cluster.
