https://wiki.archlinux.org/index.php/Install_from_existing_Linux
https://wiki.archlinux.org/index.php/Installation_guide#Installation

Instalar Arch en un USB desde otro arch.

Particionar el disco  https://wiki.archlinux.org/index.php/EFI_System_Partition
Usar gdisk, tipo de particionado GPT.
Primera partición UEFI (tipo EF00) de 512MB
Segunda particion linux con el resto de espacio
mkfs.fat -F32 /dev/sdx1
mkfs.ext4 /dev/sdx2

sudo mount /dev/sdx2 /mnt
sudo mount /dev/sdx1 /mnt/boot

Instalar el sistema base
sudo pacstrap /mnt base

Generamos el fstab para el pendrive:
genfstab -U /mnt >> /mnt/etc/fstab

Entramos en el nuevo sistema (chroot)

sudo arch-chroot /mnt
chroot# ln -sf /usr/share/zoneinfo/Europe/Madrid /etc/localtime
chroot# hwclock --systohc
chroot# vi /etc/locale.gen
        es_ES.UTF-8 UTF-8
chroot# locale-gen
chroot# vi /etc/locale.conf
        es_ES.UTF-8
chroot# vi /etc/vconsole.conf
        KEYMAP=es
chroot# passwd
chroot# echo "usblive" > /etc/hostname
chroot# vi /etc/hosts
        127.0.1.1       usblive.localdomain usblive

Meter un boot loader.
Para UEFI podemos usar systemd-boot
https://wiki.archlinux.org/index.php/Category:Boot_loaders
https://wiki.archlinux.org/index.php/Systemd-boot

chroot# bootctl install
Conf metida en: /boot/loader/loader.conf

