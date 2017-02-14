Para sockets mirar socat.md

Pequeña implementación en python: netcat.py
Permite escuchar en sockets y establecer conexión

Testear una conexión: nc -vz ip port
Testear una conex udp: nc -vuz ip port
>/dev/tcp/ip/port
  Si retorna 0 es que hay conexion

Copiar ficheros entre maquinas
El que recibe: nc -l -p 1234 | cat - > fichero
El que envia: cat fichero | nc ip 1234


copiar directorios:
Destination box: nc -l -p 2342 | tar -C /target/dir -xzf -
Source box: tar -cz /source/dir | nc Target_Box 2342


For example if you wished to redirect traffic from port 24 on one machine to port 22 on another then you could insert a line like this inside your /etc/inetd.conf file:
24		stream 	tcp	nowait	nobody	/usr/sbin/tcpd /bin/nc 192.168.1.1 22
(Don't forget to restart inetd by executing /etc/init.d/inetd restart).
Now when you connect to your server on port 24 you'll be seamlessly redirected to the SSH port (22) on the remote machine 192.168.1.1.


Algunos ejemplos de utilidades: http://ubuntuforums.org/showthread.php?t=828870


IPv6/IPv4
Si un hostname resuelve su dirección en IPv6 e IPv4, netcat intentará conectar con ambas, pudiendo mostrar dos líneas, una para el intento a IPv6 y otro para IPv4


Super simple web server.
while true; do { echo -e 'HTTP/1.1 200 OK\r\n'; cat index.html; } | nc -l 8080; done


Conectar a un socket:
nc -U /var/run/docker.sock

Escucha de forma continuada (sin -k, tras el primer cliente, se cierra)
nc -kl 8080
  netcat openbsd
nc -6kl 8080
  para escuchar en ipv6

nc -l 127.0.0.1 -p 8080
  netcat gnu, pero al salir la primera conex muere
nc --continuous -e /bin/id -lp 80
  netcat gnu, al conectar le da al cliente el output del comando id

Para udp
nc -klu 8080

# SSL
ncat --ssl ing.ingdirect.es 443
  creo que esta es la version de nmap
