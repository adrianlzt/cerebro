Ahora por defecto XFS

GFS2
  - fs distribuido
  - antes de escribir se hace un lock en el fichero
  - perdida de performance por los chequeos de si el fichero está bloqueado
  - mejor ficheros grandes. Muchos ficheros pequeños es un problema.

Mejoras en ext4
  - acceso más rápido si tenemos muuuchos ficheros pequeños
  - el driver ext4 soporta ext2 y ext3

Mejoras NFS v4.x
  - FedFS, namespaces
  - mejora de performance
  - firewall friendly

Samba v4.1 soporta SMB3.0

Soporte para storage arrays (EMC, etc)
