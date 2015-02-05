http://virt-tools.org/learning/install-with-command-line/

Crear disco de 20.000MB:
qemu-img create -f qcow2 disk.qcow2 20000

Crear maquina NOMBRE con 1GB de ram, un cd montado y apuntado al dico (full path):
virt-install -r 1024 --accelerate -n NOMBRE -f /path/to/guest.img --cdrom Fedora-14-x86_64-Live.iso

por defecto nos pone un procesador de 32 bits
Creo que es la opción --cpu pero no se que parametros.
Opciones:
kvm -cpu \?
