Una captura de este proceso está en: dhcp.cap

1.- El cliente ejecuta: dhclient eth0
2.- Esto produce que se envíe un paquete:
    "DHCP Discover" a 255.255.255.255 (ff:ff:ff:ff:ff:ff) 
    UDP, source port: 68, dest port: 67
    En este paquete se envía, entre otra información, el hostname y los parametros que queremos (subnet mask, broadcast addr, router, domain name, etc)
3.- El router contesta con un paquete
    "DHCP Offer" desde su ip a 255.255.255.255 (ff:ff:ff:ff:ff:ff)
    UDP, source port: 67, dest port: 68
    En este paquete se devuelve la IP que debe configurar el servidor.
    Tambien puede incluirse el "Boot file name" apuntando a un fichero para hacer carga PXE.
    El lease time de la IP. Renewal time.
    En la opción 210 irá información sobre el working dir para PXE.
    DNSs, subnet mask, domain name, router, etc.
4.- El cliente contestará con un "DHCP Request". Usando un paquete UDP, 0.0.0.0 -> 255.255.255.255 (como el primero)
    En el se pondrá en "Request" la IP que ha sido ofrecida por el servidor
5.- Por último el servidor contestará con un "DHCP ACK"

