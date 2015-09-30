https://www.inet.no/dante/index.html
https://www.inet.no/dante/doc/latest/config/socks.html

Dante funciona modificando el LD_PRELOAD (https://www.inet.no/dante/doc/faq.html#socksify_system) de manera que las syscalls connect, bind y udpassociate ejecutan unas llamadas modificadas que meten el tráfico en un proxy. Más información en su [https://www.inet.no/dante/doc/latest/config/socks.html web].

# RPM
El .tar.gz viene con el .spec para gener un rpm

Debajo de la línea de BuildRoot meter las dependencias:
Requires: glibc-devel


Genera:
dante-1.4.1-1.el6.src.rpm
dante-1.4.1-1.el6.x86_64.rpm
dante-server-1.4.1-1.el6.x86_64.rpm
dante-devel-1.4.1-1.el6.x86_64.rpm
dante-debuginfo-1.4.1-1.el6.x86_64.rpm


# Cliente

cat /etc/socks.conf
# $Id: socks-simple.conf,v 1.13 2012/06/01 19:59:26 karls Exp $
#
# A simple sample socks.conf for users with a local DNS server.
#

# Assuming de0 is on the lan-net, the below will make connections to it
# (and anything else on the lan), be direct, i.e. not go via the proxy.
route { from: 0.0.0.0/0 to: 10.0.0.0/8 via: direct }
# Esta regla la ponemos hace que las peticiones a 10.0.0.0/8 no vayan por el proxy.
# Es util para que la resolucion por dns no se meta en el proxy

# Clients going anywhere else go via the proxy server listening at
# IP address 10.1.1.1, port 1080.  Uncomment the line(s)
# corresponding to the proxy protocols your proxy server supports.
route { 
        from: 0.0.0.0/0   to: 0.0.0.0/0   via: 5.77.22.9 port = 443
        proxyprotocol: socks_v5         # server supports socks v5.
#        proxyprotocol: socks_v4         # server supports socks v4.
#        proxyprotocol: http             # server supports http.
}

# Con esta regla enviamos todo el trafico al puerto 443 del servidor 5.77.22.9 donde habrá un servidor dante


# Server
/etc/sockd.conf
logoutput: /var/log/sockd.log
internal: eth0 port = 443
external: eth0
socksmethod: none
clientmethod: none
user.notprivileged: sockd
client pass { from: 195.235.0.0/16 to: 0.0.0.0/0 }
socks block { from: 0.0.0.0/0 to: lo log: connect }
socks pass { from: 0.0.0.0/0 to: 0.0.0.0/0 }
