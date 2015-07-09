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


# Errores

# torsocks curl https://check.torproject.org/api/ip
[Jul 08 10:05:22] PERROR torsocks[5567]: socks5 libc connect: Connection timed out (in socks5_connect() at socks5.c:185)
curl: (6) Couldn't resolve host 'check.torproject.org'

No podemos conectar con el server tor




# torsocks curl https://check.torproject.org/api/ip
[Jul 08 10:08:55] PERROR torsocks[6014]: socks5 libc connect: Connection refused (in socks5_connect() at socks5.c:185)
curl: (6) Couldn't resolve host 'check.torproject.org'

Servidor arrancando, mirar el log del server tor
