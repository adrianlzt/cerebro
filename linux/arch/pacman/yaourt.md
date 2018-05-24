DEPRECATED! usar yay

# Instalacion
https://aur.archlinux.org/packages/yaourt

Activar archlinux.fr (mirar repositorios.md)

wget https://aur.archlinux.org/cgit/aur.git/snapshot/yaourt.tar.gz
tar xvf yaourt.tar.gz
cd yaourt
makepkg

sudo pacman -U yaourt-*pkg.tar.xz


# Buscar
yaourt cosa
  pondra un numero al lado de cada paquete. Luego le decimos el numero e intro


# Configuracion
~/.yaourtrc
# http://kissmyarch.blogspot.fr/2012/05/two-simple-yaourt-tips.html
# Que no pregunte al instalar
BUILD_NOCONFIRM=1
EDITFILES=0



# Actualizar paquetes *-git
yaourt -Syu --devel


# No chequear md5sum
yaourt --m-arg "--skipchecksums" -S PAQUETE


# Debug
si falla podemos ir a /tmp/yaourt-tmp-adrian/ y seguir a mano


# Build from sources
yaort -Sb paquete



# Compilar a mano
1- Bajar el PKGBUILD y demas (de AUR O ABS) (por debajo hace rsync contra rsync.archlinux.org::abs/any/REPO/PAQUETE)
yaourt -G PAQUETE

Si queremos los ficheros del git (abs tiene los ficheros con los que se compilaron los paquetes, pero pueden haber cambiado) metemos en .yaourtrc
USE_GIT=1


2- Compilar (si queremos hacer mas pasos en el build mirar makepkg.md)
cd PAQUETE
yaourt -P .


3- Instalar
yaourt paquete.pkg.tar.xz



# Internals
/usr/bin/yaourt
Hace uso de: /usr/lib/yaourt/util.sh
Y de: /usr/lib/yaourt/



# Errores
/tmp lleno
Cambiar el dir de tmp

vi ~/.yaourtrc
TMPDIR=/var/tmp/yaourt
