mirar convertir.md


Crear imagen:
qcow2
qemu-img create -f qcow2 /var/lib/libvirt/images/guest.qcow2 8192

raw
qemu-img create -f raw /var/lib/libvirt/images/guest.img 8192


Resize:
qemu-img resize test-0.img +10G
