tar xvf imagen.ova

.ova ->
	.ovf
	.vmdk


qemu-img convert -O qcow2 Evergreen_trunk_Squeeze-disk1.vmdk Evergreen_trunk_Squeeze.qcow2

Crear una maquina virtual y ponerle el qcow2 como disco
