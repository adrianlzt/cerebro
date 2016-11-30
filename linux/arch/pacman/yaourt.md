# Instalacion
https://aur.archlinux.org/packages/yaourt

Activar archlinux.fr (mirar repositorios.md)

wget https://aur.archlinux.org/cgit/aur.git/snapshot/yaourt.tar.gz
tar xvf yaourt.tar.gz
cd yaourt
makepkg

sudo pacman -U yaourt-*pkg.tar.xz


# Configuracion
/etc/yaourtrc

NOCONFIRM=0
UP_NOCONFIRM=1     # No prompt while build upgrades (including -Sbu)
BUILD_NOCONFIRM=1  # Only prompt for editing files



# Actualizar paquetes *-git
yaourt -Syu --devel


# No chequear md5sum
yaourt --m-arg "--skipchecksums" -S PAQUETE


# Debug
si falla podemos ir a /tmp/yaourt-tmp-adrian/ y seguir a mano
