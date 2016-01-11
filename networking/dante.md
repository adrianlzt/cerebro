https://www.inet.no/dante/index.html
https://www.inet.no/dante/doc/latest/config/socks.html

Dante funciona modificando el LD_PRELOAD (https://www.inet.no/dante/doc/faq.html#socksify_system) de manera que las syscalls connect, bind y udpassociate ejecutan unas llamadas modificadas que meten el tráfico en un proxy. Más información en su [https://www.inet.no/dante/doc/latest/config/socks.html web].

Otra opcion: tsocks.md (deprecated)
Tambíen torsocks, aunque orientado a la red tor.

Algunos programas, por ejemplo openvpn, escapan de socksify. No sabemos muy bien como. Por un fork? Creo que por trafico UDP.

# Simple, sin dante server
pacman -S dante
ssh -D 1080 user@maquinasalto
vi /etc/socks.conf
# First route to go direct (no socks server) for telefonica network (dns, etc.)
route { from: 0.0.0.0/0 to: 10.0.0.0/8 via: direct }

# Clients going anywhere else will use the socks server at port 443
route {
        from: 0.0.0.0/0   to: 0.0.0.0/0   via: 127.0.0.1 port = 1080
        proxyprotocol: socks_v5         # server supports socks v5.
}  

socksify curl eth0.me
  deberiamos ver la ip de maquinasalto

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


# Debug
https://www.inet.no/dante/doc/faq.html#bugs
$ head /etc/socks.conf  
logoutput: /tmp/dante.log
debug: 2



SOCKS_DEBUG=1 SOCKS_LOGOUTPUT=stdout socksify curl eth0.me

Para mas debug, del cliente (puede ser CCFLAGS o CFLAGS):
CCFLAGS="-g" ./configure --enable-debug --enable-livedebug --enable-warnings --enable-diagnostic --disable-server
make


Como funciona:
LD_LIBRARY_PATH=/usr/lib LD_PRELOAD="libdsocks.so  libdl.so" curl eth0.me

Si estamos compilando manualmente podemos probar antes de instalar:
cd dante-1.4.1/lib/.libs/
cd dante-1.4.1/dlib/.libs/

LD_LIBRARY_PATH="$PWD" LD_PRELOAD="libdsocks.so libdl.so" ~/Documentos/vagrant/dante/./prueba.py 2>&1 | grep socks_nbconnectroute



# Internals
dlib/interposition.c
Libreria donde se hace el hijacking de las syscall

Ejemplo de connect():
connect(s, name, namelen) ...
{
   if (socks_issyscall(s, SYMBOL_CONNECT))
      return sys_connect(s, name, namelen);
   return Rconnect(s, name, namelen);


Si es una syscall de socks, usa glibc, si no, llamos a Rconnect
lib/Rconnect.c
int Rconnect(s, _name, namelen) ...

Más adelante se define que un SIGIO se llame a currentsig
if (sigaction(SIGIO, NULL, &currentsig) != 0) {


lib/connectchild.c
      if (FD_ISSET(mother_data, wset)) {
         /*
          * Have finished requests we should send to mother.
          */

         while (finishedc > 0) {
            if (sendmsgn(mother_data, &finishedv[finishedc - 1].msg, 0, 0)

Creo que en el envio de este mensajes es cuando salta la excepcion EINTR






# Errores

Si un estamos usando socksify con un programa que crea un socket y le define un timeout, cuando ese mensaje se envia por el canal.
31104 14:30:34.487724 rt_sigreturn({mask=[]}) = -1 EINTR (Interrupted system call)

Esto es es por un bug con el tratamiento de la interrupción EINTR en python.
Arreglado en 3.5.0 https://www.python.org/dev/peps/pep-0475/

