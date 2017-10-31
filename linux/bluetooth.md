https://wiki.archlinux.org/index.php/bluetooth

gnome-control-center viene con un gestor bluetooth.
sudo pacman -S bluez bluez-utils blueberry
sudo modprobe btusb
sudo systemctl start bluetooth.service
blueberry


Mirar si tenemos bluetooth:
lspci | grep -i bluetooth


Ralink (Mediatek) RT3290/RT3298LE parece que da problemas
https://github.com/loimu/rtbth-dkms/
https://aur.archlinux.org/packages/rtbth-dkms/
https://aur.archlinux.org/packages/rtbth-dkms-git/
