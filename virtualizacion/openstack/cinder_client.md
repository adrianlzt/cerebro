cinder list
cinder delete VOL_ID
cinder migrate
  mover volume a otro host

cinder create --display-name nombre 10
  volumen en gigas

nova volume-attach INSTANCE_ID VOLUME_ID auto
  The auto parameter indicates that Nova must attempt to automatically assign a device identifier to the volume within the guest.
  Manual allocation of specific device identifiers within the guest is not supported on KVM hypervisors at this time.

parted para particionar el disco
y (o directamente sin parted)
mkfs.ext4 /dev/vdb
  o el tipo de FS que queramos en el disco que nos haya dicho el attach

nova volume-deattach INSTANCE_ID VOLUME_ID

