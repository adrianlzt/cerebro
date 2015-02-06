Helper para instalar los paquetes AUR.

Configurar el repo archlinuxfr (mirar repositorios.md)
[archlinuxfr]
SigLevel    = Optional TrustedOnly
Server = http://repo.archlinux.fr/$arch

pacman -Suy
pacman -S packer binutils


Para usar packer tenemos que hacerlo como usuario no root.

packer -S paquete
  Instalar paquete con los repos AUR (si no lo encuentra en pacman)

packer -Ss paquete
  Buscar paquete en los repos AUR

packer -Su
  Actualizar


# Errores #
Cannot find the strip binary required for object file stripping
-> Instalar: pacman -S binutils

CMake Error: Erro required internal CMake variable not set...
-> Instalar: pacman -S automake make gcc cmake
