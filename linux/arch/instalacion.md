https://wiki.archlinux.org/index.php/Installation_guide

Cargar desde usb, nos abre un terminal como root:

loadkeys en
fdisk -l 
  mirar como se llama el HD
gdisk /dev/sdX
  particionar disco ( / y /home ?)
  hacer tambien una particion de 1MiB tipo ef02 para el boot si vamos con BIOS
mkfs.XXXX /dev/sda1
mkfs.XXXX /dev/sda2
  btrfs parece que mola, pero inestable y no permite swap (como particion tampoco?)

mkdir /mnt

mount /dev/sda1 /mnt
mkdir /mnt/home
mount /dev/sda2 /mnt/home

wifi-menu
  conectar a una wifi
dhcpcd
  configura automaticamente ethernet

pacstrap /mnt base
  ~4min

genfstab -p /mnt >> /mnt/etc/fstab
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
pacman -Ss grub

Salir del chroot (exit)
grub-install --root-directory=/mnt --target=i386-pc --recheck --debug /dev/sda

Esto no se si hace falta:
arch-chroot /mnt
grub-mkconfig -o /mnt/boot/grub/grub.cfg


Sistema gráfico:
pacman -S xorg-server xorg-server-utils xorg-apps mesa

Portatil con nvidia
pacman -S xf86-video-nouveau
reboot


pacman -S gnome-shell gdm gnome-control-center
systemctl enable gdm
systemctl start gdm



Problemas:
No me configura la red al arrancar (tengo que poner "dhcpcd") -> Network Manager con el entorno grafico
Tras instalar el driver de nvidia muy poca resolución en el terminal. -> no usar driver nvidia
Al arrancar con xinit entro en gnome-shell pero no funciona ni el teclado ni el ratón -> no usar driver nvidia.
