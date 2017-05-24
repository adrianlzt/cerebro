https://wiki.alpinelinux.org/wiki/Main_Page

Imagen mínima de linux con musl (en vez de glibc).

# APK: Gestor de paquetes
https://wiki.alpinelinux.org/wiki/Alpine_Linux_package_management
https://github.com/gliderlabs/docker-alpine/blob/master/docs/usage.md

Parece pacman

## Repositorios
/etc/apk/repositories

Source de los repos: http://git.alpinelinux.org/cgit/aports/tree/

Actualizar bbdd local de los repos:
apk update

## Listar contenido
apk info -L musl

--no-cache option for apk. It allows users to install packages with an index that is updated and used on-the-fly and not cached locally

--update flag fetches the current package index before adding the package

--virtual or -t switch. Packages added under this virtual name can then be removed as one group
  apk --update add --virtual build-dependencies python-dev build-base wget
  apk del build-dependencies


Para compilar cosas instalar:
build-base


Cosas basicas:
apk add libc-dev gcc 

# Docker
docker run -it alpine /bin/sh

Para usar apk primero hacer:
apk update
