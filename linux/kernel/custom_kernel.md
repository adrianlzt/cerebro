# CentOS
https://wiki.centos.org/es/HowTos/Custom_Kernel

yum groupinstall -y "Development Tools"
yum install -y hmaccalc ncurses-devel
bajar fuentes
compilar


# Ubuntu
https://wiki.ubuntu.com/Kernel/BuildYourOwnKernel

En los source" de apt deberemos tener activo el deb-src del main restricted, ejemplo (/etc/apt/sources.list):
deb-src http://us.archive.ubuntu.com/ubuntu/ xenial main restricted

sudo apt update
apt-get source linux-image-$(uname -r)
sudo apt-get build-dep linux-image-$(uname -r)
sudo apt-get install libncurses5-dev
  dependencias para hacer el build

Para realizar cambios de configuración:
cd linux*
chmod a+x debian/rules
chmod a+x debian/scripts/*
chmod a+x debian/scripts/misc/*
fakeroot debian/rules clean
fakeroot debian/rules editconfigs
  tenemos que entrar en todas las configs que nos ofrece, pulsando Y, modificar si lo necesitamos y luego salir, y a por el siguiente
  abrirá un ncurses con las opciones de configuración del kernel por cada tipo de kernel (generic, lowlatency, distintas arquitecturas, etc)
  generalmente nos interesará el primero: amd64/config.flavour.generic
