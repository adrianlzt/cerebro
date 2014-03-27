swapon, swapoff - enable/disable devices and files for paging and swapping

Para saber cual es la partición de swap
swapon -s


Si se establece 0 el núcleo intentará no hacer intercambio, mientras que si se establece 100 el sistema intentará mantener la Memoria de acceso aleatorio lo más libre posible haciendo intercambio
sysctl vm.swappiness=100
