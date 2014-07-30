Para cambiar en el entorno gráfico gnome mirar:
adrianRepo/linux/gnome/idioma.md


Tampoco me funciona
git clone https://github.com/nonpop/xkblayout-state.git
cd xkblayout-state
make
Cambiar layout:
./xkblayout-state set +1


No me funciona en Ubuntu 14.04.
No cambia de layout
https://github.com/ierton/xkb-switch

Programita para cambiar el keyboard layout.

git clone https://github.com/ierton/xkb-switch.git
cd xkb-switch
cmake .
make
sudo make install

Instala:
/usr/local/bin/xkb-switch
/usr/local/lib/libxkbswitch.so
