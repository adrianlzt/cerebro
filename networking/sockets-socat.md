# http://www.dest-unreach.org/socat/doc/socat.html
http://www.dest-unreach.org/socat/doc/linuxwochen2007-socat.pdf

socat para analizar sockets de fichero.

Leer un socket de fichero ignorando si termina el fichero
# socat -u /var/spool/icinga/ido.sock,ignoreeof -

# Proxy de socket
socat -d -d -x -v unix-listen:NUEVO,fork unix-connect:EXISTENTE

El truco es poner a socat en medio:
1.- Arrancar la aplicación que escucha del socket
	crea file.socket
2.- Movemos ese socket y lo llamamos file.socket.old
3.- Ponemos el socat para que escuche en un socket (donde escribira la aplicion) y escriba en el .old
	socat -d -d -x -v unix-listen:file.socket,fork unix-connect:file.socket.old
     -v imprime en texto
     -x imprime en hexadecimal
4.- Arrancamos la aplicacion escritora
	Esta escribirá en file.socket, socat nos lo mostrará, y lo escribirá en file.socket.old para que lo lea la aplicación lectora


Aunque este sistema no me ha funcionado con icinga (idomod <-> ido2db)
Pero si funciona por ejemplo para check_mk-multisite <-> icinga


Socket listen (funciona?):
socat UNIX-LISTEN:/tmp/socket -

Comunicación bidireccional:
socat UNIX:/tmp/socket -

socat UNIX-CONNECT:/var/run/blabla/nameofthe.sock STDIN
nc -U /var/run/blabla/namedersocket.sock

Socat examples:
http://stuff.mit.edu/afs/sipb/machine/penguin-lust/src/socat-1.7.1.2/EXAMPLES

Escribir al socket /dev/log (mas info en rsyslog.md)
echo "<175>abcdefgh cosas y mas cosas" | socat unix-sendto:/dev/log STDIN


socat TCP4-LISTEN:1234,fork TCP4:192.168.1.1:22
forwards your port 1234 to another machine's port 22. Very useful for quick NAT redirection.


# SSL
echo "GET / HTTP/1.0\n\n" | socat openssl:server.es:443 stdio
