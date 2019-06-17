Parametros para quitar unos mensajes spammy del dmesg (noaer) y para que funcionen los graficos:
$ cat /etc/default/grub | grep noa
GRUB_CMDLINE_LINUX_DEFAULT="quiet pci=noaer nouveau.modeset=0"

Parece que otra opción es poner:
pci=nomsi
Pero con esa opción creo que no me funcionaba ni con nouveau


sudo grub-mkconfig -o /boot/grub/grub.cfg


Para el video puse:
sudo pacman -S xf86-video-nouveau



Con el driver de nvidia no me arrancan las X
Si quito el modeset con nouveau se bloquea el pc al reinicar



https://www.reddit.com/r/linux/comments/68eon1/linux_compatibility_with_nvidia_gtx_950m/
http://redsymbol.net/linux-kernel-boot-parameters/
