/etc/pacman.conf

Mirar mirrors.md para ver que servidores configurar.


# Fuentes
[infinality-bundle]
SigLevel = Optional TrustedOnly
Server = http://bohoomil.com/repo/$arch

[infinality-bundle-multilib]
SigLevel = Optional TrustedOnly
Server = http://bohoomil.com/repo/multilib/$arch

[infinality-bundle-fonts]
SigLevel = Optional TrustedOnly
Server = http://bohoomil.com/repo/fonts

Firmar la clave con:
sudo pacman-key --lsign-key "bohoomil (dev key) <bohoomil@zoho.com>"




[archlinuxfr]
SigLevel    = Optional TrustedOnly
Server = http://repo.archlinux.fr/$arch


Para estar a la última descomentar
testing, community-testing y multilib-testing


pacman -Sy



Connectical
varios binarios de aur
http://repo.connectical.com/README.txt
