https://fabianlee.org/2021/11/18/kvm-deploying-a-nested-version-of-vmware-esxi-7-0-on-kvm/

Instalar ESXi sobre KVM

Versiones usadas:
qemu-system-x86 7.0.0-9

La red "default" es la que defino en virtualizacion/kvm/networking.md

El comando que terminé usando:

sudo virt-install --virt-type=kvm --name=esxi1 \
--osinfo linux2016 \
--cpu host-passthrough \
--ram 20000 --vcpus=4 \
--virt-type=kvm --hvm \
--network network:default,model=vmxnet3 \
--graphics vnc \
--disk=VMware-VMvisor-Installer-7.0U3d-19482537.x86_64.iso,device=cdrom,bus=scsi \
--boot cdrom,hd,menu=on \
--disk pool=opt,size=80,sparse=true,bus=ide,format=qcow2 \
--noautoconsole --force


La password que nos pide tendrá que tener varios números algún caracter no alfanumérico.
CUIDADO con que caracteres pongamos, no vayamos a estar escribiendo con un teclado en otro idioma y luego no sepamos la password.
