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


dnsmasq corre debajo de NetworkManager

Para meter configuraciones de dnsmasq hacerlo en: /etc/NetworkManager/dnsmasq.d
Y reiniciar NetworkManager:
restart network-manager

Se pueden crear alias:
address=/double-click.net/127.0.0.1

Alias de otros hosts (estos hosts deben estar en /etc/hosts o tener resolucion por dhcp):
cname=pepe,ordenador-de-pepe

Para crear alias de hostnames mirar linux/hostaliases.md
