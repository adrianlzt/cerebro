https://www.virtualbox.org/wiki/Linux_Downloads


# Centos
yum install kernel-headers
wget http://download.virtualbox.org/virtualbox/rpm/el/virtualbox.repo
Meterlo en /etc/yum.repos.d
http://superuser.com/questions/499059/unable-to-install-virtualbox-specify-kern-dir-directory-installing-vir


# Arch
No instalar los paquetes virtualbox-guest-*
Eso es por si instalamos arch como VM.

Estos modulos: vboxguest, vboxsf, vboxvideo se deben cargar si usamos arch como VM.

Usar virtualbox-host-dkms o virtualbox-host-modules-arch ?
