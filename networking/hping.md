http://wiki.hping.org
http://www.rationallyparanoid.com/articles/hping.html

pacman -S hping

Hacer ping a través de una interfaz determinada
sudo hping3 -I eth2 192.168.1.1

Testear si un puerto TCP está abierto:
sudo hping -i vboxnet0 -c 1 -S 192.168.33.10 -p 9998
  lo que hace es enviar un paquete SYN y esperar un SYN+ACK

Escaneo de puertos
hping -i eth0 --scan 20-25,80,443 -S 217.146.186.51

Enviar un único paquete UDP desde un puerto determinado con los primeros 5 bytes del fichero especificado:
sudo hping -c 1 -V -s 52125 --udp -p 8000 52.59.227.93 --file /tmp/data --data 5
