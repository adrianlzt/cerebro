Más facil usar: manjaro.md
Es una distribucion de arch

Idea de instalación automatizada:
https://github.com/bashrc666/arch-gotoole


https://wiki.archlinux.org/index.php/Installation_guide

Bajar imagen desde https://www.archlinux.org/download/
sudo dd if=archlinux-2020.06.01-x86_64.iso of=/dev/sdc

Cargar desde usb, nos abre un terminal como root:

loadkeys en
fdisk -l
  mirar como se llama el HD
gdisk /dev/sdX
  para 250GB, 4GB RAM, 35GB /, resto /home
  Ejemplo:

Number  Start (sector)    End (sector)  Size       Code  Name
   1             256         9175040   35.0 GiB    8300  Linux filesystem
   2         9175296        10223871   4.0 GiB     8200  Linux swap
   3        10223872        62514768   199.5 GiB   8300  Linux filesystem

  (hacer tambien una particion de 1MiB tipo ef02 para el boot si vamos con BIOS)
mkfs.XXXX /dev/sda1
mkfs.XXXX /dev/sda3
  btrfs parece que mola, pero inestable y no permite swap (como particion tampoco?)
  ext4 paree que sigue siendo el rey para sistemas desktop.


# Si estamos instalando con el disco duro montado en otro linux, si no, saltar hasta "Si estamos en el propio ...":
https://wiki.archlinux.org/index.php/Install_from_existing_Linux
Bajar bootstrap desde https://mirrors.kernel.org/archlinux/iso/
Descomprimir en algun dir
vi root.x86_64/etc/pacman.d/mirrorlist
  descomentar nuestro proxy más cercano
Entrar con el chroot
  root.x86_64/bin/arch-chroot /mnt/bootstrap/root.x86_64

Si estamos en un debian-host (será necesario para el pacstrap):
mkdir /run/shm

Seguimos como si ya estuviesemos en el propio sistema a instalar



# Si estamos en el propio sistema a instalar
mkdir /mnt
mount /dev/sda1 /mnt
mkdir /mnt/home
mount /dev/sda3 /mnt/home


wifi-menu
  conectar a una wifi
dhcpcd
  configura automaticamente ethernet

pacstrap /mnt base base-devel
  ~4min

  Si tenemos errores tipo: error: key "FCF2CB179205AC90" could not be looked up remotely
  Editar /etc/pacman.d/gnupg/gpg.conf para cambiar el puerto (por defecto 11371, que podría estar capado) por:
  keyserver hkp://keyserver.kjsl.com:80

  Si esto tampoco funciona, desactivar las keys:
  /etc/pacman.conf
  SigLevel = Never


genfstab -p /mnt >> /mnt/etc/fstab
Quitar la linea de swap (si esta presente) https://bbs.archlinux.org/viewtopic.php?pid=1558001#p1558001
arch-chroot /mnt
echo "hostname" > /etc/hostname
ln -s /usr/share/zoneinfo/Europe/Madrid /etc/localtime
echo "es_ES.UTF-8 UTF-8" >> /etc/locale.gen
locale-gen
locale > /etc/locale.conf
vi /etc/locale.conf
  :%s/en_US/es_ES/g
echo "KEYMAP=es" > vconsole.conf
mkinitcpio -p linux
passwd
pacman -S grub
pacman -S intel-ucode # si tenemos intel
grub-install --target=i386-pc --recheck --debug /dev/sda
grub-mkconfig -o /boot/grub/grub.cfg



Editar /etc/pacman.conf
Descomentar [multilib] (solo 64 bits)

useradd -m adrian
passwd adrian
groupadd sudo
gpasswd -a adrian sudo

Descomentar de /etc/sudoers
%sudo   ALL=(ALL) ALL



Mirar:
basico.md
red.md
x.md
trackpad.md
linux/dnsmasq.md



Problemas:
No me configura la red al arrancar (tengo que poner "dhcpcd") -> Network Manager con el entorno grafico
Tras instalar el driver de nvidia muy poca resolución en el terminal. -> no usar driver nvidia
Al arrancar con xinit entro en gnome-shell pero no funciona ni el teclado ni el ratón -> no usar driver nvidia.
