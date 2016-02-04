https://wiki.archlinux.org/index.php/VirtualBox#Installation_steps_for_Arch_Linux_hosts


WARNING: The vboxdrv kernel module is not loaded. Either there is no module
         available for the current kernel (3.18.5-1-ARCH) or it failed to
         load. Please reinstall the kernel module virtualbox-host-modules or
         if you don't use our stock kernel compile the modules with

           sudo dkms autoinstall

         You will not be able to start VMs until this problem is fixed.


Se arregla con (podemos instalar solo uno, depende que kernel tengamos, linux o linux-lts):
pacman -S virtualbox-host-modules virtualbox-host-modules-lts
sudo modprobe vboxdrv

Mirar tener el kernel actualizado.

sudo vi /etc/modules-load.d/virtualbox.conf
vboxdrv
vboxnetadp
vboxnetflt
vboxpci

Para añadir acceso host-only
Settings > Network > Host-only Networks > Edit host-only network (space) > Adapter.


