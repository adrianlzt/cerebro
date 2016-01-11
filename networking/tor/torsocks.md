https://gitweb.torproject.org/torsocks.git/
Library for intercepting outgoing network connections and redirecting them through the Tor SOCKS proxy.

Man binario: http://linux.die.net/man/1/torsocks
Man conf: http://linux.die.net/man/5/torsocks.conf
Man lib: https://www.mankier.com/8/torsocks


# Arch
pacman -S torsocks

# Centos / Fedora
Necesitamos epel
yum install torsocks


Tenemos que tener tor arrancado, o configurar un servidor tor para usarlo.

torsocks curl https://check.torproject.org/api/ip


Si queremos usar otro server de tor lo configuramos en
/etc/tor/torsocks.conf
Asegurarnos que el servidor nos deja conectarnos.

Podemos configurar tambien un servidor socks cualquiera, pero no funcionará la resolución de nombres.
Para este caso mirar dante o tsocks

# Desde fuentes
git clone https://git.torproject.org/torsocks.git
cd torsocks
./autogen.sh
make
make install

Fichero de configuracion fijado a: /usr/local/etc/tor/torsocks.conf


# Configuracion
Se puede pasar otro fichero de conf con la variable: TORSOCKS_CONF_FILE

Si queremos que las peticiones a localhost no se envien mediante tor pondremos la opcion:
AllowOutboundLocalhost 1

Problema, los paquetes UDP se siguen filtrando.
Solucionado por este ticket:
https://trac.torproject.org/projects/tor/ticket/16765

# shell torifyiada
. torsocks on
torsocks show
LD_PRELOAD="/usr/lib/torsocks/libtorsocks.so"

# debug
torsocks -d comando

Para poner el modo debug a "mano":
TORSOCKS_LOG_LEVEL=5


# Internals
El funcionamiento basico sin usar torsocks seria:
LD_PRELOAD="/usr/lib/torsocks/libtorsocks.so" curl 73.223.250.65

Como parte de esta ejecucción vemos que se lee el fichero de configuracion:
$ LD_PRELOAD="/usr/lib/torsocks/libtorsocks.so" strace -fs 200 curl 73.223.250.65 2>&1 | grep "conf"
open("/etc/tor/torsocks.conf", O_RDONLY) = 3



## Captura de un connection()
lib/connect.c
LIBC_CONNECT_RET_TYPE tsocks_connect(LIBC_CONNECT_SIG)

chequea que el tipo de socket esta soportado por tor.
Si todo va bien, genera un nuevo struc tipo connection (conn)
  new_conn = connection_create(sockfd, addr);
  ret = tsocks_connect_to_tor(new_conn);
      ret = setup_tor_connection(conn, socks5_method);
      ret = socks5_send_connect_request(conn);
      ret = socks5_recv_connect_reply(conn);

La idea es bastante sencilla, envia la peticion de conex y se queda esperando a la respuesta.




# Detalles
Torsocks no hace caso de los timeout que podamos definir.
Saltará el timeout del sistema en la linea:
[Nov 16 17:51:25] ERROR torsocks[26481]: Connection timed out (in socks5_recv_connect_reply() at socks5.c:536)




# Errores

$ torsocks curl https://check.torproject.org/api/ip
[Jul 08 10:05:22] PERROR torsocks[5567]: socks5 libc connect: Connection timed out (in socks5_connect() at socks5.c:185)
curl: (6) Couldn't resolve host 'check.torproject.org'

No podemos conectar con el server tor




$ torsocks curl https://check.torproject.org/api/ip
[Jul 08 10:08:55] PERROR torsocks[6014]: socks5 libc connect: Connection refused (in socks5_connect() at socks5.c:185)
curl: (6) Couldn't resolve host 'check.torproject.org'

Servidor arrancando, mirar el log del server tor
