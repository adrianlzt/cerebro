https://wiki.alpinelinux.org/wiki/Main_Page

Imagen mínima de linux con musl (en vez de glibc). Más info sobre musl más abajo

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


Como rpm -qf
apk info --who-owns /path/to/the/file

Si queremos un whatprovides, usar la web
https://pkgs.alpinelinux.org/contents



# Docker
docker run -it alpine /bin/sh

Para usar apk primero hacer:
apk update

Si queremos no generar cache y bajarnos el index antes de empezar:
apk --no-cache --update add paquete

Borrar dependencias de compilacion una vez teminado
apk --update add --virtual build-dependencies python-dev build-base wget && compilar && apk del build-dependencies


# Musl
Tiene ciertas diferencias sobre glibc
https://wiki.musl-libc.org/functional-differences-from-glibc.html

Algunos problemas que me he encontrado fue conviertiendo fechas entre distintos locales y a la hora de enviar peticiones DNS (musl siempre envía las peticiones A y AAAA usando el mismo socket)

Otro problema nos encontramos intentando correr un elastalert+nodejs. Pero esta vez parece que el probelma era instalar la versión de python de alpine3.6 en la 3.11.
Intentaba hacer una llamada a la syscall getrandom, pero docker no parecía entenderlo y mandaba un kill directo.
