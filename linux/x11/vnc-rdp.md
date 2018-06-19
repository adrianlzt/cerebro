mejor usar nomachine.md

Clientes de vnc y rdp

remmina - el más completo, pero creo que no funcionaba bien el RDP. Parece que no tiene vnc
  para que tenga vnc: extra/libvncserver
  para ver una contraseña guardada usar seahorse
freerdp
rdesktop

# VNC
vinagre (parte de gnome)


# Server
vino
  systemctl --user status vino-server
x11vnc

## x11vnc
http://www.karlrunge.com/x11vnc/faq.html#faq-passwd
pacman -S x11vnc
x11vnc

Si estamos con un gestor de login, mirar con "ps wwwwaux | grep auth" el parametro para auth
Eg.:
x11vnc -auth /run/user/120/gdm/Xauthority

     gdm:     -auth /var/gdm/:0.Xauth
              -auth /var/lib/gdm/:0.Xauth
     kdm:     -auth /var/lib/kdm/A:0-crWk72
              -auth /var/run/xauth/A:0-crWk72
     xdm:     -auth /var/lib/xdm/authdir/authfiles/A:0-XQvaJk
     dtlogin: -auth /var/dt/A:0-UgaaXa

### Password
mkdir ~/.vnc
x11vnc -storepasswd 'SILExx10' .vnc/passwd
x11vnc -auth /run/user/120/gdm/Xauthority -rfbauth /root/.vnc/passwd -display :0

### systemd
sudo systemctl edit x11vnc
[Service]
ExecStart=
Type=forking
ExecStart=/usr/bin/x11vnc -norc -forever -shared -bg -rfbauth /etc/x11vnc.pass -autoport 5900 -o /var/log/x11vnc.log -auth /var/run/slim.auth

sudo x11vnc -storepasswd 'SILExx10' /etc/x11vnc.pass



# Extendiendo escritorio a una tercera pantalla

1.- Decirle al driver de intel que cree dos conexiones virtuales (con una seria suficiente):
https://unix.stackexchange.com/a/391519
$ cat /etc/X11/xorg.conf.d/20-intel-virtualheads.conf
Section "Device"
    Identifier "intelgpu0"
    Driver "intel"
    Option "VirtualHeads" "2"
EndSectio

2.- Usar xrandr para crear la configuración para una de las pantallas virtuales y colocarla en su sitio
https://ogbe.net/blog/moar_monitors.html

Este comando nos sirve para obtener el Modeline
gtf 1280 1024 60


DEVICE="VIRTUAL1"
MODELINE="1280x1024_60.00 110.66 1024 1096 1208 1392 1280 1281 1284 1325 -HSync +Vsync"
NAME="1280x1024_60.00"
xrandr --delmode "$DEVICE" "${NAME}"
xrandr --rmmode "${NAME}"
xrandr --newmode ${MODELINE}
xrandr --addmode "$DEVICE" "${NAME}"
xrandr --output $DEVICE --mode $NAME --right-of NUESTRA_PANTALLA_PRINCIPAL


3.- Arrancar VNC solo en la porcion de la pantalla virtual
CLIP=$(xrandr | grep "^$DEVICE.*$" | grep -o '[0-9]*x[0-9]*+[0-9]*+[0-9]*')
x11vnc -listen 0.0.0.0 -clip $CLIP -noxinerama -noxrandr -repeat -nevershared -forever -nowf -noncache -wait 1 -defer 1 -multiptr -repeat
  para mostrar el ratón en el escritorio remoto necesitamos la ultima version del x11vnc, compilada desde fuente:
  git clone git@github.com:LibVNC/x11vnc.git
  cd x11vnc
  ./autogen.sh
  ./configure
  make
  src/x11vnc ...


4.- Arrancar vncviewer en la máquina que tiene conectada la tercera pantalla
# disable screen sleep
xset s off
xset -dpms
# unclutter removes the local mouse pointer
unclutter &
DISPLAY=:0 vncviewer 192.168.2.36:3 -viewonly -fullscreen
