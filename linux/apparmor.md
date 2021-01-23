https://help.ubuntu.com/community/AppArmor

apt-get install apparmor-utils

# Hacer apparmor permisivo para un programa
aa-complain NOMBRE-PROGRAMA


Chequear el estado de apparmor
sudo systemctl stop apparmor
