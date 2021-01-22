https://wiki.archlinux.org/index.php/Dm-crypt/Encrypting_an_entire_system

# Ejemplo encriptando /home (en disco /dev/sdb)
gdisk /dev/sdb

cryptsetup -y -v luksFormat /dev/sdb1
cryptsetup open /dev/sdb1 NOMBRE
mkfs.btrfs -L home /dev/mapper/NOMBRE
mount -t btrfs /dev/mapper/NOMBRE /home

## Unlock and mount
https://wiki.archlinux.org/index.php/Dm-crypt/Encrypting_a_non-root_file_system#Automated_unlocking_and_mounting

Usando pam_mount.
Instalar pam_mount
Modificar /etc/security/pam_mount.conf.xml con la configuración adecuada

<?xml version="1.0" encoding="utf-8" ?>
<!DOCTYPE pam_mount SYSTEM "pam_mount.conf.xml.dtd">
<pam_mount>
<debug enable="0" />
                <volume user="adrian" fstype="crypt" path="/dev/nvme0n1p4" mountpoint="home" />
                <volume user="adrian" fstype="btrfs" path="/dev/mapper/home" mountpoint="/home" options="rw,relatime,compress=lzo,ssd,space_cache" />
                <cryptmount>cryptsetup open %(VOLUME) %(MNTPT)</cryptmount>
                <cryptumount>cryptsetup close %(MNTPT)</cryptumount>
<mntoptions allow="nosuid,nodev,loop,encryption,fsck,nonempty,allow_root,allow_other" />
<mntoptions require="nosuid,nodev" />
<logout wait="0" hup="no" term="no" kill="no" />
<mkmountpoint enable="1" remove="true" />

</pam_mount>



Modificar /etc/pam.d/system-login
--- system-login        2021-01-21 20:34:15.000256923 +0100
+++ system-login.bkp.20210121   2020-08-12 21:34:37.000000000 +0200
@@ -2,20 +2,16 @@

 auth       required   pam_shells.so
 auth       requisite  pam_nologin.so
-auth       optional   pam_mount.so
 auth       include    system-auth

 account    required   pam_access.so
 account    required   pam_nologin.so
 account    include    system-auth

-password   optional   pam_mount.so
 password   include    system-auth

 session    optional   pam_loginuid.so
 session    optional   pam_keyinit.so       force revoke
-session [success=1 default=ignore]  pam_succeed_if.so  service = systemd-user quiet
-session    optional   pam_mount.so
 session    include    system-auth
 session    optional   pam_motd.so          motd=/etc/motd
 session    optional   pam_mail.so          dir=/var/spool/mail standard quiet

