https://docs.getchip.com/chip.html#installing-c-h-i-p-sdk
https://docs.getchip.com/chip.html#flash-chip-firmware


# Desde arch
https://bbs.nextthing.co/t/flash-chip-using-archlinux/10449


sudo pacman -S android-tools uboot-tools sunxi-tools
yaourt -S simg2img

git clone http://github.com/NextThingCo/CHIP-tools
cd CHIP-tools
sudo -s
./chip-update-firmware.sh -s -f

Una vez dentro, actualizar:
apt-get update
apt-get upgrade

dpkg-reconfigure tzdata
  para definir la zona horaria




# Desde la VM/vagrant, metodo oficial
Hace falta montar una VM con vagrant:

git clone https://github.com/NextThingCo/CHIP-SDK.git
cd CHIP-SDK
vagrant up
  tarda un rato
vagrant ssh

Desconectar CHIP
Unir los pines FEL y GND, con un clip o un cable.

En la vagrant:
cd CHIP-tools/
./chip-update-firmware.sh -s -f
  debian sin X

No me funciona, la vm no pilla el usb
