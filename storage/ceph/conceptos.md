# CRUSH
http://ceph.com/docs/master/rados/operations/crush-map/
CRUSH: es el encargado de saber donde almancear los datos y donde ir a recuperarlos.
Funciona teniendo como inputs un "cluster map" y unas "placement rules".

En caso de que el cluster cambie, los datos serán movidos al sitio que deberán ser buscados.




# Erasure coding (EC)
http://docs.ceph.com/docs/jewel/rados/operations/erasure-code/
http://ceph.com/community/new-luminous-erasure-coding-rbd-cephfs/<Paste>
A method of data protection in which data is broken into fragments , encoded and then storage in a distributed manner. Ceph , due to its distributed nature , makes use of EC beautifully.



# PG placement groups
http://docs.ceph.com/docs/jewel/rados/operations/placement-groups/
Less than 5 OSDs set pg_num to 128
Between 5 and 10 OSDs set pg_num to 512
Between 10 and 50 OSDs set pg_num to 4096

Varios objetos se mapean a un PG y un PG se mapea a N OSDs (N es el número de réplicas)
Si tenemos que modificar el numero mirar errores.md
