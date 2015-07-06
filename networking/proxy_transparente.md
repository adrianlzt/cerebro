Maquina1--------Maquina2--------Maquina3

Maquina1: 192.168.1.1
Maquina2: 192.168.1.2
Maquina3: 192.168.1.3

Maquina1:
ip route add 192.168.1.3/32 via 192.168.1.2

Maquina3:
ip route add 192.168.1.1/32 via 192.168.1.2


En máquina 2 podemos poner tcpdump para escuchar el tráfico entre las máquinas.
