ifconfig mtu 9000 # habilita jumbo frames. Nos dará más velocidad, menor overhead. Pero tienen que aceptarlos los elementos de la red
                    Se puede configurar mucho más grandes si queremos transmitir ficheros grandes.


Jumbo frames cuando mtu >= 9000


ifconfig eth0 mtu 1492
