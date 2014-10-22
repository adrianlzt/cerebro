http://geekpeek.net/drbd-management-command-usage/

Para montar el disco en el otro nodo:
nodo1# drbdadm secondary disk1
nodo2# drbdadm primary disk1.
nodo2# mount /dev/drbd1 /mnt

