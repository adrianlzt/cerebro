https://moncho.github.io/dry/

ncurses para ver el estado de docker (tambien swarm).

Instalarlo en arch
yay -S dry-bin

Correrlo como container:
docker run -it -v /var/run/docker.sock:/var/run/docker.sock moncho/dry
