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
