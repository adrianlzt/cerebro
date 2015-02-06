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


Otro gestor de inicio más light
Como gestor de sessiones usar slim:
pacman -S slim
systemctl enable slim
