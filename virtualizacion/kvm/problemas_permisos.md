Usando el programa vnx (para la creacion de simulacion de entornos de red), me daba este error:
qemu-system-x86_64: -drive file=/home/adrian/.vnx/scenarios/lrst2p4-as1313/vms/A/fs/root_cow_fs,if=none,id=drive-ide0-0-0,format=qcow2: could not open disk image /home/adrian/.vnx/scenarios/lrst2p4-as1313/vms/A/fs/root_cow_fs: Permission denied


La solución es editar el fichero /etc/libvirt/qemu.conf e insertar:
security_driver = "none"
user = "root"
group = "root"

