https://help.ubuntu.com/community/KVM/CreateGuests

Meta paquete con interfaces graficas:
ubuntu-virt-mgmt
	virt-manager  //Interfaz gráfico al estilo de virtualbox
	virt-viewer //Ver la consola de la VM por vnc


Para crear maquinas usar:
virt-manager
Salir de la pantalla: Control+Alt

Con virt-manager tambien podemos arrancar una máquina a partir de una imagen qcow2 disponible.
virt-manager genera una serie de ficheros xml para luego llamar a kvm/qemu.
Con ps podemos ver que parametros ha usado.


apt-get install ubuntu-vm-builder
Nos da el binario
ubuntu-vm-builder
para desplegar maquinas ubuntu rapidamente.

ubuntu-vm-builder kvm <release-ubuntu>
ubuntu-vm-builder kvm trusty


# Manual
Poner --enable-kvm se nota muuuucho en la velocidad

## Qemu-launcher
apt-get install qemu-launcher qemuctl

En la pestaña de configuracion cambiar el binario de qemu a /usr/bin/qemu-system-x86_64
Y el data directory: /home/adrian/Documentos/qemu

Nos puede servir para ver como se lanzan determinados comandos con el cli



## CLI
Crear una imagen de 10GB y arrancar una máquina de 1GB de ram desde un CD
/usr/local/kvm/bin/qemu-img create -f qcow2 vdisk.img 10G 
/usr/local/kvm/bin/qemu-system-x86_64 -hda vdisk.img -cdrom /path/to/boot-media.iso -boot d

Desde la linea de comandos:
kvm -hda /path/to/VCentOracle.qcow -hdb /path/to/Oracle20G.qcow -m 2048 -vga none -usb -usbdevice tablet -net nic -net user,hostfwd=tcp:192.168.1.2:2228-:22

Conectar con un dispositivo de red macvtap (no podrá comunicarse con el host):
sudo ip link add link eth1 name macvtap0 type macvtap
sudo ip link set macvtap0 address 1a:46:0b:ca:bc:7b up
sudo chgrp adrian /dev/tap$(< /sys/class/net/macvtap0/ifindex)
sudo chmod g+rw /dev/tap$(< /sys/class/net/macvtap0/ifindex)

qemu-system-x86_64 -enable-kvm -name adri1 -cdrom /home/adrian/Descargas/Core-current.iso \
-net nic,model=virtio,macaddr=$(< /sys/class/net/macvtap0/address) \
-net tap,fd=3 3<>/dev/tap$(< /sys/class/net/macvtap0/ifindex)



Ejemplo de máquina creada con virt-manager
qemu-system-x86_64
-enable-kvm
-name maas-kvm
-netdev tap,fd=24,id=hostnet0
-device virtio-net-pci,netdev=hostnet0,id=net0,mac=52:54:00:e8:37:74,bus=pci.0,addr=0x3
-drive file=/home/adrian/Documentos/vagrant/maas/kvm/maas.qcow2,if=none,id=drive-virtio-disk0,format=qcow2
-device virtio-blk-pci,scsi=off,bus=pci.0,addr=0x7,drive=drive-virtio-disk0,id=virtio-disk0,bootindex=1
-S
-machine pc-i440fx-utopic,accel=kvm,usb=off
-cpu Nehalem
-m 1024
-realtime mlock=off
-smp 1,sockets=1,cores=1,threads=1
-uuid e35a85e1-c538-4d23-a547-5d759a2b5415
-no-user-config
-nodefaults
-chardev socket,id=charmonitor,path=/var/lib/libvirt/qemu/maas-kvm.monitor,server,nowait
-mon chardev=charmonitor,id=monitor,mode=control
-rtc base=utc,driftfix=slew
-global kvm-pit.lost_tick_policy=discard
-no-hpet
-no-shutdown
-global PIIX4_PM.disable_s3=1
-global PIIX4_PM.disable_s4=1
-boot strict=on
-device ich9-usb-ehci1,id=usb,bus=pci.0,addr=0x5.0x7
-device ich9-usb-uhci1,masterbus=usb.0,firstport=0,bus=pci.0,multifunction=on,addr=0x5
-device ich9-usb-uhci2,masterbus=usb.0,firstport=2,bus=pci.0,addr=0x5.0x1
-device ich9-usb-uhci3,masterbus=usb.0,firstport=4,bus=pci.0,addr=0x5.0x2
-device virtio-serial-pci,id=virtio-serial0,bus=pci.0,addr=0x6
-chardev pty,id=charserial0
-device isa-serial,chardev=charserial0,id=serial0
-chardev spicevmc,id=charchannel0,name=vdagent
-device virtserialport,bus=virtio-serial0.0,nr=1,chardev=charchannel0,id=channel0,name=com.redhat.spice.0
-spice port=5901,addr=127.0.0.1,disable-ticketing,seamless-migration=on
-device qxl-vga,id=video0,ram_size=67108864,vram_size=67108864,bus=pci.0,addr=0x2
-device intel-hda,id=sound0,bus=pci.0,addr=0x4
-device hda-duplex,id=sound0-codec0,bus=sound0.0,cad=0
-chardev spicevmc,id=charredir0,name=usbredir
-device usb-redir,chardev=charredir0,id=redir0
-chardev spicevmc,id=charredir1,name=usbredir
-device usb-redir,chardev=charredir1,id=redir1
-chardev spicevmc,id=charredir2,name=usbredir
-device usb-redir,chardev=charredir2,id=redir2
-chardev spicevmc,id=charredir3,name=usbredir
-device usb-redir,chardev=charredir3,id=redir3
-device virtio-balloon-pci,id=balloon0,bus=pci.0,addr=0x8
-msg timestamp=on
