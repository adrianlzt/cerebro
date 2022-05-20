http://virt-tools.org/learning/install-with-command-line/

Crear disco de 20.000MB:
qemu-img create -f qcow2 disk.qcow2 20000

Crear maquina NOMBRE con 1GB de ram, un cd montado y apuntado al dico (full path):
wget http://ftp.rediris.es/mirror/archlinux/iso/2022.05.01/archlinux-2022.05.01-x86_64.iso
sc-start libvirtd
sudo virt-install -r 1024 -n arch -f disk.qcow2 --cdrom archlinux-2022.05.01-x86_64.iso --graphics=vnc

Conectar por VNC al puerto 5900

por defecto nos pone un procesador de 32 bits
Creo que es la opción --cpu pero no se que parametros.
Opciones:
kvm -cpu \?


Usar una imagen ya existente:
virt-install --name githubEnterprise --memory 1024 --disk /adri/github-enterprise-2.3.0.qcow2 --import

tuve que poner 777 a /adri/* no entiendo muy bien que permisos espera
