http://docs.ceph.com/docs/master/cephfs/best-practices/
http://docs.ceph.com/docs/jewel/start/quick-cephfs/
https://access.redhat.com/documentation/en-us/red_hat_ceph_storage/3/html/ceph_file_system_guide/

Una de las tres opciones de Ceph es usarlo directamente como un filesystem, con la ventaja de que es un FS distribuido (varios clientes pueden escribir/leer en él simultánemanete).


Montando CephFS con el cliente del kernel: https://access.redhat.com/documentation/en-us/red_hat_ceph_storage/2/html/ceph_file_system_guide_technology_preview/mounting_and_unmounting_ceph_file_systems#mounting-cephfs-kernel

Montando CephFS con FUSE: https://www.howtoforge.com/tutorial/how-to-mount-cephfs-on-centos-7/

Solo un FS por cluster


# Configuración
Necesitamos tener uno, o varios (HA), servidores de metadatos (MDS)


# NFS
Se puede montar como NFS
http://docs.ceph.com/docs/master/cephfs/nfs/
