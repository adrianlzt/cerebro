Si tenemos systemd mirar linux/systemd/socket-proxyd.md


http://www.debuntu.org/how-to-redirecting-network-traffic-to-a-new-ip-using-iptables/
http://www.cyberciti.biz/faq/linux-port-redirection-with-iptables/

echo '1' > /proc/sys/net/ipv4/ip_forward

Este método no vale para conectar desde localhost a localhost. La interfaz de loopback no pasa por PREROUTING
https://serverfault.com/questions/211536/iptables-port-redirect-not-working-for-localhost


Los paquetes que vengan de 10.42.0.78:443 envialo s a 127.0.0.1:443
iptables -t nat -A PREROUTING -s 10.42.0.78 -p tcp --dport 443 -j DNAT --to-destination 127.0.0.1:443

iptables -t nat -A PREROUTING -s 192.168.1.0/24 -p tcp --dport 1111 -j DNAT --to-destination 2.2.2.2:1111


Cambiar el puerto al que llega el tráfico entrante:
iptables -t nat -A PREROUTING -p tcp --dport $srcPortNumber -j REDIRECT --to-port $dstPortNumber


Redireccionar:
        Puerto de entrada (me llegan paquetes al puerto 422 y me los envío al 22):
        iptables -t nat -A PREROUTING -p tcp -d 192.168.102.37 --dport 422 -j DNAT --to 192.168.102.37:22

        Puerto de salida (los paquetes que salgan hacia la direccion, me los envío a mi 110 local): 
        iptables -t nat -A OUTPUT -d 138.100.31.6/32 -p tcp -m tcp --dport 1521 -j REDIRECT --to-ports 110

iptables -t nat -I PREROUTING --src 0/0 --dst 192.168.1.5 -p tcp --dport 80 -j REDIRECT --to-ports 8123
iptables -t nat -I OUTPUT --src 0/0 --dst 192.168.1.5 -p tcp --dport 80 -j REDIRECT --to-ports 8123

