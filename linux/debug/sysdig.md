http://draios.com/announcing-sysdig/
http://www.sysdig.org/
https://github.com/draios/sysdig/wiki

Sysdig is a new Linux system troubleshooting tool, described as a combination of strace, tcpdump and lsof. The examples are pretty impressive and you can imagine lots of tools you could build on top of this.


Nos permite "conectar" lo que pasa en la máquina (procesos) con la red (paquetes)
Es un tcpdump hipervitaminado


Instalación: 
curl -s https://s3.amazonaws.com/download.draios.com/stable/install-sysdig | sudo bash

Máquina vagrant:
https://github.com/adrianlzt/vagrant-ansible-sysdig


## Formato ##
sysdig [parámetros] [chisels] [filtros]


## Guardar información para analizarla posteriormente ##
sysdig -w fichero.scap
sysdig -w fichero.scap -n 100 <- guarda solo los primeros 100 eventos
sysdig -r fichero.scap [podemos poner filtros, parámetros, etc]


## Formato de salida ##
  Sin nada -> texto
  -x <- hexadecimal
  -X <- hexadecimal con una columa traducción a ASCII

  -s 300 <- captura 300 caracteres en vez de los 80 de por defecto (cuidado, puede hacer las capturas enormes!)
  -A <- human readable output
  -a <- absolute time

  ‘>’ indicates and enter event and ‘<’ indicates an exit event.

  -p "%proc.name %fd.name" <- imprime solo el nombre del proceso y el fichero (si ambos valores están disponibles)
  -p "*%proc.name %fd.name" <- imprime la línea con que uno de valores esté disponible (el otro será NA)
     "%evt.num %evt.time %evt.cpu %proc.name (%thread.tid) %evt.dir %evt.type %evt.args" <- formato por defecto

     evt.num 	is the incremental event number
     evt.time 	is the event timestamp
     evt.cpu 	is the CPU number where the event was captured
     proc.name 	is the name of the process that generated the event
     thread.tid is the TID that generated the event, which corresponds to the PID for single thread processes
     evt.dir 	is the event direction, > for enter events and < for exit events
     evt.type 	is the name of the event, e.g. 'open' or 'read'
     evt.args 	is the list of event arguments. In case of system calls, these tend to correspond to the system call arguments, but that’s not always the case: some system call arguments are excluded for simplicity or performance reasons.

   Formato de los file descriptors: num(<type>resolved_string)
     num is the FD number
     resolved_string is the resolved representation of the FD
     type is a single-letter-encoding of the fd type, and can be one of the following:
       f for files
       4 for IPv4 sockets
       6 for IPv6 sockets
       u for unix sockets
       s for signal FDs
       e for event FDs
       i for inotify FDs
       t for timer FDs



## Chisels ## https://github.com/draios/sysdig/wiki/Chisels%20User%20Guide
Scripts para sysdig.
Podemos programar los nuestros.

Listar:
sysdig -c l

Info:
sysdig -i echo_fds


## Filtros ##

Operadores: =, !=, <, <=, >, >=, contains, and, or, not, (, )

Campos válidos para evt.type: sysdig -l
Campos válidos para evt.arg: sysdig -L

"not fd.name contains /dev"
"fd.name contains /root"
"user.name=loris"
fd.type=ipv4 and \( proc.name=curl or proc.name=nc \)
fd.cip=127.0.0.1


## Ejemplos ## https://github.com/draios/sysdig/wiki/Sysdig%20Examples

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

Show the network data that apache exchanged with 192.168.0.1.
sysdig -A -c echo_fds fd.sip=192.168.0.1 and proc.name=httpd

Show every time a file is opened under /etc.
sysdig evt.type=open and fd.name contains /etc

Nos dice a que directorio cambia cada usuario
sysdig -p"user:%user.name dir:%evt.arg.path" evt.type=chdir
