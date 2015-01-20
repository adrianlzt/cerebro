dnsmasq - dns -resolv.conf

http://www.thekelleys.org.uk/dnsmasq/doc.html
http://www.stgraber.org/2012/02/24/dns-in-ubuntu-12-04/
https://help.ubuntu.com/community/Dnsmasq

Ejemplo configuración: http://thekelleys.org.uk/gitweb/?p=dnsmasq.git;a=blob_plain;f=dnsmasq.conf.example

Información sobre la conexión, dns, ip, gateway, etc
$ nm-tool
Esta utilidad es la que hay que usar para ver los dns que estamos usando, ya que resolv.conf va a apuntar a localhost


dnsmasq es el servidor dns que corre localmente ubuntu.
Si queremos definir un host a una ip de manera fija, editamos /etc/dnsmasq.conf
address=/sro.whatsapp.net/192.168.1.33


Se pueden crear alias:
address=/double-click.net/127.0.0.1

Alias de otros hosts (estos hosts deben estar en /etc/hosts o tener resolucion por dhcp):
cname=pepe,ordenador-de-pepe

Para crear alias de hostnames mirar linux/hostaliases.md


# PXE
mirar networking/pxe.md



# DHCP
Opciones: https://www.ietf.org/rfc/rfc2132.txt

/etc/dnsmasq.conf
dhcp-range=192.168.1.200,192.168.1.220,12h
# magic number 3 here is the DHCP standard option number for "router"
dhcp-option=3,192.168.1.1
# DNS (6)
dhcp-option=6,8.8.8.8,8.8.4.4
# Domain Name (15)
#dhcp-option=15,dhcp.edoceo.com
# IP Forward (19) no
#dhcp-option=19,0
# Source Routing (20)
#dhcp-option=20,0
# NTP Server (42)
#dhcp-option=42,0.0.0.0



# Opciones interesantes
       --all-servers
              By default, when dnsmasq has more than one upstream server available, it will send queries to just one server. Setting this flag forces dnsmasq to send
              all queries to all available servers. The reply from the server which answers first will be returned to the original requester.
