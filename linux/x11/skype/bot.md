https://github.com/opensourcehacker/sevabot

# Instalacion con x11 en ubuntu
https://sevabot-skype-bot.readthedocs.org/en/latest/ubuntu.html
x11:
# sobran algunos apt-get install -y xvfb fluxbox x11vnc dbus libasound2 libqt4-dbus libqt4-network libqtcore4 libqtgui4 libxss1 libpython2.7 libqt4-xml libaudio2 libmng1 fontconfig liblcms1 lib32stdc++6 lib32asound2 ia32-libs libc6-i386 lib32gcc1 nano python-virtualenv
apt-get install -y xvfb fluxbox x11vnc dbus libasound2 libqt4-dbus libqt4-network libqtcore4 libqtgui4 libxss1 libpython2.7 libqt4-xml libaudio2 fontconfig lib32stdc++6 libc6-i386 lib32gcc1 nano python-virtualenv


apt-get install curl git python-gobject-2 jq

Hace falta instalar skype, mirar instalacion.md
adduser skype
su skype
cd
git clone git://github.com/opensourcehacker/sevabot.git
SERVICES="xvfb fluxbox skype" ~/sevabot/scripts/start-server.sh start
~/sevabot/scripts/start-vnc.sh start

Conectar por vnc.
Entrar en skype
Algunas modificaciones (mirar web)

virtualenv venv
. venv/bin/activate
python setup.py develop
cp settings.py.example settings.py


Arrancar a mano:
DISPLAY=:1 venv/bin/sevabot


Navegador a: http://localhost:5000/

curl http://localhost:5000/msg/ --data-urlencode chat=fc259eced4be29dcb6ee4136a5d43547 --data-urlencode msg=pepito --data-urlencode md5='552860a713a08cf23fd335c5b930d09c'

# Comandos para el bot
https://sevabot-skype-bot.readthedocs.org/en/latest/commands.html

# Custom scripts
https://sevabot-skype-bot.readthedocs.org/en/latest/commands.html#id5

el bot cuando llamemos a: !script bla ble
llamar a custom:
script.sh bla ble

# Chat de grupos
https://github.com/awahlig/skype4py/issues/34
El bot solo funciona con salas antiguas.
Se pueden crear desde un cliente win o mac con: /createmoderatedchat

Si el bot está en un chat aceptará comandos de cualquiera que esté en esa sala.
En skype configurar para que solo acepte mensajes instantaneos de gente agregada.
