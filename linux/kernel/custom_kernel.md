# CentOS
https://wiki.centos.org/es/HowTos/Custom_Kernel

yum groupinstall -y "Development Tools"
yum install -y hmaccalc ncurses-devel
bajar fuentes
compilar


# Ubuntu
https://wiki.ubuntu.com/Kernel/BuildYourOwnKernel

En los source" de apt deberemos tener activo el deb-src del main restricted y el updates (que es de donde cojamos el kernel posiblemente), ejemplo (/etc/apt/sources.list):
deb-src http://us.archive.ubuntu.com/ubuntu/ xenial main restricted
deb-src http://us.archive.ubuntu.com/ubuntu/ xenial-updates main restricted

sudo apt update
apt-get source linux-image-$(uname -r)
  cuando empieza a descargarlo nos dirá que vesión exacta está bajando. Asegurar que está bajando la del kernel que tengamos
  Por ejemplo una vez he visto que dice: "Picking 'linux' as source package instead of 'linux-image-4.4.0-87-generic'" y estaba bajando una versión más antigua

dependencias para hacer el build:
sudo apt-get build-dep linux-image-$(uname -r)
sudo apt-get install libncurses5-dev

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

Tras la config podremos ver que se ha modificado el parametro que queremos, ejemplo:
debian.master/config/amd64/config.flavour.generic:CONFIG_EDAC_DEBUG=y

Tenemos que hacer diferente nuestro kernel, agregaremos al final algo tipo: +test1
vi debian.master/changelog
  Modificar la primera linea
    linux (4.4.0-21.37) xenial; urgency=low
    linux (4.4.0-21.37+edac) xenial; urgency=low

Build del kernel:
fakeroot debian/rules clean
fakeroot debian/rules binary-headers binary-generic binary-perarch

Instalar el kernel:
cd ..
sudo dpkg -i linux*.deb
sudo reboot
