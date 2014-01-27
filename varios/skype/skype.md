Comandos para usar los chats comunes de skype como salas IRC

https://support.skype.com/es/faq/FA10042/que-son-los-comandos-y-los-roles-en-un-chat


Permitir a los que se unan ver las conversación anterior:
/set options +HISTORY_DISCLOSED


Problema con el audio en 13.10
http://libuntu.com/solventar-problemas-de-sonido-de-skype-en-ubuntu-13-10/
sudo sed -i 's/^Exec=.*/Exec=env PULSE_LATENCY_MSEC=30 skype %U/' /usr/share/applications/skype.desktop

PULSE_LATENCY_MSEC=30 skype
