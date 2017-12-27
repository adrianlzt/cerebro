#! /usr/bin/env python2.7
#
# Regla de salida, aqui ponemos la red fake cuyos paquetes vamos a modificar
# sudo iptables -t mangle -A POSTROUTING -d 192.168.44.0/24 -j NFQUEUE --queue-num 1

# regla de entrada, los paquetes de la vpn ven modificada su cabecera antes de entrar para saber a que proceso enviarlos
# sudo iptables -t mangle -A PREROUTING -i tun0 -s 192.168.1.0/24 -j NFQUEUE --queue-num 2
#
#
# sudo ip route add 192.168.44.0/24 dev tun0
#
# docker run -it --rm --cap-add=NET_ADMIN --net=host -e QUEUE_NUM=1 -e NETWORK=192.168.1 -e DIRECTION=out -v "$PWD/netmap_inv.py:/nfqueue_listener.py" milesrichardson/nfqueue-scapy
# docker run -it --rm --cap-add=NET_ADMIN --net=host -e QUEUE_NUM=2 -e NETWORK=192.168.44 -e DIRECTION=in -v "$PWD/netmap_inv.py:/nfqueue_listener.py" milesrichardson/nfqueue-scapy



from scapy.all import IP,TCP,send
from netfilterqueue import NetfilterQueue
import socket
#from pprint import pprint
import json
import os
import sys
import logging

try:
    QUEUE_NUM = int(os.getenv('QUEUE_NUM', 1))
except ValueError as e:
    sys.stderr.write('Error: env QUEUE_NUM must be integer\n')
    sys.exit(1)

NETWORK = os.getenv('NETWORK', "192.168.1")
DIRECTION = os.getenv('DIRECTION', "out")

def callback(pkt):

    try:
        packet = IP(pkt.get_payload())

        #print("inicial")
        #pprint(packet)

        # Modificamos la IP a donde vamos a enviar el paquete
        # Tenemos que quedarnos con la parte de la IP que no es de la red y modificar el resto
        # 192.168.1.133, 10.0.0.0/24 -> 10.0.0.133
        net = NETWORK.split(".")[0:3]

        if DIRECTION == "out":
            last_ip_part = packet[IP].dst.split(".")[3]
            net.append(last_ip_part)
            # 192.168.44.133, 192.168.1.0/24 -> 192.168.1.133
            packet[IP].dst = ".".join(net)
        else:
            last_ip_part = packet[IP].src.split(".")[3]
            net.append(last_ip_part)
            # 192.168.1.133, 192.168.44.0/24 -> 192.168.44.133
            packet[IP].src = ".".join(net)

        del packet[IP].chksum
        del packet[TCP].chksum
        #print("modificado")
        #pprint(packet)
        pkt.set_payload(str(packet))
        #print("\n\n\n")

        pkt.accept()
    except Exception as e:
        print 'Error: %s' % str(e)

        pkt.drop()

sys.stdout.write('Listening on NFQUEUE queue-num %s... \n' % str(QUEUE_NUM))

nfqueue = NetfilterQueue()
nfqueue.bind(QUEUE_NUM, callback)
s = socket.fromfd(nfqueue.get_fd(), socket.AF_UNIX, socket.SOCK_STREAM)
try:
    nfqueue.run_socket(s)
except KeyboardInterrupt:
    sys.stdout.write('Exiting \n')

s.close()
nfqueue.unbind()
