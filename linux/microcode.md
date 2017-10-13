https://wiki.archlinux.org/index.php/microcode

Processor manufacturers release stability and security updates to the processor microcode. While microcode can be updated through the BIOS, the Linux kernel is also able to apply these updates during boot. These updates provide bug fixes that can be critical to the stability of your system. Without these updates, you may experience spurious crashes or unexpected system halts that can be difficult to track down.

Users of CPUs belonging to the Intel Haswell and Broadwell processor families in particular must install these microcode updates to ensure system stability. But all Intel users should install the updates as a matter of course.


# Arch linux
Paquete para actualizar el microcode

sudo pacman -S intel-ucode


Tras instalar esto, regeneramos la config de grub que automáticamente detectará el fichero de microcode y lo pondrá en el arranque:
sudo grub-mkconfig -o /boot/grub/grub.cfg
