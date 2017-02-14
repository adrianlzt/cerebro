https://wiki.archlinux.org/index.php/VirtualBox#Installation_steps_for_Arch_Linux_hosts

pacman -S virtualbox virtualbox-guest-iso
yaourt -S virtualbox-ext-oracle

Si estamos usando el kernel "linux" será suficiente con la dependencia que instalará: virtualbox-host-modules-arch
Comprobar que es para la versión de kernel que tenemos.

Debemos tener el ultimo paquete "linux" instalado. Parece que los modulos virtualbox-host-modules-arch son para ese último kernel.

Si tengo problemas con estos modulos usar dkms:
pacman -S linux-headers virtualbox-host-dkms virtualbox-guest-dkms

Para cargarlos
systemctl start systemd-modules-load.service


# Para añadir acceso host-only
Settings > Network > Host-only Networks > Edit host-only network (space) > Adapter.
