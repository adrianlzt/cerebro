https://wiki.archlinux.org/index.php/Dm-crypt/Encrypting_an_entire_system

# Ejemplo encriptando /home (en disco /dev/sdb)
gdisk /dev/sdb

cryptsetup options luksFormat /dev/sdb1
cryptsetup open /dev/sdb1 NOMBRE
mkfs.btrfs -L home /dev/mapper/NOMBRE
mount -t btrfs /dev/mapper/NOMBRE /home

## Unlock and mount
https://wiki.archlinux.org/index.php/Dm-crypt/Encrypting_a_non-root_file_system#Automated_unlocking_and_mounting

Usando pam_mount.
Crear fichero /etc/security/pam_mount.conf.xml con la configuración adecuada
