https://wiki.archlinux.org/index.php/creating_packages

Ejemplo openconnect de git con AUR
En PKGBUILD.proto hay un esqueleto de este tipo de fichero.

mkdir dir
vi PKGBUILD

pkgname=openconnect
pkgver=7.4
pkgrel=1
epoch=1
pkgdesc="Open client for Cisco AnyConnect VPN"
arch=('arm' 'i686' 'x86_64')
license=('GPL')
url="http://www.infradead.org/openconnect.html"
depends=('libxml2' 'gnutls' 'libproxy' 'vpnc' 'krb5')
makedepends=('intltool' 'python2')
options=('!emptydirs')
source=($pkgname::git://git.infradead.org/users/dwmw2/openconnect.git)
md5sums=('SKIP')

build() {
cd $srcdir/$pkgname
./autogen.sh
PYTHON=/usr/bin/python2 ./configure --prefix=/usr \
--sbindir=/usr/bin \
--disable-static
make
}

package() {
cd $srcdir/$pkgname
make DESTDIR="$pkgdir" install
}



makepkg
  para generar el paquete

Esto nos creará openconnect-1:7.4-1-XXX.pkg.tar.xz (siendo XXX la arquitectura) que instalamos con:
sudo pacman -U openconnect-1\:7.4-1-XXX.pkg.tar.xz
