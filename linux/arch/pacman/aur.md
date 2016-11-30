https://aur.archlinux.org/?setlang=es

Repositorio de paquetes de la comunidad Arch
Funciona como pkgsrc, te baja el código y un script PKGBUILD define las instrucciones para compilarlo,  instalarlo y crear el paquete.

Instalar con yaourt



# Subir paquete a AUR
https://wiki.archlinux.org/index.php/Main_page

Clonar:
ssh://aur@aur.archlinux.org/PAQUETE.git

Metemos el:
PKGBUILD
.SRCINFO (lo genera el makepkg)
.gitingore (no olbigatorio)

Commit, push
Ya aparece el nuevo paquete en AUR y queda asociado a nuestra cuenta.


En nuesta cuenta de AUR podemos meter varias SSH public keys, siemplemente en distintas lineas.

PGP Key fingerprint, no hace falta, es un poco coñazo porque la gente tiene que importarla.



# Paquetes desactualizados
Primero marcar como "Flag outdated"

Si no hacen caso (tras un par de semanas), podemos hacer una request si vemos que nadie trata un "Flag de outdated"
En este caso se quedaria orphan, y saldrá un boton de "Adopt package" para mantenerlo.
