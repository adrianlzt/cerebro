https://isc.sans.edu/forums/diary/Psst+Your+Browser+Knows+All+Your+Secrets+/16415


SSLKEYLOGFILE=/tmp/SSLHACK google-chrome
o
SSLKEYLOGFILE=/tmp/SSLHACK firefox


Abrir wireshark y cargar el SSLKEYLOGFILE en:
Edit -> Preferences -> Protocols -> SSL -> (Pre)-Master-Secrete Log File: /tmp/SSLHACK

Luego filtrar por: ssl && http

Seleccionar una conversación y pinchar en Follow SSL Stream

También pinchando sobre los paquetes, en la Packets Bytes view, aparecerán nuevas pestañas "Decrypted SSL data".
