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

