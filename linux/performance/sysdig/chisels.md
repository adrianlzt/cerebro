## Chisels ## https://github.com/draios/sysdig/wiki/Chisels%20User%20Guide
Scripts para sysdig.
Podemos programar los nuestros.

Listar:
sysdig -c l

Info:
sysdig -i echo_fds


Chisel para ver actividad de IO: http://draios.com/using-sysdig-to-explore-io/
sysdig –r trace.scap –c fdbytes_by fd.type
  sumario de actividad por tipo de IO (file, socket, ipv4, etc)
sysdig –r trace.scap –c fdbytes_by fd.directory "fd.type=file"
  sumario de actividad por directorio
sysdig –r trace.scap –c fdbytes_by fd.filename "fd.directory=/tmp/"
  actividad de los ficheros de /tmp
sysdig –r trace.scap –c fdbytes_by proc.name "fd.directory=/tmp/ and fd.filename contains .s"
  actividad en /tmp por proceso
sysdig -A –r trace.scap –c echo_fds "fd.filename=ccJvb4Mi.s"
  ver la actividad de escritura a un fichero


Errores:
See the files where most time has been spent
sysdig -c topfiles_time

See the files where apache spent most time
sysdig -c topfiles_time proc.name=httpd

See the top processes in terms of I/O errors
sysdig -c topprocs_errors

See the top files in terms of I/O errors
sysdig -c topfiles_errors

See all the failed disk I/O calls
sysdig fd.type=file and evt.failed=true

See all the failed file opens by httpd
sysdig "proc.name=httpd and evt.type=open and evt.failed=true"

See the system calls where most time has been spent
sysdig -c topscalls_time

See the top system calls returning errors
sysdig -c topscalls "evt.failed=true"

snoop failed file opens as they occur
sysdig -p "%12user.name %6proc.pid %12proc.name %3fd.num %fd.typechar %fd.name" evt.type=open and evt.failed=true

Print the file I/O calls that have a latency greater than 1ms:
sysdig -c fileslower 1

