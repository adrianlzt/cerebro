Ver fields.md para ver como saber cuales disponemos

evt.num para filtrar por el numero de evento.

fd.type=ipv4
fd.type=file

fd.typechar=u
  filtrar por unix sockets

fd.name contains /var/run/docker.sock -c echo_fds
  ver lo que está pasando por el unix socket

fd.name contains /var/run/docker.sock and proc.name=docker and evt.type=write -c echo_fds
  ver lo que está escribiendo "docker" en "/var/run/docker.sock"

fd.type=ipv4 and proc.name=cur

fd.type=ipv4 and \( proc.name=curl or proc.name=nc \)

fd.cip=127.0.0.1
fd.ip           matches the ip address (client or server) of the fd.
fd.cip          client IP address.
fd.sip          server IP address.
fd.lip          local IP address.
fd.rip          remote IP address.

evt.type=accept and proc.name!=httpd

evt.type=open and fd.name contains /etc

evt.args contains GET
  mostrar solo las llamadas GET

Ficheros abiertos por un proceso
proc.name="check_logfiles." and fd.type=file and evt.type=open

Ficheros que toca uwsgi que no se llamen alarmer (que no esté en su path)
proc.name=uwsgi and fd.type=file and not fd.name contains alarmer

evt.type=write and evt.buffer contains FATAL
  escrituras a disco que contengan la cadena FATAL

proc.name solo pilla los 15 primeros caracteres

evt.type=chdir

env.type=execve
  comandos ejecutados

fd.port=8000 or fd.port=3128
