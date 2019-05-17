https://cbonte.github.io/haproxy-dconv/2.0/configuration.html#4.2-log

Lo normal es que haproxy envíe los logs a syslog (/dev/log).
Ahí los cojerá journald o syslog.

Configurar rsyslogd para enviar los logs de haproxy a un fichero:
https://www.youtube.com/watch?v=O64HDqtDrMw


Enviar a stdout o stderr (menor performance, porque no usan unbuffered logs https://cbonte.github.io/haproxy-dconv/2.0/configuration.html#4.2-log mirar en "A file descriptor..."):
global
  log stdout daemon

Poner en defaults, "log global" para enviar los logs al logger definido en global.
