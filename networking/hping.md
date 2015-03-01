http://wiki.hping.org

pacman -S hping

Testear si un puerto TCP está abierto:
sudo hping -i vboxnet0 -c 1 -S 192.168.33.10 -p 9998
  lo que hace es enviar un paquete SYN y esperar un SYN+ACK

Escaneo de puertos
hping -i eth0 --scan 20-25,80,443 -S 217.146.186.51
