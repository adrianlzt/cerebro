https://www.virtualbox.org/wiki/Linux_Downloads


# Centos
curl https://download.virtualbox.org/virtualbox/rpm/el/virtualbox.repo -o /etc/yum.repos.d/virtualbox.repo
yum search virtualbox
  para ver que versiones hay
yum install VirtualBox-A-B

Nos dará un error: WARNING: The vboxdrv kernel module is not loaded.
yum install -y kernel-devel make gcc perl
vboxconfig

Instalar el extension pack para tener mas funcionalidad, RDP por ejemplo.
VBoxManage extpack install fichero.vbox-extpack


# Arch
No instalar los paquetes virtualbox-guest-*
Eso es por si instalamos arch como VM.

Estos modulos: vboxguest, vboxsf, vboxvideo se deben cargar si usamos arch como VM.

Usar virtualbox-host-dkms o virtualbox-host-modules-arch ?
