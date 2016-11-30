Editar /etc/pacman.conf
Descomentar [multilib] (solo 64 bits)

pacman -S --needed openssh sshpass sshfs screen git hub meld vim ansible sudo bc cups gnu-netcat nmap ntp socat strace tree unrar wget xclip pkgfile python-pip gdisk zip expect ranger bash-completion
systemctl start sshd.service
systemctl enable sshd.service
pkgfile --update
pacman -S --needed chromium dropbox

pacman -S --needed virtualbox vagrant lxc docker
pacman -S --needed wireshark-gtk

pacman -S --needed nautilus terminator vlc youtube-dl
pacman -S --needed libreoffice-fresh
pacman -S --needed gimp imagemagick

pacman -S --needed smbclient nautilus-share

# VPNs, jvpn
pacman -S --needed openconnect perl-term-readkey perl-http-message perl-libwww perl-lwp-protocol-https net-tools


yaourt -S skypeforlinux-bin

packer (mirar pacman/yaourt.md)
yaourt -S sysdig gist-git nautilus-megasync eclipse-pydev
