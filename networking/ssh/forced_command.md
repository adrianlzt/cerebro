https://binblog.info/2008/10/20/openssh-going-flexible-with-forced-commands/

En vez de permitir al usuario que ejecute lo que quiera, se llama a un comando nuestro.
Típico uso es para limitar que dejamos hacer al usuario.


Cuando se ejecute será algo así:
SSH_ORIGINAL_COMMAND=micomando ./forced-command.sh

