dnsmasq - dns -resolv.conf

http://www.stgraber.org/2012/02/24/dns-in-ubuntu-12-04/
https://help.ubuntu.com/community/Dnsmasq
Información sobre la conexión, dns, ip, gateway, etc
$ nm-tool
Esta utilidad es la que hay que usar para ver los dns que estamos usando, ya que resolv.conf va a apuntar a localhost


dnsmasq es el servidor dns que corre localmente ubuntu.
Si queremos definir un host a una ip de manera fija, editamos /etc/dnsmasq.conf
address=/sro.whatsapp.net/192.168.1.33
