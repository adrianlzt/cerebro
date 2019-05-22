https://docs.docker.com/engine/swarm/configs/#read-more-about-docker-config-commands

docker config create NOMBRE fichero

cat <<EOF | docker config create filebeat -
some config
multiline
EOF


Ver una conf almacenada:
docker config inspect --pretty NOMBRE


# envtpl
https://github.com/subfuzion/envtpl
Usamos templates de go y variables de entorno para generar un fichero de configuración.
Ejemplo:
IFACE=eno1 VIP=1.1.1.1 envtpl -m error keepalived.conf


# Confd
Podemos usar confd al comienzo del container para generar un fichero de config a partir de variables de entorno
Mirar confd.md
