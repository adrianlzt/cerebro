https://wiki.alpinelinux.org/wiki/Main_Page

Imagen mínima de linux con musl (en vez de glibc).

# APK: Gestor de paquetes
https://wiki.alpinelinux.org/wiki/Alpine_Linux_package_management

Parece pacman

## Repositorios
/etc/apk/repositories

Source de los repos: http://git.alpinelinux.org/cgit/aports/tree/

Actualizar bbdd local de los repos:
apk update

## Listar contenido
apk info -L musl


# Docker
docker run -it alpine /bin/sh

Para usar apk primero hacer:
apk update
