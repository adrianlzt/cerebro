Parece que es un grub más moderno, para UEFI (solo?).

grubby --info=ALL

Quitar un parámetro del boot de un kernel:
grubby --remove-args "rd.lvm.lv=centos_colo41zc/swap" --update-kernel /boot/vmlinuz-3.10.0-1160.el7.x86_64

Añadir un param:
grubby --args "rd.lvm.lv=centos_colo41zc/swap" --update-kernel /boot/vmlinuz-3.10.0-1160.el7.x86_64
