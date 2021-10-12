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


# Meter aplicaciones por un proxy cuando no saben usarlo
socat TCP4-LISTEN:8000,reuseaddr,fork PROXY:nombre.proxy.com:destino.peticion.com:443,proxyport=8080,proxyauth=USUARIOPROXY:PASSPROXY

Con esta llamada levantamos socat en el puerto 8000.
Las peticiones que hagamos a localhost:8000 se enviarán en realidad a https://destino.peticion.com:443 usando el proxy nombre.proxy.com con la autorización de proxy USUARIOPROXY:PASSPROXY
Esto nos vale para conectar una aplicación a un endpoint remoto usando un proxy, cuando la aplicación no sabe configurar el proxy.
Tendremos que meter en /etc/hosts el destino.peticion.com apuntando a 127.0.0.1

Si hacemos:
curl https://destino.peticion.com:8000
Esto lo recogerá socat.
Socat establecerá una conexión con el proxy, diciendo que quiere conectar a destino.peticion.com:443 (CONNET destino.peticion.com:443).
Se enviará el GET por TLS y obtendremos la respuesta de destino.peticion.com:443
