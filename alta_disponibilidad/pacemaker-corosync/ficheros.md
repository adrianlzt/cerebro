Pacemaker puede encargarse de montar sistemas de ficheros, SCSI, NFS, etc

http://linux-ha.org/doc/man-pages/re-ra-Filesystem.html

fstype
ext4|ext4dev|ext3|reiserfs|reiser4|nss|xfs|jfs|vfat|fat|nfs|cifs|smbfs|ocfs2|gfs2|none|lustre 
Sacado de /usr/lib/ocf/resource.d/heartbeat/Filesystem


Configuracion básica de una unidad NFS:
primitive nfs ocf:heartbeat:Filesystem \
	params device="172.16.3.1:/home/share" directory="/mnt" fstype="nfs" \
	op monitor interval="20" timeout="40" depth="0"

La unidad de irá montando en el nodo que esté activo.
