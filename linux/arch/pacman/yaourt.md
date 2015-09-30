# Instalacion
https://aur.archlinux.org/packages/yaourt

wget https://aur.archlinux.org/cgit/aur.git/snapshot/yaourt.tar.gz
tar xvf yaourt.tar.gz
cd yaourt
makepkg

sudo pacman -U yaourt-1.6-1-any.pkg.tar.xz


# Configuracion
/etc/yaourtrc

BUILD_NOCONFIRM=1  # Only prompt for editing files
NOCONFIRM=0
UP_NOCONFIRM=1     # No prompt while build upgrades (including -Sbu)

