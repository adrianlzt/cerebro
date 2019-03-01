https://docs.docker.com/engine/swarm/configs/#read-more-about-docker-config-commands

docker config create NOMBRE fichero

cat <<EOF | docker config create filebeat -
some config
multiline
EOF


Ver una conf almacenada:
docker config inspect --pretty NOMBRE



# Confd
Podemos usar confd al comienzo del container para generar un fichero de config a partir de variables de entorno
Mirar confd.md
