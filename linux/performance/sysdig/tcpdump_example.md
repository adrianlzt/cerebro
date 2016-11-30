tcpdump por proceso
sysdig -N fd.type=ipv4 and proc.name=cur
   podemos usar tambien proc.pid
   -N para que no traduzca puertos

Show the network data that apache exchanged with 192.168.0.1.
sysdig -A -c echo_fds fd.sip=192.168.0.1 and proc.name=httpd

echo "hola mundo" > index.html
while true; do { echo -e 'HTTP/1.1 200 OK\r\n'; cat index.html; } | nc -l 8080; done
sysdig fd.type=ipv4 and \( proc.name=curl or proc.name=nc \)
curl localhost:8080
Nos mostrará una especie de captura tcpdump pero asociando paquetes a los procesos.

