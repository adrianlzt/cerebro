dnsmasq - dns -resolv.conf

http://www.thekelleys.org.uk/dnsmasq/doc.html
http://www.thekelleys.org.uk/dnsmasq/docs/dnsmasq-man.html
http://www.stgraber.org/2012/02/24/dns-in-ubuntu-12-04/
https://help.ubuntu.com/community/Dnsmasq

Ejemplo configuración: http://thekelleys.org.uk/gitweb/?p=dnsmasq.git;a=blob_plain;f=dnsmasq.conf.example

Si ponemos varios servidores, ante la primera petición hará un flood para preguntar a todos los servidores dns, y en las siguientes peticiones aprenderá cual funciona y preguntará a ese, o a un par simultáneamente.

# Arch
pacman -S dnsmasq
vi /etc/resolvconf.conf
...
nameserver=127.0.0.1


vi /etc/dnsmasq.conf
# By  default,  dnsmasq  will  send queries to any of the upstream
# servers it knows about and tries to favour servers to are  known
# to  be  up.  Uncommenting this forces dnsmasq to try each query
# with  each  server  strictly  in  the  order  they   appear   in
# /etc/resolv.conf
#strict-order

interface=lo0
listen-address=127.0.0.1

# Tells dnsmasq to never forward A or AAAA queries for plain names,
# without dots or domain parts, to upstream nameservers. If the name
# is not known from /etc/hosts or DHCP then a "not found" answer is
# returned.
domain-needed

# All reverse lookups for private IP ranges (ie 192.168.x.x, etc)
# which are not found in /etc/hosts or the DHCP leases file are
# answered with "no such domain" rather than being forwarded upstream.
bogus-priv

# If you don't want dnsmasq to read /etc/resolv.conf or any other
# file, getting its servers from this file instead (see below), then
# uncomment this.
no-resolv

# If you don't want dnsmasq to poll /etc/resolv.conf or other resolv
# files for changes and re-read them then uncomment this.
no-poll

# For debugging purposes, log each DNS query as it passes through
# dnsmasq.
#log-queries


# This option forces dnsmasq to really bind only the interfaces 
# it is listening on. About the only time when this is useful is
# when running another nameserver (or another instance of dnsmasq)
# on the same machine. Setting this option also enables multiple
# instances of dnsmasq which provide DHCP service to run in the
# same machine.
bind-interfaces


# Internet server
# Telefonica
server=80.58.61.250
server=80.58.61.254
# Google
server=8.8.8.8
server=8.8.4.4
# Dominios privados
server=/dom.inet/10.23.1.80


systemctl enable dnsmasq
systemctl start dnsmasq






dnsmasq es el servidor dns que corre localmente ubuntu.
Si queremos definir un host a una ip de manera fija, editamos /etc/dnsmasq.conf
address=/sro.whatsapp.net/192.168.1.33


Se pueden crear alias:
address=/double-click.net/127.0.0.1

Alias de otros hosts (estos hosts deben estar en /etc/hosts o tener resolucion por dhcp):
cname=pepe,ordenador-de-pepe

Para crear alias de hostnames mirar linux/hostaliases.md


# Comprobar conf
dnsmasq --test



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
