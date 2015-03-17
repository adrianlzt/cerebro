https://help.ubuntu.com/12.10/serverguide/libvirt.html
http://www.howtoforge.com/virtualization-with-kvm-on-ubuntu-12.04-lts

En resumen:
apt-get install cpu-checker
kvm-ok  //puedo usar kvm?
sudo apt-get install kvm ubuntu-virt-mgmt
adduser adrian libvirtd //'newgrp libvirtd' para que haga efecto el nuevo grupo
adduser adrian kvm //'newgrp kvm' para que haga efecto el nuevo grupo

El resto de cosas se hace con el interfaz gráfico de manera sencilla virt-manager


# Arch
https://wiki.archlinux.org/index.php/KVM
https://wiki.archlinux.org/index.php/QEMU

Test si la cpu soporta kvm:
$ egrep --color=auto 'vmx|svm|0xc0f' /proc/cpuinfo
If nothing is displayed after running that command, then your processor does not support hardware virtualization, and you will not be able to use KVM.


$ zgrep CONFIG_KVM /proc/config.gz
If the module  (kvm and one of kvm_amd, kvm_intel) is not set equal to y or m, then the module is not available.

Comunicación eficiente host<->cliente
$ zgrep CONFIG_VIRTIO /proc/config.gz
If the module is not set equal to y or m, then the module is not available.


$ lsmod | grep -e kvm -e virtio

Cargarlos si no lo están ya:
sudo modprobe kvm
sudo modprobe kvm_intel
sudo modprobe virtio


Instalar qemu:
pacman -S qemu virt-manager ebtables extra/dmidecode


sudo systemctl enable libvirtd
sudo systemctl start libvirtd

sudo gpasswd -a adrian wheel
sudo gpasswd -a adrian kvm

virt-manager
pedira la password del usuario

virsh -c qemu:///system

Para que no pida la pass del user

/etc/polkit-1/rules.d/49-nopasswd_limited.rules
/* Allow members of the wheel group to execute the defined actions 
without password authentication, similar to sudo NOPASSWD: */
polkit.addRule(function(action, subject) {
    if (action.id == "org.libvirt.unix.manage" && subject.isInGroup("wheel")) {
        return polkit.Result.YES;
    }
});
