Mirar netmap.md para ver como evitar el network overlap en el lado servidor

Si queremos hacer un overlap en el lado cliente es más complicado y con peor performance.
Lo que vamos a usar es la cola NFQUEUE para enviar los paquetes a userspace y modificar la cabecera con scapy.
Mirar nfqueue_netmap_inv.py

La idea es que queremos llegar a unas máquinas que están en una VPN con red 192.168.1.x, pero nosotros vamos a usar IPs 192.168.44.x para comunicar con esas máquinas.
Enviamos un paquete a 192.168.44.A
Una regla de enrutado dice que todo 192.168.44.x debe ir a tun0 (interfaz de la vpn).
Tras la decisión de routing usamos mangle/POSTROUTING para enviar el paquete a una cola NFQUEUE (no podemos usar nat/POSTROUTING porque a esa regla solo llega un paquete de cada flow, ej: llegá el SYN, pero cuadno enviemos el ACK ya no lo vemos).
Del otro lado de la cola tenemos un proceso python que coge el paquete, y haciendo uso de scapy, modifica el destination address para poner 192.168.1.A.
El paquete se inyecta en la VPN con la destination address correcta, llega al servidor en cuestión y este responde.

Ese paquete entra en nuestra máquina con source address 192.168.1.A. Si no hacemos nada, Linux no sabrá a quien entregarlo.
Hacemos uso de la tabla mangle/PREROUTING para enviarlo a otra cola NFQUEUE (con distinto identificador), donde de con python/scapy modificaremos el source address a 192.168.44.A.
El paquete será entregado a la aplicación.


Un problema es que enviar todos los paquetes de la VPN al userspace genera mucho carga a la CPU.
Si intentamos enviar un archivo grande con scp veremos el proceso python disparado al 100% de una CPU.



Para enviar el tráfico de salida a la cola NFQUEUE:
sudo iptables -t mangle -A POSTROUTING -d 192.168.44.0/24 -j NFQUEUE --queue-num 1

Para recoger el tráfico de entrada de la VPN y enviarlo a otra cola NFQUEUE:
sudo iptables -t mangle -A PREROUTING -i tun0 -s 192.168.1.0/24 -j NFQUEUE --queue-num 2
