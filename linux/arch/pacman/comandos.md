https://wiki.archlinux.org/index.php/pacman

Instalar (con Sync, -S):
pacman -S paquete paquete2 "bash>=3.2" testing/qt

Instalar sin mensajes de confirmacion
pacman -S --noconfirm ...

Instalar, pero no reinstalar lo que ya esté instalado:
pacman -S --needed paquete1 paquete_ya_instalado paquete2

Buscar en paquetes de los repos:
pacman -Ss paquete

Actualizar base de datos (como apt-get update):
pacman -Sy

Buscar en paquetes locales:
pacman -Qs paquete

Actualizar base de datos
pacman -Sy

Actualizar base de datos y paquetes:
pacman -Suy

Actualizar un paquete:
pacman -S paquete

Lista paquetes instalados:
pacman -Q
pacman -Qs
  algo más de info

Info de un paquete instalado (nos dice tambien quien depende del paquete):
pacman -Qi

Paquetes de yaourt (foreign):
pacman -Qm

Muestra ficheros de un paquete:
pacman -Ql <nombre>

A que paquete pertenece un fichero
pacman -Qo <fichero>

Borrar paquete y dependencias no utilizadas:
pacman -R paquete
  -s: borrar tambien dependencias que se queden sin uso
  -c: borrar paquetes que dependan de 'paquete'
  -dd: Borrar solo un paquete, sin borrar paquetes que dependan de este

Instalar un paquete local:
pacman -U file.pkg.tar.xz
  Upgrade or add package(s) to the system and install the required dependencies from sync repos.
  Either a URL or file path can be specified. This is a “remove-then-add” process.

Limpiar cache:
pacman -Sc
