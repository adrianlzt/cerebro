Ejemplos corriendo dentro de CoreOS:

Run a command in the container and then stop it:
docker run busybox /bin/echo hello world


Open a shell prompt inside of the container:
docker run -i -t busybox /bin/sh
  -i, --interactive=false    Keep STDIN open even if not attached
  -t, --tty=false            Allocate a pseudo-TTY
