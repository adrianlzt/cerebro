https://github.com/docker/docker/issues/728


Truco para que funcione screen:
screen >/dev/tty 2>/dev/tty </dev/tty

docker run -i -t ... sh -c "exec >/dev/tty 2>/dev/tty </dev/tty && /usr/bin/screen -s /bin/bash"

