Instalamos una app en el móvil y una en linux.
Nos permite controlar el movil, navegar por el sistema de ficheros, etc.

Para arrancar el demonio:
/usr/lib/kdeconnectd

Luego usar kdeconnect-app

Para montar el sistema de ficheros:
 - arrancar kdeconnect-indicator
 - en el systray, botón derecho, ir al movil y montar fs
 - me lo ha montado en /run/user/1000/da5436b2f6a1c158/primary/

Se sincronizan las apps buscando en la red local que estemos.

Para navegar por los ficheros tendremos que entrar en la app del movil y darle permisos especiales.

Parece que monta un server ssh custom
ssh -vvvv -i $HOME/.config/kdeconnect/privateKey.pem -p 1716 kdeconnect@192.168.1.31
