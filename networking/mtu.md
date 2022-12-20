ifconfig mtu 9000 # habilita jumbo frames. Nos dará más velocidad, menor overhead. Pero tienen que aceptarlos los elementos de la red
                    Se puede configurar mucho más grandes si queremos transmitir ficheros grandes.


Jumbo frames cuando mtu >= 9000


ifconfig eth0 mtu 1492

ip link set mtu 1450 dev eth0



# Probando a localizar que tamaño de paquete es válido
https://mike632t.wordpress.com/2019/03/03/determine-mtu-size-using-ping/

Obligamos a ping a enviar un paquete con MTU 1500 (quitamos 28 por las headers que metemos) y no le permitimos fragmentar:
ping -s $(( 1500 - 28 )) -c 1 -M do 1.1.1.1

-M do
obligamos a no poder fragmentar.


Si el paquete no cabe en el mtu configurado localmente nos dará este error:
ping: local error: message too long, mtu=1500

Si el paquete no cabe "aguas arriba" veremos:
From 172.17.0.1 icmp_seq=1 Frag needed and DF set (mtu = 1450)
Siendo "172.17.0.1" el que nos ha limitado el paquete.


Ese equipo que nos ha limitado nos dice que mtu debemos usar, por lo que ahora haremos el siguiente paso:
ping -s $(( 1450 - 28 )) -c 1 -M do 1.1.1.1

Ahora puede que funcione o puede que otro equipo más aguas arriba lo vuelva a reducir.



# Linux configuración MTU
*Generado por GPT3*
Linux automatically configures the MTU for network interfaces through the use of Path MTU Discovery (PMTUD). PMTUD is a process by which two hosts negotiate the largest packet size that can be sent without fragmenting. When two hosts communicate, the underlying network protocol will send out packets with a certain size. If the size of the packet is too large to be sent in one piece, the network stack on the sending host will automatically fragment the packet and send the smaller pieces. PMTUD will detect this fragmentation and then negotiate a new, smaller packet size that can be sent without fragmenting. This ensures that all of the packets sent by the sending host will be able to traverse the network without fragmenting.
