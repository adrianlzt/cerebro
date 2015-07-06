Sistema gráfico:
pacman -S xorg-server xorg-server-utils xorg-apps mesa

Portatil con nvidia
pacman -S xf86-video-nouveau
reboot

Portatil con intel:
pacman -S xf86-video-intel



pacman -S gnome gnome-extra guake
  gnome-extra: 300MiB, contains further GNOME applications, including an archive manager, disk manager, text editor, games, etc.
systemctl enable gdm
systemctl start gdm

# Iconos bonitos
packer -S numix-circle-icon-theme-git numix-themes-git gnome-shell-theme-elegance-colors-git
elegance-colors
cd /usr/share/elegance-colors/templates
sudo ln -s gs-3.14/ gs-3.16
  si tenemos gnome shell 3.16 (mirar si lo han arreglado ya)
elegance-colors-prefs
  preset -> numix
gnome-tweak-tool
  Aparariencia -> Iconos -> Numix-Circle
  Aparariencia -> GTK+ -> Numix
  Aparariencia -> Tema de la shell -> Numix
  Extensiones -> User themes -> activar
  Apariencia -> Tema de la shell -> numix


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
