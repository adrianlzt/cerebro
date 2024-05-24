https://docs.getchip.com/chip.html#installing-c-h-i-p-sdk
https://docs.getchip.com/chip.html#flash-chip-firmware


# Desde la consola, año 2024
sudo pacman -S uboot-tools sunxi-tools
https://github.com/nicmorais/working-CHIP-tools
cd working-CHIP-tools

Usar el fastboot de https://dl.google.com/android/repository/platform-tools_r26.0.1-linux.zip

Arrancar el chip en modo FEL, uniendo los pines FEL y GND.

sudo bash chip-update-firmware.sh -s -r

Instalará Debian 8


# Desde arch
https://web.archive.org/web/20180424100418/https://bbs.nextthing.co/t/flash-chip-using-archlinux/10449

sudo pacman -S uboot-tools sunxi-tools
yaourt -S simg2img

git clone http://github.com/NextThingCo/CHIP-tools
https://github.com/nicmorais/working-CHIP-tools
  otro repo similar: https://github.com/Thore-Krug/Flash-CHIP/
cd CHIP-tools
sudo -s
./chip-update-firmware.sh -s -f

Si da problemas con fastboot, instalar una versión antigua, mirar https://github.com/Thore-Krug/Flash-CHIP/issues/30

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
