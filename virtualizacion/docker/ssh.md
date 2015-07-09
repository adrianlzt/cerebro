# Activar ssh-agent
https://blog.sorpaas.com/add-ssh-keys-inside-docker-containers/

Básicamente es meter como entrypoint a este script:

#!/bin/sh
eval `ssh-agent -s` > /dev/null
ssh-add > /dev/null
exec $*



Mejor, ejecutarlo con el usuario que vaya a usar el agent
su USUARIO -c "ssh-agent -a /tmp/ssh-agent"

Dejamos forzado el path del socket del agente, así luego se puede usar con:
SSH_AUTH_SOCK=/tmp/ssh-agent ssh-add ...

