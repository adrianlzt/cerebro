# http://www.dest-unreach.org/socat/doc/socat.html
http://www.dest-unreach.org/socat/doc/linuxwochen2007-socat.pdf

socat para analizar sockets de fichero.

Leer un socket de fichero ignorando si termina el fichero
# socat -u /var/spool/icinga/ido.sock,ignoreeof -


El truco es poner a socat en medio:
1.- Arrancar la aplicación que escucha del socket
	crea file.socket
2.- Movemos ese socket y lo llamamos file.socket.old
3.- Ponemos el socat para que escuche en un socket (donde escribira la aplicion) y escriba en el .old
	socat -d -d -x -v unix-listen:file.socket,fork unix-connect:file.socket.old
4.- Arrancamos la aplicacion escritora
	Esta escribirá en file.socket, socat nos lo mostrará, y lo escribirá en file.socket.old para que lo lea la aplicación lectora


Aunque este sistema no me ha funcionado con icinga (idomod <-> ido2db)
Pero si funciona por ejemplo para check_mk-multisite <-> icinga


socat UNIX-CONNECT:/var/run/blabla/nameofthe.sock STDIN
nc -U /var/run/blabla/namedersocket.sock

Socat examples:
http://stuff.mit.edu/afs/sipb/machine/penguin-lust/src/socat-1.7.1.2/EXAMPLES

Escribir al socket /dev/log (mas info en rsyslog.md)
echo "<175>abcdefgh cosas y mas cosas" | socat unix-sendto:/dev/log STDIN

