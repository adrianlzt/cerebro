Sistema gráfico:
pacman -S xorg-server xorg-server-utils xorg-apps mesa

Portatil con nvidia
pacman -S xf86-video-nouveau
reboot

Portatil con intel:
pacman -S xf86-video-intel



pacman -S gnome-shell gdm gnome-control-center gnome-tweak-tool network-manager-applet system-config-printer gnome-shell-extensions guake
pacman -S gnome-extra
  300MiB, contains further GNOME applications, including an archive manager, disk manager, text editor, games, etc.
systemctl enable gdm
systemctl start gdm

# Fuentes
sudo mkdir /root/.gnupg/
sudo touch /root/.gnupg/dirmngr_ldapservers.conf
sudo pacman-key -r 962DDE58
  Eso importa la key del repo de las fuentes
sudo pacman-key --lsign-key 962DDE58
  Eso lo que hace es "firmar" la key para fiarte de ella

/etc/pacman.conf
'''
[infinality-bundle]
SigLevel = Optional TrustedOnly
Server = http://bohoomil.com/repo/$arch

[infinality-bundle-multilib]
SigLevel = Optional TrustedOnly
Server = http://bohoomil.com/repo/multilib/$arch

[infinality-bundle-fonts]
SigLevel = Optional TrustedOnly
Server = http://bohoomil.com/repo/fonts
'''

sudo pacman -Sy
packer -S infinality-bundle infinality-bundle-multilib ibfonts-meta-base ibfonts-meta-extended ttf-brill otf-neris ttf-aller ttf-envy-code-r ttf-powerline-fonts-git
Aceptar las dos primeras preguntas para instalar todo.
Las siguientes (de sustituir), decir 's', para cambiar las normales por las infinality
  Y si algun paquete de los de AUR te falla ni caso
  infinality-bundle infinality-bundle-multilib ibfonts-meta-base ibfonts-meta-extended
  El resto son fuentes sueltas de relleno
reboot





Otro gestor de inicio más light
Como gestor de sessiones usar slim:
pacman -S slim
systemctl enable slim
