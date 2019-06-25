# Organización de los datos
Los pool son las particiones lógicas donde almacenaremos la información. Por ejemplo, podemos crear un pool distinto por cada aplicación que tuviesemos.

Cada pool estará formado por un conjunto de placement groups. El número de PGs está definido por el número de OSD * máximo número de PGs por OSD (mon_max_pg_per_osd).

Cada placement group se almacenará en N OSD (siendo N la réplica/size del pool, 3 por defecto). CRUSH es quien decide, dinámicamente, que OSDs corresponden a un PG.
Un OSD tendrá varios PGs asociados.

Cuando almacenamos un objeto, se le asignará un PG donde debe ser almacenado y este PG estará replicado en N OSDs.
El cliente le dice a ceph el pool donde quiere almacenar el objeto y el object-id, ceph contesta con el id del PG que debe usar el cliente para almacenar la información. Ej: 4.f2 (pool 4, pg f2)
Consultado el PG map (mirar cluster_map.md) puede saber en que OSDs debe escribir la información.



# Pools
mirar pools.md



# PG placement groups
http://docs.ceph.com/docs/master/rados/operations/placement-groups/
http://docs.ceph.com/docs/master/architecture/#mapping-pgs-to-osds
https://access.redhat.com/documentation/en-us/red_hat_ceph_storage/1.3/html/storage_strategies_guide/placement_groups_pgs

Es un paso intermedio al almacenar/recuperar objetos.
Los objetos se almacenan en PGs y los PGs se almacenan en OSDs.
Evitamos que los clientes intenten hablar directamente con los OSDs, que son piezas que pueden desaparecer.

El número de pools viene definido por el número de OSDs y la cantidad de PGs que permitimos por OSD.
Cada PG consume recursos, por eso debemos limitar el número de estos (http://docs.ceph.com/docs/master/rados/operations/placement-groups/#memory-cpu-and-network-usage)
Crear PGs (generalemente dos órdenes de magnitud que el número de OSDs) nos permite tener una distribución de los datos correcta entre los OSDs.
CUIDADO! si tenemos pocos PGs y luego queremos crear más pools no podremos.

Usar http://ceph.com/pgcalc/ para calcular el número de PGs por pool.
Esta calculadora nos dará el número de PGs por cada pool que necesitamos crear para usar RGW y además podemos añadirles nuestros propios buckets para que también lo tenga en cuenta.
Al final lo que hace es asignar no muchos PGs a pools que no van a ser muy grandes, y muchos PGs al pool que almacenará los datos del RGW.
Crear todos los pools que solicita, si no luego puede que necesitemos alguno de esos pools y no tengamos espacio (por ejemplo si empezamos a usar rgw multipart, que necesita de ciertos PGs)
Para rgw multipart necesitamos:
default.rgw.buckets.non-ec
default.rgw.buckets.extra


Por defecto (al menos con la instalación de ansible), cada pool tendra 8 PGs

Si tenemos que modificar el numero mirar errores.md

The pgp_num will be the number of placement groups that will be considered for placement by the CRUSH algorithm.
The pgp_num should be equal to the pg_num.


Configuración:
osd pool default pg num
osd pool default pgp num

Será el número por defecto de PGs/PGPs para nuevos pools. TODO: no lo entiendo muy bien, porque al crear los pools hay que especificar su pg_num. Es para otros procesos que crean pools automáticamente?

El número máximo de PGs que se pueden crear en un OSD viene definido por:
osd max pg per osd hard ratio * mon max pg per osd

ceph --show-config | grep -e "max_pg_per_osd"
Por defecto es 200*2=400 PGs/OSD

Lo que veo es que al intentar crear un nuevo pool, no nos deja sobrepasar el límite de PGs dado por mon_max_pg_per_osd * num_osds
Pero luego, al hacer un "ceph pg dump", si veo que algunos OSDs superan los 200 PGs.
Entiendo que "hard ratio * mon max pg per osd" es un hard limit, y que mon_max_pg_per_osd es el soft limit que se aplica al crear pools.




# CRUSH
http://docs.ceph.com/docs/master/rados/operations/crush-map/
https://ceph.com/wp-content/uploads/2016/08/weil-crush-sc06.pdf

Controlled Replication Under Scalable Hashing. It is the algorithm Ceph uses to compute object storage locations.
CRUSH: es el encargado de saber donde almancear los datos y donde ir a recuperarlos.
Funciona teniendo como inputs un "cluster map" y unas "placement rules".

Permite que los clientes se comuniquen directamente con los OSDs en vez de tener que pasar por un punto central.

Las políticas de CRUSH nos permiten decidir donde replicar la información teniendo en cuenta si los OSD están en el mismo server, usan la misma fuente de alimentación, mismo rack, mismo datacenter, etc
Por defecto (crush chooseleaf type = 1), se separan las réplicas para que no caigan dos en el mismo host.

En caso de que el cluster cambie, los datos serán movidos al sitio que deberán ser buscados.


## CRUSH Tree
Obtener el arbol de organización que está usando crush
ceph osd crush tree


## Rules
Lista de rules:
ceph osd crush rule ls

Detalle de las reglas:
ceph osd crush rule dump





# Erasure coding (EC)
http://docs.ceph.com/docs/jewel/rados/operations/erasure-code/
http://ceph.com/community/new-luminous-erasure-coding-rbd-cephfs/
A method of data protection in which data is broken into fragments , encoded and then storage in a distributed manner. Ceph , due to its distributed nature , makes use of EC beautifully.
The default erasure code profile sustains the loss of a single OSD. It is equivalent to a replicated pool of size two but requires 1.5TB instead of 2TB to store 1TB of data.
Parece que tiene un coste en performance (https://github.com/rook/rook/issues/1733#issuecomment-398463316)


# FSID
Identificador del cluster
Está escrito en los discos OSD.
Podemos verlo montando el disco y mirando el fichero ceph_fsid



# Analizar crush map para ver llenado
Mirar en osd.md
https://ceph.com/planet/predicting-which-ceph-osd-will-fill-up-first/
