https://github.com/openstack/nova/blob/bc5035343d366a18cae587f92ecb4e871aba974a/nova/api/openstack/compute/hypervisors.py

/v2.1/{tenant_id}/os-hypervisors/statistics
https://github.com/openstack/nova/blob/bc5035343d366a18cae587f92ecb4e871aba974a/nova/api/openstack/compute/hypervisors.py#L177
->
https://github.com/openstack/nova/blob/60e01bf14062fc580cb01202fccafda3851b0f68/nova/compute/api.py#L3767
->
https://github.com/openstack/nova/blob/3c522e8bf2dbf9ba3ca1261eaabc64a4f50d38f5/nova/db/api.py#L312
->
https://github.com/openstack/nova/blob/5d8fab895a6da68fff7794cb5417e408df582557/nova/db/sqlalchemy/api.py#L901

Entra en la mysql, bd nova.
De la tabla services coge los nova-compute.

La información de memoria usada, etc está en:
select * from compute_nodes\G



Agregados (como las AZ?):
select * from aggregates where deleted=0;

hosts de un agregado:
select * from aggregate_hosts where aggregate_id=9;

Host de una AZ
select host from aggregate_hosts AS ah, aggregates AS a WHERE ah.aggregate_id=a.id AND a.name = "aggr-availzone1";

Memoria de los hosts de una az:
select memory_mb,free_ram_mb,memory_mb_used,host from compute_nodes WHERE host in (select host from aggregate_hosts AS ah, aggregates AS a WHERE ah.aggregate_id=a.id AND a.name = "aggr-availzone1")\G

Porcentaje de memoria utilizada para una AZ
SELECT SUM(memory_mb_used)*100/SUM(memory_mb) FROM compute_nodes WHERE host in (SELECT host FROM aggregate_hosts AS ah, aggregates AS a WHERE ah.aggregate_id=a.id AND a.name = "aggr-availzone1");

Porcentaje de cpu utilizada para una AZ:
SELECT SUM(vcpus_used)*100/SUM(vcpus) FROM compute_nodes WHERE host in (SELECT host FROM aggregate_hosts AS ah, aggregates AS a WHERE ah.aggregate_id=a.id AND a.name = "aggr-availzone1");



SELECT SUM(memory_mb_used)*100/SUM(memory_mb) FROM compute_nodes WHERE host IN (SELECT host FROM aggregate_hosts AS ah, aggregate_metadata AS am WHERE ah.aggregate_id=am.aggregate_id AND am.key = "availability_zone" AND am.deleted = 0 AND am.value = "availzone3");


SELECT SUM(vcpus_used)*100/SUM(vcpus) FROM compute_nodes WHERE host IN (SELECT host FROM aggregate_hosts AS ah, aggregate_metadata AS am WHERE ah.aggregate_id=am.aggregate_id AND am.key = "availability_zone" AND am.deleted = 0 AND am.value = "availzone3");


Me queda saber de donde obtener el param de allocation

Parece que en la ultima version esta en la bbdd:
https://github.com/openstack/nova/blob/bc5035343d366a18cae587f92ecb4e871aba974a/nova/db/sqlalchemy/migrate_repo/versions/301_add_cpu_and_ram_ratios_for_compute_nodes.py

Tendremos que leerlo del fichero de conf.

Lista de azs:
SELECT am.value FROM aggregate_metadata AS am WHERE am.key = "availability_zone" AND am.deleted = 0;
