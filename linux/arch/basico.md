Editar /etc/pacman.conf
Descomentar [multilib] (solo 64 bits)

pacman -S --needed openssh sshpass sshfs screen git hub meld vim ansible sudo bc cups gnu-netcat nmap ntp socat strace tree unrar wget xclip pkgfile
pkgfile --update
pacman -S --needed chromium skype dropbox

pacman -S --needed openconnect

pacman -S --needed virtualbox vagrant lxc docker
pacman -S --needed wireshark-gtk

pacman -S --needed nautilus terminator vlc youtube-dl
pacman -S --needed libreoffice-fresh
pacman -S --needed gimp imagemagick



packer (mirar pacman/packer.md)
packer -S sysdig
packer -S keepassx2 pygist-git
packer -S nautilus-megasync

