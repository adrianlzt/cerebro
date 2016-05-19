La información de cada instancia se guarda en los compute nodes en:
/var/lib/nova/instances/xxxxx/

Aqui encontramos:
console.log: ASCII English text, with very long lines, with CRLF, CR, LF line terminators, with escape sequences
disk:        Qemu Image, Format: Qcow , Version: 2
disk.info:   ASCII text
libvirt.xml: ASCII text

El disco (solo pesa 16MB) luego parece que hace referencia a otros sitios.
Cuando intento usarlo desde otra ubicación me pide:
/var/lib/nova/instances/_base/a4f95a74d587ba93cc89a9c36c95fcd12f74c906

Podemos verlo con:
qemu-img info disk


Cada instancia es un proceso /usr/libexec/qemu-kvm corriendo
Viendo los FDs abiertos podemos ver como escribe/lee de:
l-wx------. 1 qemu qemu 64 Mar 16 11:28 1 -> /var/log/libvirt/qemu/instance-00007c92.log
lrwx------. 1 qemu qemu 64 Mar 16 11:28 10 -> /var/lib/nova/instances/25a4cda8-2c89-4c26-8c62-2d7a43001ec7/disk
l-wx------. 1 qemu qemu 64 Mar 16 11:28 2 -> /var/log/libvirt/qemu/instance-00007c92.log
l-wx------. 1 qemu qemu 64 Mar 16 11:28 4 -> /var/lib/nova/instances/25a4cda8-2c89-4c26-8c62-2d7a43001ec7/console.log

Y otros sockets, pipes, etc


Como conectar a la pts donde esta redirect?
repty?



Run gdb -p 7214, and do:

p dup2(open("/dev/pts/your-pts-number", 1), 1)
detach
quit
