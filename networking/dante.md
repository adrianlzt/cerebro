https://www.inet.no/dante/index.html
https://www.inet.no/dante/doc/latest/config/socks.html

Dante funciona modificando el LD_PRELOAD (https://www.inet.no/dante/doc/faq.html#socksify_system) de manera que las syscalls connect, bind y udpassociate ejecutan unas llamadas modificadas que meten el tráfico en un proxy. Más información en su [https://www.inet.no/dante/doc/latest/config/socks.html web].
Otras opciones para modificar syscall, mirar en linux/syscall.md
http://www.alfonsobeato.net/c/modifying-system-call-arguments-with-ptrace/
http://www.goldsborough.me/c/low-level/kernel/2016/08/29/16-48-53-the_-ld_preload-_trick/
https://news.ycombinator.com/item?id=19187417
  explicaciones de como hacer el truco del LD_PRELOAD
https://github.com/pmem/syscall_intercept
  lib para hacer estas modificaciones, me da error al compilar, no he mirado mucho

Ejemplo con open/openat y otras llamadas: https://github.com/NixOS/nixpkgs/blob/master/pkgs/development/tools/misc/saleae-logic/preload.c
Aunque en strace veamos que se llama a openat, al final la función que debemos "fakear" es open.

Otra lib donde fakean muchas syscall: https://github.com/mikix/deb2snap/blob/master/src/preload.c


Otra opcion: tsocks.md (deprecated)
Tambíen torsocks, aunque orientado a la red tor.

Algunos programas, por ejemplo openvpn, escapan de socksify. No sabemos muy bien como. Por un fork? Creo que por trafico UDP.

Dante/socksify también puede usar un proxy http, en vez de socks.
Probado con Squid.


Downloads
https://www.inet.no/dante/sslfiles/binaries.html


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

# Build
## Almalinux9
dnf install -y gcc
curl -O https://www.inet.no/dante/files/dante-1.4.3.tar.gz
tar zxvf dante-1.4.3.tar.gz
cd dante-1.4.3
./configure
make

## RPM
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
``````
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
``````


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



Interfiere con date.
LD_PRELOAD="libdsocks.so" date -d@0 +"%Y-%m"
1970-04

El primer valor los saca bien, pero el resto de valores (en este caso el mes) pone la fecha actual.

Debugeando he llegado hasta aquí:
(gdb) watch tp->tm_mon
Hardware watchpoint 4: tp->tm_mon
(gdb) c
Continuing.
Hardware watchpoint 4: tp->tm_mon

Old value = 0
New value = 3
0x00007ffff76508d2 in __offtime () from /lib64/libc.so.6
(gdb) where
#0  0x00007ffff76508d2 in __offtime () from /lib64/libc.so.6
#1  0x00007ffff7652b07 in __tz_convert () from /lib64/libc.so.6
#2  0x00007ffff7b7f685 in getlogprefix (priority=6, buf=0x7fffffffa010 "", buflen=10240) at ../lib/log.c:1251
#3  0x00007ffff7b7fdb5 in vslog (priority=6, message=0x7ffff7b9580e "%s: pthread locking enabled", ap=0x7fffffffc880, apcopy=0x7fffffffc860)
    at ../lib/log.c:916
#4  0x00007ffff7b80404 in slog (priority=<value optimized out>, message=<value optimized out>) at ../lib/log.c:809
#5  0x00007ffff7b5ec16 in socks_addrinit () at ../lib/address.c:1212
#6  0x00007ffff7b62fc9 in clientinit () at ../lib/client.c:94
#7  0x00007ffff7b6019e in socks_addaddr (clientfd=1, socksfd=0x7fffffffcff0, takelock=0) at ../lib/address.c:162
#8  0x00007ffff7b561f9 in socks_syscall_start (s=1) at interposition.c:440
#9  0x00007ffff7b5651c in sys_fwrite (ptr=0x7fffffffe403, size=4, nmb=1, stream=0x7ffff79437a0) at interposition.c:1475
#10 0x0000000000406a35 in strftime_case_ (upcase=false, s=0x7ffff79437a0, format=<value optimized out>, tp=0x7ffff7948420, ut=0, ns=0)
    at strftime.c:1004
#11 0x00000000004019d0 in show_date (format=0x7fffffffe90d "%Y %m", when=...) at date.c:538
#12 0x000000000040250d in main (argc=<value optimized out>, argv=<value optimized out>) at date.c:514


date usa aqui https://github.com/coreutils/gnulib/blob/e91c0d4f942e90b4af98c6bf17079ed5530d9e05/lib/strftime.c#L408 la estructura de datos tp para almecenar la fecha que luego mostrara por pantalla.
Tras guardar en el buffer el primer dato (el año por ejemplo) (https://github.com/coreutils/gnulib/blob/e91c0d4f942e90b4af98c6bf17079ed5530d9e05/lib/strftime.c#L1024) parece que el cpy lanza sys_fwrite, que es capturada por dante.
Dante comienza a iniciar su cliente y en alguna parte (getlogprefix) usa cosas de fecha que pisan los datos de tp

Este es la parte del codigo de dante que rompe date lib/log.c:1251:
      struct tm *tm;

      if (sockscf.state.insignal
      ||  (tm = localtime(&secondsnow)) == NULL) {

