https://wiki.archlinux.org/index.php/LightDM

yain lightdm lightdm-mini-greeter
sudo sed -i "s/#greeter-session=example-gtk-gnome/greeter-session=lightdm-mini-greeter/" /etc/lightdm/lightdm.conf
sudo sed -i "s/prikhi/adrian/" /etc/lightdm/lightdm-mini-greeter.conf
sudo systemctl enable lightdm.service

echo "i3 &" > ~/.xprofile

dm-tool
herramienta para gestionar cosas del lightdm



