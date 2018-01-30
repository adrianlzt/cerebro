# Organización de los datos
Los pool son las particiones lógicas donde almacenaremos la información. Por ejemplo, podemos crear un pool distinto por cada aplicación que tuviesemos.

Cada pool estará formado por un conjunto de placement groups. El número de PGs está definido por el número de OSD * máximo número de PGs por OSD.

Cada placement group se almacenará en N OSD (siendo N la réplica/size del pool, 3 por defecto). Un OSD tendrá varios PGs asociados.



# Pools
mirar pools.md



# PG placement groups
http://docs.ceph.com/docs/master/rados/operations/placement-groups/
http://docs.ceph.com/docs/master/architecture/#mapping-pgs-to-osds

Es un paso intermedio al almacenar/recuperar objetos.
Los objetos se almacenan en PGs y los PGs se almacenan en OSDs

Less than 5 OSDs set pg_num to 128
Between 5 and 10 OSDs set pg_num to 512
Between 10 and 50 OSDs set pg_num to 1024
If you have more than 50 OSDs, you need to understand the tradeoffs and how to calculate the pg_num value by yourself
For calculating pg_num value by yourself please take help of pgcalc tool

Otro cálculo (http://docs.ceph.com/docs/master/rados/configuration/pool-pg-config-ref/):
  num OSDs * 100 / replica_num

Cada objeto a almacenar se asigna a un PG (dependiendo de su hash y el número de PGs que haya para el pool que estemos usando)
El contenido de un PG se almacena en N OSDs.
Los OSDs tendrán varios PGs distintos.

Por defecto (al menos con la instalación de ansible), cada pool tendra 8 PGs

Si tenemos que modificar el numero mirar errores.md

The pgp_num will be the number of placement groups that will be considered for placement by the CRUSH algorithm.
The pgp_num should be equal to the pg_num.




# CRUSH
http://docs.ceph.com/docs/master/rados/operations/crush-map/
https://ceph.com/wp-content/uploads/2016/08/weil-crush-sc06.pdf

Controlled Replication Under Scalable Hashing. It is the algorithm Ceph uses to compute object storage locations.
CRUSH: es el encargado de saber donde almancear los datos y donde ir a recuperarlos.
Funciona teniendo como inputs un "cluster map" y unas "placement rules".

En caso de que el cluster cambie, los datos serán movidos al sitio que deberán ser buscados.




# Erasure coding (EC)
http://docs.ceph.com/docs/jewel/rados/operations/erasure-code/
http://ceph.com/community/new-luminous-erasure-coding-rbd-cephfs/<Paste>
A method of data protection in which data is broken into fragments , encoded and then storage in a distributed manner. Ceph , due to its distributed nature , makes use of EC beautifully.



