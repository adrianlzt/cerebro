#!/bin/dash

# Change language to spanish
gsettings set org.gnome.desktop.input-sources current 0

# Poner guake con la tecla de la izquierda del 1
gconftool-2 --set /apps/guake/keybindings/global/show_hide --type string masculine

# Poner brillo a 80
xbacklight -set 80
