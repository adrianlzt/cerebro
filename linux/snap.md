https://snapcraft.io/store

Ejemplo:
snap install certbot

Binario en /snap/bin


Paquetes instalados:
snap list

Info:
snap info NAME

A parte de los comandos, puede tener services, para usar con systemd.
Ejemplo
certbot.renew, que lo llama la unit de systemd como:
snap run certbot.renew
