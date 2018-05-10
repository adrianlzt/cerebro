https://aur.archlinux.org/?setlang=es

Repositorio de paquetes de la comunidad Arch
Funciona como pkgsrc, te baja el código y un script PKGBUILD define las instrucciones para compilarlo,  instalarlo y crear el paquete.

Usar con yay
Instalar con yaourt (deprecated)


# Paquetes AUR
pacman -Qm
  en realidad, paquetes no sincronizados con la current db, que suele significar que vienen de aur

# Subir paquete a AUR
https://wiki.archlinux.org/index.php/Arch_User_Repository#Submitting_packages
https://wiki.archlinux.org/index.php/Arch_packaging_standards

Clonar:
ssh://aur@aur.archlinux.org/PAQUETE.git

Metemos el:
PKGBUILD (https://wiki.archlinux.org/index.php/PKGBUILD ejemplo en PKGBUILD.proto https://git.archlinux.org/svntogit/packages.git/tree/trunk/PKGBUILD?h=packages/nginx-mainline)
  No meter los md5sum, lo hace un comando luego
.SRCINFO (lo genera el makepkg)
.gitingore (no olbigatorio)

En la función package() tenemos que usar "${pkgdir}" como si fuera el root del sistema.
Para instalar un binario en /usr/bin
install -D droidmote "${pkgdir}"/usr/bin/droidmote

Para meter un fichero en /etc
install -Dm644 droidmote.conf "${pkgdir}"/etc/droidmote.conf


Un systemd service:
install -Dm644 ../service "$pkgdir"/usr/lib/systemd/system/nginx.service


Meter las sumas md5 automaticamente:
updpkgsums

Probar a ejecutar:
makepkg

Testear con namcap (dependencias que faltan, fallos en el pkgbuild, etc. Poner -i para mas info https://wiki.archlinux.org/index.php/namcap):
namcap *.pkg.tar.xz

Generar .SRCINFO (https://wiki.archlinux.org/index.php/.SRCINFO)
makepkg --printsrcinfo > .SRCINFO

echo "*" > .gitignore
Y añadir los ficheros con git add -f (para evitar subir cosas que no tocan)

Commit, push
Parece que hay una convención no escrita en los mensajes de commit:
Nuevo paquete: newpkg: nginx-mainline 1.9.11-3
Actualizamos versión: upgpkg: nginx-mainline 1.9.15-1
Ya aparece el nuevo paquete en AUR y queda asociado a nuestra cuenta.


En nuesta cuenta de AUR podemos meter varias SSH public keys, siemplemente en distintas lineas.

PGP Key fingerprint, no hace falta, es un poco coñazo porque la gente tiene que importarla.



# Paquetes desactualizados
Primero marcar como "Flag outdated"

Si no hacen caso (tras un par de semanas), podemos hacer una request si vemos que nadie trata un "Flag de outdated"
En este caso se quedaria orphan, y saldrá un boton de "Adopt package" para mantenerlo.
