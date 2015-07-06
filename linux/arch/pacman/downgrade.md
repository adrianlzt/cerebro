https://wiki.archlinux.org/index.php/Arch_Rollback_Machine

https://wiki.archlinux.org/index.php/Downgrading_packages

Buscar en la cache y ejecutar este comando para volver a esa version:
pacman -U /var/cache/pacman/pkg/pkgname-olderpkgver.pkg.tar.gz


Tambien hay algunos programitas que hacen esto.


https://github.com/pbrisbin/downgrade

Usar mejor el programa downgrade.
downgrade nodejs
  ahí nos sale una lista de posibles versiones a las que bajar.

  al final nos pregunta "add nodejs to IgnorePkg?" si damos a "y" lo meterá en /etc/pacman.conf IgnorePkg
  estos paquetes se ignoran en las actualizaciones
