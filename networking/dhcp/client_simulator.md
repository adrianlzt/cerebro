Usar el binario dhtest de este directorio:
sudo ./dhtest -i eth1 -m 00:11:22:33:44:55 --verbose


Mirar networking/scapy.md
Buscar en #DHCP


https://sargandh.wordpress.com/2012/02/23/linux-dhcp-client-simulation-tool/
https://github.com/saravana815/dhtest

Mirar python.md

Bajar:
curl -LO https://github.com/saravana815/dhtest/archive/master.zip

unzip master.zip
cd dhtest-master/
make
sudo ./dhtest -i eth1 -m 00:11:22:33:44:55 --verbose



# Develop

En https://github.com/saravana815/dhtest/blob/master/headers.h#L178 están los códigos que envía DHCP
En https://www.ietf.org/rfc/rfc2132.txt , a partir de "3.3. Subnet Mask" está que es cada código y como está codificado.
