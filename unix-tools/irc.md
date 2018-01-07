# weechat
https://weechat.org/files/doc/devel/weechat_quickstart.es.html#start
cliente ncurses
parece que es lo que se usa ahora

F5/F6 para moverse entre buffers/tabs/ventanas

/help
  ayuda

/server add freenode chat.freenode.net/6697 -ssl -autoconnect
  añadir server

/connect freenode
  conectar a un server ya añadido

/set irc.server.freenode.ssl_verify off
  Deshabilitar chequeo ssl para un server ya añadido


# irssi
cliente irc para consola

Imagen docker
https://hub.docker.com/_/irssi/
docker run --restart=unless-stopped -it --name irssi -e TERM -u $(id -u):$(id -g) --log-driver=none -v $HOME/.irssi:/home/user/.irssi irssi:alpine
  podemos salir y volver a attacharnos con: Contrl+p control+q
  docker attach irssi

Doc:
https://irssi.org/documentation

Scripts:
https://scripts.irssi.org/



# bitchx
otro mas


# ZNC - bouncer
https://wiki.znc.in/ZNC

Creamos un server que estará permanentemente conectado al server de irc (por ejemplo freenode).
Luego podemos conectar uno o varios clientes a nuestro server ZNC y estaremos todos conectados como si estuviesemos en freenode.

ZNC cacheará los mensajes y nos los mostrará cuando conectemos, asi no nos perderemos nada.

Para conectar con ZNC necesitaremos poder pasar user/pass al server (método normal, sin SASL).o

Por defecto se envia el buffer de mensajes no leidos al primer cliente que se conecte.
Si queremos enviar el buffer a cada cliente que conecte:
http://wiki.znc.in/Clientbuffer
