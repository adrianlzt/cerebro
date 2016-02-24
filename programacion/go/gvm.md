https://github.com/moovweb/gvm
Go Version Manager

GVM provides an interface to manage Go versions.


# Instalacion
bash < <(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer)

Mete en el .bashrc
[[ -s "/home/adrian/.gvm/scripts/gvm" ]] && source "/home/adrian/.gvm/scripts/gvm"


# Uso
gvm install go1.4
gvm use go1.4 [--default]
Once this is done Go will be in the path and ready to use. $GOROOT and $GOPATH are set automatically.

Eso nos define las variables:
GOPATH = /home/adrian/.gvm/pkgsets/go1.4.3/global
GOROOT = /home/adrian/.gvm/gos/go1.4.3


