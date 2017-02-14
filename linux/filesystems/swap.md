https://wiki.archlinux.org/index.php/Partitioning

A swap partition provides memory that can be used as virtual RAM. A swap file should be considered too, as they have almost no performance overhead compared to a partition but are much easier to resize as needed. A swap partition can potentially be shared between operating systems, but not if hibernation is used.

Swap space is generally recommended for users with less than 1 GB of RAM, but becomes more a matter of personal preference on systems with gratuitous amounts of physical RAM (though it is required for suspend-to-disk support).

# Info
swapon --show
cat /proc/swaps

# Particion
mkswap /dev/sda2
swapon /dev/sda2

/etc/fstab
/dev/sda2 none swap defaults 0 0


# Fichero
http://www.faqs.org/docs/linux_admin/x1762.html

dd if=/dev/zero of=/swapfile bs=1M count=4096
  fallocate -l 4096M /swapfile <-- NO usar, puede generar "holes" que no permiten activar la swap
  con XFS: dd if=/dev/zero of=/swapfile count=4096 bs=1MiB
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile

/etc/fstab
/swapfile none swap defaults 0 0

# Errores
"Invalid argument" should be read as "Your filesystem do not support swap file"
  con xfs era que fallocate creaba mal el fichero.

Al ejecutar swapon (el error lo vemos en el dmesg)
swapon: swapfile has holes
