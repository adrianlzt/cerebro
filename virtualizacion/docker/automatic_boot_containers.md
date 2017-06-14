https://docs.docker.com/engine/admin/start-containers-automatically/

docker run --restart XX ...

Las opciones son:
no  Do not automatically restart the container. (the default)
on-failure  Restart the container if it exits due to an error, which manifests as a non-zero exit code.
unless-stopped  Restart the container unless it is explicitly stopped or Docker itself is stopped or restarted.
always  Always restart the container if it stops.
