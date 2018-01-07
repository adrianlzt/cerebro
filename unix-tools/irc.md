# weechat
https://weechat.org/files/doc/devel/weechat_quickstart.es.html#start
cliente ncurses
parece que es lo que se usa ahora

## Shortcuts / keys
avpag/repag para moverse por los mensajes del canal

F5/F6 para moverse entre buffers/tabs/ventanas

/help
  ayuda

/server add freenode chat.freenode.net/6697 -ssl -autoconnect
  añadir server

/connect freenode
  conectar a un server ya añadido

/set irc.server.freenode.ssl_verify off
  Deshabilitar chequeo ssl para un server ya añadido

/set irc.server.NOMBRE
  abre el menu para editar opciones
  para cambiar una: alt+-




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

## Docker
docker run --name=znc --restart=unless-stopped -d -p 6697:6697 -v /home/rancher/irc/znc-data:/znc-data znc



## Ayuda
desde un cliente conectado al ZNC:
/msg *status help


## Modulos
http://wiki.znc.in/Modules#.28Un.29Loading_Modules
Podemos cargar modulos externos.
Pondremos un fichero .cpp o perl en el directorio de los modulos.
Al arrancar se compilará

Podemos poner los modulos ya compilados (.so en vez del .cpp)
Para compilarlos podemos usar la imagen de docker: docker run --rm -it -v $PWD:/mnt znc /bin/bash
Por ejemplo: /opt/znc/bin/znc-buildmod /mnt/push.cpp

/msg *status ListAvailMods
  mostrar modulos disponibles


### Buffer especifico por cliente
http://wiki.znc.in/Clientbuffer
Por defecto se envia el buffer de mensajes no leidos al primer cliente que se conecte.
Si queremos enviar el buffer a cada cliente que conecte:
/msg *status LoadMod clientbuffer autoadd

Ahora los clientes que conecten a ZNC deberán cambiar su username por:
nombreuser@identificador

Podemos ver los clientes que están conectados con:
/msg *clientbuffer ListClients

Desactivar:
AutoClearChanBuffer
AutoClearQueryBuffer


### Push por chats privados o highlights
https://github.com/jreese/znc-push

Una vez el modulo esta en el directorio adecuado:

/msg *status loadmod push

Configuracion para pushbullet:
/msg *push set service pushbullet
/msg *push set secret ...
/msg *push set target foo
  este no es obligatorio, es para especificar a un device especifico donde enviar el mensaje
