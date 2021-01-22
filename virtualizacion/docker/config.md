https://docs.docker.com/engine/swarm/configs/#read-more-about-docker-config-commands

docker config create NOMBRE fichero

cat <<EOF | docker config create filebeat -
some config
multiline
EOF


Ver una conf almacenada:
docker config inspect --pretty NOMBRE


Mirar unix-tools/env_var_substitute.md (envsubst)

# envtpl
https://github.com/subfuzion/envtpl
Usamos templates de go y variables de entorno para generar un fichero de configuración.
Ejemplo:
IFACE=eno1 VIP=1.1.1.1 envtpl -m error keepalived.conf

Es seguro hacer:
envtpl -o fileA fileA

Si usamos "-m error" y tenemos una variable con " | default x", seguirá fallando si no la definimos.


## Dockerfile
FROM subfuzion/envtpl:latest as envtpl

FROM imagen buena
...
COPY --from=envtpl /bin/envtpl /usr/bin/envtpl


entrypoint.sh:
#! /bin/sh

set -e           # exit in some command fails
set -u           # exit if it tries to use some var undefined
set -o pipefail  # exit if some command on a pipe fails

envtpl -m error -o /etc/keepalived/keepalived.conf /etc/keepalived/keepalived.conf





# Confd
Podemos usar confd al comienzo del container para generar un fichero de config a partir de variables de entorno
Mirar confd.md
