http://docs.ceph.com/docs/master/cephfs/best-practices/

Una de las tres opciones de Ceph es usarlo directamente como un filesystem, con la ventaja de que es un FS distribuido (varios clientes pueden escribir/leer en él simultánemanete).


Montando CephFS con el cliente del kernel: https://access.redhat.com/documentation/en-us/red_hat_ceph_storage/2/html/ceph_file_system_guide_technology_preview/mounting_and_unmounting_ceph_file_systems#mounting-cephfs-kernel

Montando CephFS con FUSE: https://www.howtoforge.com/tutorial/how-to-mount-cephfs-on-centos-7/



# Problemas
9/4/2017 -> technology preview en RedHat (no listo para producción)

En la web de ceph pone que se puede usar desde la 10.2.0 (que es la ultima LTS)

Para que un cliente pueda montarlo:
As a rough guide, as of Ceph 10.x (Jewel), you should be using a least a 4.x kernel. If you absolutely have to use an older kernel, you should use the fuse client instead of the kernel client.

This advice does not apply if you are using a linux distribution that includes CephFS support, as in this case the distributor will be responsible for backporting fixes to their stable kernel: check with your vendor. Parece que RedHAT/CentOS lo tienen integrado en el kernel.


Tambien hay que usar un único MDS (metadata server). Multiples MDS aun es experimental.


