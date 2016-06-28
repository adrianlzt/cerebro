https://ngrok.com/

A tunneling, reverse proxy for developing and understanding networked, HTTP services

Me da un endpoint de ngrok.io que conecta al localhost de mi máquina, a un puerto determinado.
Tu pc establece la conex ngrok contra el servicio.

Tambíen podemos montar nosotros el servidor.

Usar version 2.x

# Linux
https://ngrok.com/download
https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip
Nos da un binario

Empaquetados: https://dl.equinox.io/ngrok/ngrok/stable

# Arch
mejor la version -bin para no tener que compilar

yaourt -S ngrok-bin

# ubuntu
sudo apt-get install ngrok-client
  es la 1.x


# Uso

ngrok http 8443
  nos crea dos endpoint publicos, uno http y otro https (con terminación del tunel en su server) y nos llega el tráfico a localhost:8443

SSL parece que es de pago.

Nos da una web donde analizar las peticiones que están atravesando ngrok

# Login / Auth
Si queremos usar ciertas funcionalidades tenemos que meter el token de nuestra cuenta.
Lo obtenemos en https://dashboard.ngrok.com/auth

./ngrok authtoken XXXXXXXXXXXXX


# Conf
https://ngrok.com/docs/1
~/.ngrok

En la v2: ~/.ngrok2/ngrok.yml

$ cat .ngrok2/ngrok.yml 
log_level: error
update: false
log: /home/skype/.ngrok2/ngrok.log


# Service / daemon
Podemos usar systemd para mantener un tunel siempre levantado:
ngrok.service


# API
https://ngrok.com/docs#client-api

Info de los tuneles:
curl http://127.0.0.1:4040/api/tunnels | jq '.'

Public URLs
curl http://127.0.0.1:4040/api/tunnels | jq '.tunnels[].public_url'
