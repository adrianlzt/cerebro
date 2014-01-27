Herramienta similar a chkconfig en RHEL:
apt-get install sysv-rc-conf
sysv-rc-conf
Es un entorno ncurses para activar o desactivar servicios


Las aplicaciones que se arrancarán con el inicio de sesión se encuentran en:
/etc/xdg/autostart
~/.config/autostart

Para deshabilitar una definir la variable:
X-GNOME-Autostart-enabled=false
