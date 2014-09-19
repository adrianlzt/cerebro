https://wiki.archlinux.org/index.php/pacman

Instalar:
pacman -S paquete paquete2

Buscar en paquetes de los repos:
pacman -Ss paquete

Buscar en paquetes locales:
pacman -Qs paquete

Actualizar paquetes:
pacman -Suy

Lista paquetes instalados:
pacman -Q
pacman -Qs
  algo más de info

Borrar paquete y dependencias no utilizadas:
pacman -R paquete
  -s: borrar tambien dependencias que se queden sin uso
  -c: borrar paquetes que dependan de 'paquete'


## Pkgfile ##
pacman -S pkgfile
pkgfile --update

Buscar que paquetes tiene un fichero (necesario instalar pkgfile)
pkgfile -r ".*nombre.*"

