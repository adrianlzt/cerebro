Es la parte de computación de openstack

http://www.openstack.org/software/openstack-compute/



Service instance groups
Es para separar (o juntar) VMs en los mismos compute nodes.



# Query a la bd de nova para obtener info de los hypervisores
SELECT
    host,
    free_ram_mb,
    vcpus*cpu_allocation_ratio - vcpus_used as free_vcpus,
    free_disk_gb,
    memory_mb,
    ram_allocation_ratio,
    memory_mb*ram_allocation_ratio as max_ram_mb,
    vcpus,
    vcpus_used,
    cpu_allocation_ratio,
    local_gb,
    disk_allocation_ratio
FROM
    compute_nodes
ORDER BY
    host;


