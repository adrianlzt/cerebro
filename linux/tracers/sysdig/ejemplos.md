## Ejemplos ## https://github.com/draios/sysdig/wiki/Sysdig%20Examples
http://www.sysdig.org/wiki/sysdig-examples/

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

Si hacemos
sysdig proc.name=curl or proc.name=nc
Veremos una especie de strace de los comandos

Espiar que hace cada usuario:
sysdig -c spy_users

Espiar comandos debajo de una shell (el pid corresponderá a la shell):
sudo sysdig -c spy_users proc.loginshellid=11174

Ver el consumo de red de cada proceso (en el último segundo):
sysdig -c topprocs_net

Consumo de CPU por proceso (en el último segundo)
sysdig -c topprocs_cpu

Analizar el contenido de los paquetes de la ip ¿destino/origen? 127.0.0.1
sysdig -X -c echo_fds fd.cip=127.0.0.1
  Usa el chisel echo_fds para mostrar el contenido de los File Descriptors

En que ficheros se está leyendo y/o escribiendo
sysdig -c topfiles_bytes

Mostrar stdin y stdout de un comando
sysdig -c stdin -c stdout proc.name=cat

Ficheros con mayor consumo de IO
sysdig -c topfiles_time

Print process name and connection details for each incoming connection not served by apache.
sysdig -p "%proc.name %fd.name" "evt.type=accept and proc.name!=httpd"

Show every time a file is opened under /etc.
sysdig evt.type=open and fd.name contains /etc

Nos dice a que directorio cambia cada usuario
sysdig -p"user:%user.name dir:%evt.arg.path" evt.type=chdir

Conexiónes de o hacia los puertos 8000 o 3128 (IPv4)
sysdig fd.type=ipv4 and \( fd.port=8000 or fd.port=3128 \)

Mostrar los comandos ejecutados por el usuario ricci
sysdig -p "%proc.cmdline" user.name=ricci and evt.type=execve

Mostrar signals (kill) enviados al proceso top:
sysdig evt.type=signaldeliver and proc.name=top
