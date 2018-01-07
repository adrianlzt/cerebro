# weechat
cliente ncurses
parece que es lo que se usa ahora

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
