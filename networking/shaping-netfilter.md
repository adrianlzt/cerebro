http://linux-ip.net/articles/Traffic-Control-HOWTO/
https://wiki.linuxfoundation.org/networking/netem

Como dar prioridades a ciertos tráficos.

1.- Netfilter
Aplicar una disciplina de clase con el comando 'tc'

- Se aplica justo antes de la salida por el interfaz, así que podemos marcar los paquetes en el POSTROUTING.

- Ejemplo: cola 1:0 de tipo HTB (Hierarchical Token Bucket) con 3 clases 1:1 1:2 1:3 de distinta capacidad, y crea 3 filtros que envían el trafico con 
    MARK=10 a 1:1
    MARK=20 a 1:2
    MARK=30 a 1:3:


tc qdisc add dev eth0 root handle 1:0 htb default 3
  definimos la clase raiz, definiendo la disciplina (HTB). Hay muchas clases de disciplinas. Otro interesante es SFQ para suavizar el tráfico (permitir sobrepasar)
  Lo recomendado es definir el máximo del canal en esta definición raiz.
  default 3 quiere decir que los que no cumplan nada se van a la tercera regla
  raiz se pone n:0
  se recomienda siempre poner un raiz y de ahí colgar los hijos, con las ramificaciones que quieras (colgar un hijo de otro hijo).

Luego definimos 3 clases de flujo con distintos rangos de velocidad
tc class add dev eth0 parent 1:0 classid 1:1 htb rate 1kbit ceil 1kbit
  todo lo que venga con la clase 1 le das 1kbps (ceil sería si queremos dar un rango, sería el límite superior)
tc class add dev eth0 parent 1:0 classid 1:2 htb rate 10kbit ceil 10kbit
tc class add dev eth0 parent 1:0 classid 1:3 htb rate 50kbit ceil 50kbit

La velocidad se puede definir en kbits/s, kBytes/s, mbits/s MB/s, etc

Ahora asociamos ese id (1:n) a los MARK que pondremos en las reglas de netfilter (iptables/nftables)
tc filter add dev eth0 parent 1:0 protocol ip handle 10 fw classid 1:1
tc filter add dev eth0 parent 1:0 protocol ip handle 20 fw classid 1:2
tc filter add dev eth0 parent 1:0 protocol ip handle 30 fw classid 1:3



ip link show                                    # qdisc usada por cada interfaz
tc -s qdisc                                     # muestra conf de colas
tc -s qdisc show dev eth0                       # muestra conf de colas para una interfaz
tc -s class show dev eth0                       # muestra conf de clases
tc filter show dev eth0                         # muestra conf de filtros
tc qdisc del dev eth0 root                      # blanquea configuracion (pfifo_fast)
tc -s qdisc del dev enp8s0 handle 8001: root    # Borrar una conf especifica por su id


- Prueba: se envía tráfico de salida a través de cada una de las clases, y se monitoriza la tasa de bytes ICMP enviados con iptraf.

ping -f -s 5000 www.google.com
iptables -t mangle -A POSTROUTING -p icmp -j MARK --set-mark 10
iptables -t mangle -A POSTROUTING -p icmp -j MARK --set-mark 20
iptables -t mangle -A POSTROUTING -p icmp -j MARK --set-mark 30

iptables -t mangle -F


# Delay incoming packets
Es más complicado. Hace falta usar un psudo-device.
Como aproximácion, intentar afectar el output del otro extremo.
