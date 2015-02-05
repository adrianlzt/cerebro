https://help.ubuntu.com/12.10/serverguide/libvirt.html
http://www.howtoforge.com/virtualization-with-kvm-on-ubuntu-12.04-lts

En resumen:
apt-get install cpu-checker
kvm-ok  //puedo usar kvm?
sudo apt-get install kvm ubuntu-virt-mgmt
adduser adrian libvirtd //deberemos reiniciar la sesión para que haga efecto el nuevo grupo
adduser adrian kvm //deberemos reiniciar la sesión para que haga efecto el nuevo grupo

El resto de cosas se hace con el interfaz gráfico de manera sencilla virt-manager
