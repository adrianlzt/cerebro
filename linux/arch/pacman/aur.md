<https://aur.archlinux.org/?setlang=es>

Repositorio de paquetes de la comunidad Arch
Funciona como pkgsrc, te baja el código y un script PKGBUILD define las instrucciones para compilarlo, instalarlo y crear el paquete.

Repo de un tipo que compila AURs populares, acepta peticiones.
<https://aur.andontie.net/>

Usar con yay
Instalar:

```bash
curl -LO https://github.com/Jguer/yay/releases/download/v12.4.2/yay_12.4.2_x86_64.tar.gz
tar zxvf yay_*_x86_64.tar.gz
find yay* -name yay | sudo xargs -I{} mv {} /usr/local/bin
rm -fr yay_*
```

Compilando:
git clone <https://aur.archlinux.org/yay.git> && \
cd yay && \
makepkg -si
Para poder ejecutar el makepkg necesitamos: - hacerlo con un user que no sea root - instalar: pacman -S fakeroot binutils make gcc - darle sudo al user

Actualizar todos los paquetes de AUR ignorando errores:
yay -Quq --aur | xargs -n 1 yay -S --noconfirm

Para ver lo que no se pudieron instalar (instalación pendientes)
yay -Quq --aur

Para ver que paquetes de AUR queremos borrar.
yay -Quq --aur | xargs -n 1 yay -Qi | grep -e Nombre -e Descr | cut -d : -f 2- | paste -d "#" - - | sed "s/^\([^#]\*\)/sudo pacman -Rs --noconfirm\1 /" | vi
En el vi que nos abre borraremos lo que nos queremos quedar.
Si alguna app es necesita por otra, no se borrará.

Ignorar verificaciones, típicamente saltarnos el chequeo GPG
yay -S --mflags --skipinteg PAQUETE

# Editar PKGBUILD antes de instalar

yay -G paquete
cd paquete/trunk
vi PKGBUILD
yay -Bi
si ejecuto esto me vuelve a modificar el PKGBUILD y lo deja como el original
otra opción: makepkg -si

Si hemos modificado las fuentes, podemos borrar las firmas y ejecutar
makepkg -si --skipchecksums

Otra opción (no me ha funcionado la última vez que probé con un paquete ya instalado)
yay --editmenu -S linux-drm-tip-git

En ~/.cache/yay/PAQUETE tenemos los ficheros del build que hayamos hecho
Ahí podríamos hacer modificaciones, meter parches, etc y luego hacer makepkg

También podemos clonarlos el git con el PKGBUILD y hacer
makepkg

Si queremos pasar flags para el build (ejemplo para usar paralelización en el build):
MAKEFLAGS=-j16 makepkg

mas info en makepkg.md

# Paquetes AUR

pacman -Qm
en realidad, paquetes no sincronizados con la current db, que suele significar que vienen de aur

# Subir paquete a AUR

<https://wiki.archlinux.org/index.php/Arch_User_Repository#Submitting_packages>
<https://wiki.archlinux.org/index.php/Arch_packaging_standards>

Clonar:
ssh://aur@aur.archlinux.org/PAQUETE.git

Metemos el:
PKGBUILD (<https://wiki.archlinux.org/index.php/PKGBUILD> ejemplo en PKGBUILD.proto <https://git.archlinux.org/svntogit/packages.git/tree/trunk/PKGBUILD?h=packages/nginx-mainline>)
No meter los md5sum, lo hace un comando luego
Ejemplo de un PKGBUILD muy sencillo: <https://aur.archlinux.org/cgit/aur.git/tree/PKGBUILD?h=osquery-bin>
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

Testear con namcap (dependencias que faltan, fallos en el pkgbuild, etc. Poner -i para mas info <https://wiki.archlinux.org/index.php/namcap>):
namcap \*.pkg.tar.xz

Generar .SRCINFO (<https://wiki.archlinux.org/index.php/.SRCINFO>)
makepkg --printsrcinfo > .SRCINFO

echo "\*" > .gitignore
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

# Fallos GPG

Intentar importar la clave a mano:

```bash
gpg --keyserver keyserver.ubuntu.com --recv-keys XXXX
```

## Clave sin nombre

```bash
yay -S libredwg --mflags "--skippgpcheck"
```

Selecionando "no" cuando nos pida importarla.
