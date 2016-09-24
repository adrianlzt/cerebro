# Arch
yaourt -S aur/bcc

En /usr/share/bcc/tools/ tendremos todas las herramientas que vienen.

# Man pages
export MANPATH=$MANPATH:/usr/share/bcc/man
man trace

MANPATH=/usr/share/bcc/man man trace


# Source
Depdencias para arch, mirar https://aur.archlinux.org/cgit/aur.git/tree/PKGBUILD?h=bcc

git clone https://github.com/iovisor/bcc.git
mkdir bcc/build; cd bcc/build
cmake .. -DCMAKE_INSTALL_PREFIX=/usr
make
sudo make install


