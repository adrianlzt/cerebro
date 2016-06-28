# Para ejecutar un service como un user determinado
[Service]
User=pepe

Con esto podemos arrancar aplicaciones X11 desde root a un usuario.

# Para gestion de systemd como user no root
https://wiki.archlinux.org/index.php/Systemd/User_(Espa%C3%B1ol)

Podemos meter unidades de systemd especificas para un user:
~/.config/systemd/user

Estado global:
systemctl --user status


Ejemplo servicio:

calc.service :
[Unit]
Description=calculadora

[Service]
ExecStart=/usr/bin/gnome-calculator
Environment=DISPLAY=:0


systemctl --user start calc 
