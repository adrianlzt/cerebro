https://wiki.archlinux.org/index.php/LightDM

yain lightdm lightdm-mini-greeter
sudo sed -i "s/#greeter-session=example-gtk-gnome/greeter-session=lightdm-mini-greeter/" /etc/lightdm/lightdm.conf
sudo sed -i "s/#user-session=default/user-session=i3/" /etc/lightdm/lightdm.conf
sudo sed -i "s/prikhi/adrian/" /etc/lightdm/lightdm-mini-greeter.conf
sudo systemctl enable lightdm.service

echo 'export $(dbus-launch)' > ~/.xprofile

dm-tool
herramienta para gestionar cosas del lightdm


La ultima sesion iniciada (elegida si no ponemos el "user-session" sera la que aparezca en:
~/.dmrc


