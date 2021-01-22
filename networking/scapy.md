http://www.secdev.org/projects/scapy/
http://www.secdev.org/projects/scapy/demo.html
http://www.secdev.org/projects/scapy/doc/

http://www.devx.com/security/Article/34741/0/page/5
Secure Your Wireless Networks with Scapy Packet Manipulation


Scapy is a powerful interactive packet manipulation program. It is able to forge or decode packets of a wide number of protocols, send them on the wire, capture them, match requests and replies, and much more. It can easily handle most classical tasks like scanning, tracerouting, probing, unit tests, attacks or network discovery (it can replace hping, 85% of nmap, arpspoof, arp-sk, arping, tcpdump, tethereal, p0f, etc.). It also performs very well at a lot of other specific tasks that most other tools can't handle, like sending invalid frames, injecting your own 802.11 frames, combining technics (VLAN hopping+ARP cache poisoning, VOIP decoding on WEP encrypted channel, ...),

pacman -S scapy community/python2-gnuplot community/python2-pyx
  community/python2-pyx para generar pdf (150MB bajada, 300MB instalación)
  community/python2-gnuplot para poder pintar gráficas

para mostrar gráficas 3D. vpython 300MB de instalacion
packer -S python2-vpython
pacman -S extra/wxpython2.8



La interfaz de scapy es la cli de python.

ls()
  listar capas con las que puede trabajar

lsc()
  funciones

TCP().show()
  ver parametros de un paquete TCP

Crear paquete ip:
>>> ip = IP(dst='192.168.1.1')
>>> ip.display()
  muestra toda la info del paquete
  la ip.src irá variando según cual sea el ip.dst

Crear paquete tcp y darle unos flags
>>> t=TCP()
>>> t.flags="SA"

Componer capas:
>>> a = IP()/TCP()/"GET / HTTP/1.0\r\n\r\n"
>>> a=Ether()/IP(dst="www.slashdot.org")/TCP()/"GET /index.html HTTP/1.0 \n\n"
>>> hexdump(a) 


Enviar un paquete ICMP
send(IP(dst="192.168.1.1")/ICMP())


Enviar paquetes Ethernet con la cadena XXX por la interfaz wlo1
sendp("XXX", iface="wlo1", loop=1, inter=0.2)


Hacer replay de una captura de tráfico:
>>> sendp(rdpcap("/tmp/pcapfile")


Enviar paquetes nivel 2 (ethernet) y esperar respuesta:
srp()

Enviar paquetes nivel 3 (IP) y esperar respuesta
p=sr1(IP(dst="192.168.1.1")/ICMP()/"XXXXXXXXXXX")
p.show()
  nos da información detallada del paquete recibido (como wireshark)

Obtener datos del paquete:
p[TCP].seq
  para obtener el numero de secuencia de un paquete


Escaneo de puertos (envia un SYN al puerto)
>>> sr(IP(dst="192.168.8.1")/TCP(dport=[21,22,23]))
Received 6 packets, got 3 answers, remaining 0 packets
(<Results: UDP:0 TCP:3 ICMP:0 Other:0>, <Unanswered: UDP:0 TCP:0 ICMP:0 Other:0>)
>>> ans,unans=_
>>> ans.summary()
  aqui podemos ver si el puero esta abierto, flags de la contestacion SA (SYN+ACK)
  o cerrados RA (RST+ACK)


Capturar trafico
>>>  sniff(filter="icmp and host 66.35.250.151", count=2)
<Sniffed: UDP:0 TCP:0 ICMP:2 Other:0>
>>>  a=_
>>>  a.nsummary()


Ir mostrando según se captura
>>> sniff(iface="wifi0", prn=lambda x: x.summary())

Ir mostrando todo el paquete completo:
>>> sniff(iface="eth1", prn=lambda x: x.show())


Hacer un traceroute a varias webs y obtener un gráfico de como ha ido saltando el tráfico
res,unans = traceroute(["www.microsoft.com","www.cisco.com","www.yahoo.com","www.wanadoo.fr","www.pacsec.com"],dport=[80,443],maxttl=20,retry=-2)
res.graph()



# Triple hand-shake
http://www.packetlevel.ch/html/scapy/scapy3way.html

#!/usr/bin/python
from scapy.all import *
import time

sport=40010
dport=9999
seq=100
ip=IP(dst="192.168.33.10")
TCP_SYN=TCP(sport=sport, dport=dport, flags="S", seq=seq)
TCP_SYNACK=sr1(ip/TCP_SYN)

my_ack = TCP_SYNACK.seq + 1
seq=seq+1
TCP_ACK=TCP(sport=sport, dport=dport, flags="A", seq=seq, ack=my_ack)
send(ip/TCP_ACK)

my_payload="space for rent!"
TCP_PUSH=TCP(sport=sport, dport=dport, flags="PA", seq=seq, ack=my_ack)
PSH=sr1(ip/TCP_PUSH/my_payload)

my_ack = PSH + 1
seq=seq+1
TCP_FIN=TCP(sport=sport, dport=dport, flags="F", seq=seq, ack=my_ack)
# No testeado esto ultimo de cerrar la conex



# DHCP
http://bb.secdev.org/scapy/wiki/doc/IdentifyingRogueDHCPServers

sudo scapy
conf.checkIPaddr = False
fam,hw = get_if_raw_hwaddr(conf.iface)
dhcp_discover = Ether(dst="ff:ff:ff:ff:ff:ff")/IP(src="0.0.0.0",dst="255.255.255.255")/UDP(sport=68,dport=67)/BOOTP(chaddr=hw)/DHCP(options=[("message-type","discover"),"end"])
ans, unans = srp(dhcp_discover, multi=True)      # Press CTRL-C after several seconds
ans.summary()


Funciona con la interfaz por defecto, pero no consigo testear otras interfaces.



# Capturar paquetes, modifiarlos y enviarlos
packet = IP(pkt.get_payload())
packet[IP].dst = "1.2.3.4"
packet[TCP].dport = 80
del packet[IP].chksum
del packet[TCP].chksum
pkt.set_payload(str(packet))
pkt.accept()




# Enviar paquete RST
He intentando generar un paquete RST para romper una conexión, pero no funciona, no tengo claro por que.

tcpkill si consigue enviar un reset y matar la conex, pero solo funciona tras ver algún paquete.
Mi idea era poder enviar un paquete cuando yo quisiera para matar una conex.
