Depende en que parte tengamos el problema podemos ir accediento a una u otra parte del sistema.

Problem stage		|	Boot option
-------------------------------------------------------------------------
BIOS				linux rescue
GRUB				grub shell
kernel or initrd		kernel .. root=LABEL=root init=/bin/bash
init				kernel .. root=LABEL=root emergency
rc.sysinit			kernel .. root=LABEL=root single
rc scripts (K,S)
rc.local			kernel .. root=LABEL=root 1
