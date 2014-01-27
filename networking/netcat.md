Testear una conexión: nc -vz ip port
Testear una conex udp: nc -vuz ip port

Copiar ficheros entre maquinas
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
docker -U /var/run/docker.sock
