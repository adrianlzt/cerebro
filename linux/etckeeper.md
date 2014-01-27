https://help.ubuntu.com/10.04/serverguide/etckeeper.html

## Configuracion inicial

Mantener bajo revisión los ficheros de /etc
 etckeeper uninit #porque lo primero que hace es comenzar a revisionar con bzr

Edito /etc/etckeeper/etckeeper.conf para seleccionar git
Inicio el repositorio
 etckeeper init
 etckeeper commit “Primera importación”

Cada vez que se instale, o desinstale, un paquete etckeeper hará un commit automáticamente.
También cada día hace un commit y lo llama "daily autocommit"

Si hacemos alguna modificación manual, pues:
 etckeeper commit “razón modificación”

Para el resto de comandos git:
 etckeeper vcs CMD
   CMD = log, diff, ...
