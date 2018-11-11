https://docs.docker.com/engine/swarm/configs/#read-more-about-docker-config-commands

docker config create NOMBRE fichero

cat <<EOF | docker config create filebeat -
some config
multiline
EOF
