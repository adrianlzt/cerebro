Arreglar problemas con fuentes
https://github.com/jaagr/polybar/wiki/Fonts#freetype-fonts

Instalar tambien:
community/otf-font-awesome
extra/bdf-unifont
aur/termsyn-font

Adaptar el fichero de conf para que coja estas fuentes segun sus nombres
fc-list | grep -i -e awes -e unif -e termsym

Ejecutar comandos al clickar:
https://github.com/jaagr/polybar/wiki/Formatting#action-a

Elegir iconos de https://fontawesome.com/icons/network-wired?style=solid


# Colores / themes
https://github.com/adi1090x/polybar-themes

Instala algunas fuentes en .local/share/fonts


# extras
Rofi : For App launcher, network, power and style menus
pywal : For pywal support
calc : For random colors support
networkmanager_dmenu : For network modules

i3-agenda
polybar-scripts-git
pulseaudio-control
networkmanager-dmenu-bluetoothfix-git


# system tray
Si queremos mostrar los iconos de apps que meten sus cosas en el "system tray".
Por ejemplo, flameshot o copyq

Tenemos que activarlo en el module "bar"
https://github.com/polybar/polybar/wiki/Configuration#bar-settings
tray-position =

