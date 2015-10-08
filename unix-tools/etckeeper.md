http://etckeeper.branchable.com/

CUIDADO!
Al restaurar ficheros (etckeer vcs checkout -- fichero) NO respeta los permisos

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


No permite vigilar otros directorios que no sean etc
http://superuser.com/questions/367729/how-to-reuse-extend-etckeepers-metadata-engine-for-git-control-of-non-etc-file
http://serverfault.com/questions/211425/can-etckeeper-be-used-to-track-config-files-outside-of-etc
