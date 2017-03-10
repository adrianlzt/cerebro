https://ngrok.com/

A tunneling, reverse proxy for developing and understanding networked, HTTP services

Me da un endpoint de ngrok.io que conecta al localhost de mi máquina, a un puerto determinado.
Tu pc establece la conex ngrok contra el servicio.

Tambíen podemos montar nosotros el servidor.

Usar version 2.x

Otra opcion es localtunnel.md

Usar docker para levantar varios ngrok:
docker run --rm --name ngrok -e "HTTP_PORT=8080" m2i3/ngrok

# Linux
https://ngrok.com/download
https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip
Nos da un binario

Empaquetados: https://dl.equinox.io/ngrok/ngrok/stable

Version 1.x: https://s3-eu-west-1.amazonaws.com/sequenceiq/ngrok_linux

# Mac OSX
Version 1.x: https://s3-eu-west-1.amazonaws.com/sequenceiq/ngrok_darwin

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


Para la v1:
curl -s http://127.0.0.1:4040/http/in | grep "window.data" | cut -d '=' -f 2 | cut -d "(" -f 2 | cut -d ")" -f 1 | cut -c 2- | rev | cut -c 2- | rev | tr -d '\\' | jq '.'


# ngrokd / server
ngrokd compilado para linux
https://s3-eu-west-1.amazonaws.com/sequenceiq/ngrokd_linux

./ngrokd -domain=midominio.com

Tendremos que tener un wildcard dns para resolver .midominio.com a la ip del server, o ponerlo en los clientes (con dnsmasq por ejemplo).
Por ejemplo, que xxxx.midomino.com resuelva la ip del server

En los clientes tenemos que usar un cliente version 1.x y configurar
~/.ngrok
server_addr: midominio.com:4443
trust_host_root_certs: false
tunnels:
  test:
    proto:
      tcp: 9090

Con esta definicion podemos hacer: ./ngrok start test
y levantaremos un tunel tcp en el puerto 9090

A los clientes se les darán dominios del estilo:
https://xxxx.midominio.com:443
http://xxxx.midominio.com:80
tcp://midominio.com:nnnnn


Con un docker https://hub.docker.com/r/sequenceiq/ngrokd
docker run -d --name ngrokd \
  --restart=always \
  -p 4480:4480 \
  -p 4444:4444 \
  -p 4443:4443 \
  sequenceiq/ngrokd \
    -httpAddr=:4480 \
    -httpsAddr=:4444 \
    -domain=ngrok.sequenceiq.com

