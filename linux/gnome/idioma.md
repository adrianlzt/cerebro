Con interfaz gráfica.
sudo apt-get install language-selector
gnome-language-selector


Con consola:
Idiomas disponibles:
gsettings get org.gnome.desktop.input-sources sources

Cambiar idioma a la primera opción:
gsettings set org.gnome.desktop.input-sources current 0
