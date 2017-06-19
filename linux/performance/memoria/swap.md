swapon, swapoff - enable/disable devices and files for paging and swapping

Para saber cual es la partición de swap
swapon -s

Valor actual de swappiness:
sysctl vm.swappiness


Si se establece 0 el núcleo intentará no hacer intercambio, mientras que si se establece 100 el sistema intentará mantener la Memoria de acceso aleatorio lo más libre posible haciendo intercambio
sysctl vm.swappiness=100

Para mantener el cambio:
/etc/sysctl.conf

O con en SOs con systemd lo meteremos en (https://www.freedesktop.org/software/systemd/man/sysctl.d.html#)
/etc/sysctl.d/*.conf


Ver que procesos están consumiendo la SWAP
https://www.cyberciti.biz/faq/linux-which-process-is-using-swap/
sudo smem -kt
for file in /proc/*/status ; do awk '/VmSwap|Name/{printf $2 " " $3}END{ print ""}' $file; done | sort -k 2 -n -r | less


Podemos forzar vaciar la swap, pero tenemos que tener suficiente espacio libre en la ram para acoger toda la memoria swapeada:
https://askubuntu.com/questions/1357/how-to-empty-swap-if-there-is-free-ram
Puede tardar un rato.
Podremos ver con "free -m" como se va vaciando
