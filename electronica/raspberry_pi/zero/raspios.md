# Raspbian
https://www.raspberrypi.org/downloads/raspbian/
https://www.raspberrypi.org/documentation/installation/installing-images/README.md

Version de Debian para la raspberry


## Flashear
yay -S rpi-imager
sudo rpi-imager
  para la piZero usar la imagen lite

O a mano (la última vez no me funcionó bien):
lsblk
  para ver donde está montada
sudo dd bs=4M if=2017-01-11-raspbian-jessie.img of=/dev/sdX
  puede llevar unos 10/11min


# NOOBS
https://www.raspberrypi.org/downloads/noobs/

Parece un ayudante para instalar versiones de linux arm en una SD

# OpenELEC
XBMC ligero

# RaspBMC
XBMC media center


# Upgrade
https://linuxconfig.org/raspbian-gnu-linux-upgrade-from-jessie-to-raspbian-stretch-9


# Kernel
## En la propia raspi
git clone --depth=1 https://github.com/raspberrypi/linux
apt install -y git bc bison flex libssl-dev make libncurses5-dev kmod
export KERNEL=kernel
make bcmrpi_defconfig
make menuconfig
make -j4 zImage modules dtbs
sudo make modules_install
sudo cp arch/arm/boot/dts/*.dtb /boot/
sudo cp arch/arm/boot/dts/overlays/*.dtb* /boot/overlays/
sudo cp arch/arm/boot/dts/overlays/README /boot/overlays/
sudo cp arch/arm/boot/zImage /boot/$KERNEL.img


## En un debian
Yo lo he hecho con un docker debian.
Instrucciones solo válidas para pi zero, las otras versiones cambian cosas

git clone --depth=1 https://github.com/raspberrypi/linux
apt install -y git bc bison flex libssl-dev make libc6-dev libncurses5-dev kmod
git clone https://github.com/raspberrypi/tools ~/tools
echo PATH=\$PATH:~/tools/arm-bcm2708/arm-linux-gnueabihf/bin >> ~/.bashrc
source ~/.bashrc
export KERNEL=kernel
export ARCH=arm
export CROSS_COMPILE=arm-linux-gnueabihf-
make bcmrpi_defconfig
make menuconfig
  al activar el driver de hx711 (célula de carga), me mete en el fichero .config: CONFIG_HX711=m
make -j 12 zImage modules dtbs
  -j 12 es el núm de CPUs * 1.5, para paralelizar

mkdir -p /mnt/{fat32,ext4}
montar sdc1 en /mnt/fat32 ("/boot")
sdc2 en /mnt/ext4 ("/")
make ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf- INSTALL_MOD_PATH=/mnt/ext4 modules_install

cp mnt/fat32/$KERNEL.img mnt/fat32/$KERNEL-backup.img
cp arch/arm/boot/zImage /mnt/fat32/$KERNEL.img
cp arch/arm/boot/dts/*.dtb /mnt/fat32/
cp arch/arm/boot/dts/overlays/*.dtb* /mnt/fat32/overlays/
cp arch/arm/boot/dts/overlays/README /mnt/fat32/overlays/
