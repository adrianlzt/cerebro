https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/installation_guide/s2-diskpartrecommend-x86
https://www.debian.org/releases/stable/mips64el/apcs03.en.html#:~:text=The%20recommended%20partition%20type%20is,partitions%20separate%20from%20the%20%2F%20partition.
https://docs.fedoraproject.org/en-US/Fedora/16/html/Installation_Guide/s2-diskpartrecommend-x86.html
https://docs.fedoraproject.org/en-US/fedora/latest/install-guide/install/Installing_Using_Anaconda/#sect-installation-gui-manual-partitioning-recommended
https://access.redhat.com/documentation/es-es/red_hat_enterprise_linux/9/html/managing_file_systems/assembly_overview-of-available-file-systems_managing-file-systems
  RHEL8 y 9 recomiendan XFS

Razón para sacar /tmp de /
Logrotate hace uso de /tmp para comprimir los ficheros de log. Si un fichero fuese muy grande podría llenar / al intentar hacer el logrotate

La swap debe ser contigua: https://unix.stackexchange.com/a/144597
Podemos meterla en LVM, pero expandirla sería mala idea. Pero podríamos eliminarla y recrearla contíguamente (con -C)


gparted: sistema grafico para hacer particiones
adrianRepo/linux/x11/gparted.md


mkfs.fat -F32
  para crear una particion FAT32



Una idea de como particionar para un server:
/dev/sda: 100GiB (XFS)
/dev/sda1 /boot 500MiB (ext4)
/dev/sda2 /boot/efi 500MiB (fat23)
/dev/sda3 resto 99GiB (LVM)

LVM vg00 /dev/sda3

vg00/lvol1 / 15GB (XFS)
vg00/lvol2 /var 40GB (XFS)
vg00/lvol3 /var/log 6GB (XFS)
vg00/lvol4 /tmp 4G (XFS)
vg00/lvol5 /home 1GB (XFS)
vg00/lvol6 swap 0.5*RAM

Deberían quedar unos 25GB libres
