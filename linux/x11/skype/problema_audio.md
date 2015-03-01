Problema con el audio en 13.10
http://libuntu.com/solventar-problemas-de-sonido-de-skype-en-ubuntu-13-10/
sudo sed -i 's/^Exec=.*/Exec=env PULSE_LATENCY_MSEC=30 skype %U/' /usr/share/applications/skype.desktop

PULSE_LATENCY_MSEC=30 skype
