https://spoon.net/
https://spoon.net/

Run in isolated containers. Share with collaborators. Migrate between devices.

Correr apps en contenedores.

Mirar virtualizacion/lxc/container_from_scratch.md


Requisitos:
 - no puede hacer symlinks hacia fuera
 - tiene que existir un fichero /etc/os-release

systemd-nspawn -D minimal /bin/sh

  Cambiamos al namespace mount para que minimal/ sea nuestro root
  Dentro ejecutamos el comando /bin/sh

Spoon nos crea el namespace pid automaticamente (podemos usar ps)

systemd-nspawn --private-network -D minimal /bin/sh
ahora tenemos 3 namespaces: mount, network y pid


Si queremos usarlo en arch con nuestro entorno "minimal". Usar un busybox estáticamente linkado (bajar de la web, NO el de pacman).
Y cambiar el PATH segun entremos al container.


Los procesos dentro de los containers los podremos ver en el arbol de procesos del host:
root      2743  0.0  0.0  19468  2096 pts/11   S+   21:36   0:00  |           \_ systemd-nspawn --private-network -D nuevo /bin/sh
root      2745  0.0  0.0   1144     4 ?        Ss   21:36   0:00  |               \_ /bin/sh
root      2756  0.0  0.0   1140     4 ?        S    21:36   0:00  |                   \_ top

