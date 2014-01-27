https://help.ubuntu.com/12.10/serverguide/libvirt.html
http://www.howtoforge.com/virtualization-with-kvm-on-ubuntu-12.04-lts

En resumen:
kvm-ok  //puedo usar kvm?
sudo apt-get install kvm libvirt-bin
adduser adrian libvirtd //deberemos reiniciar la sesión para que haga efecto el nuevo grupo
sudo apt-get install virtinst

sudo apt-get install virt-manager
ubuntu-virt-mgmt: Common packages useful for managing virtual machines graphically -> virt-manager, python-vm-builder, virt-viewer

El resto de cosas se hace con el interfaz gráfico de manera sencilla virt-manager
