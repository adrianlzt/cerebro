/usr/bin/ceph auth get-or-create client.cyclops mon 'allow r' > /etc/ceph/client.cyclops.keyring

ceph -k /etc/ceph/client.cyclops.keyring -n client.cyclops health


Estado de los monitores:
ceph mon stat

nos dice los nombres de los monitores
