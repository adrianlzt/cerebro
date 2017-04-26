http://linux.die.net/man/5/xinetd.conf

Si tenemos systemd usar socket y services.

yum install xinetd
chkconfig xinetd on
service xinetd start


# Logging
https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/3/html/Reference_Guide/s1-tcpwrappers-xinetd-config.html#S3-TCPWRAPPERS-XINETD-ALT-LOG

Por defecto a syslog.
Cada conexión genera:
Mar 10 15:15:13 HOSTNAME xinetd[21478]: START: livestatus from=::ffff:127.0.0.1
Mar 10 15:15:13 HOSTNAME xinetd[21478]: EXIT: livestatus duration=0(sec)

Para desactivarlo:
log_on_success =

Tambien se puede enviar a fichero y marcar límites de tamaño para que deje de escribir



Ejemplo:
/etc/xinetd.d/livestatus
service livestatus
{ 
  type = UNLISTED
  port = 6557
  socket_type = stream
  protocol = tcp
  wait = no
  # limit to 100 connections per second. Disable 3 secs if above.
  cps = 100 3
  # set the number of maximum allowed parallel instances of unixcat.
  # Please make sure that this values is at least as high as
  # the number of threads defined with num_client_threads in
  # etc/mk-livestatus/nagios.cfg
  instances = 500
  # limit the maximum number of simultaneous connections from
  # one source IP address
  per_source = 250
  # Disable TCP delay, makes connection more responsive
  flags = NODELAY
  user = icinga
  server = /usr/bin/unixcat
  server_args = /var/spool/icinga/cmd/live
  # configure the IP address(es) of your Nagios server here:
  # only_from = 127.0.0.1 10.0.20.1 10.0.20.2
  disable = no
}

type = UNLISTED
  if this is a service not listed in a standard system file (like /etc/rpc for RPC services, or /etc/services for non-RPC services).





redirect
  nos sirve para redirigir puertos a otro puerto

cps
  Limits the rate of incoming connections.

max_load
  Takes a floating point value as the load at which the service will stop accepting connections

Se pueden limitar el numeros de ficheros abiertos, memoria, cpu, etc
  rlimit_files, rlimit_cpu, rlimit_rss...


