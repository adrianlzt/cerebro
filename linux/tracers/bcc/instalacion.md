# Arch

yaourt -S aur/bcc-tools

En /usr/share/bcc/tools/ tendremos todas las herramientas que vienen.

# Suse

```bash
zypper in bcc-tools kernel-azure-devel
```

kernel-azure-devel es para las VMs de azure, si no, el kernel-devel.

# Ubuntu

# Man pages

export MANPATH=$MANPATH:/usr/share/bcc/man
man trace

MANPATH=/usr/share/bcc/man man trace

# Source

Depdencias para arch, mirar <https://aur.archlinux.org/cgit/aur.git/tree/PKGBUILD?h=bcc>

git clone <https://github.com/iovisor/bcc.git>
mkdir bcc/build; cd bcc/build
cmake .. -DCMAKE_INSTALL_PREFIX=/usr
make
sudo make install
