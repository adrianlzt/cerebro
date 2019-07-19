mirar debug.md

https://www.endpoint.com/blog/2012/06/30/logstatement-postgres-all-full-logging
Artículo en favor de tener siempre log_statement='all'.
Escribir los logs a otro disco para no impactar en IO.
O enviarlos por rsyslog a otro lado.
Cuidado si el logging collector no da a basto y bloquea a la base de datos (leer más abajo sobre logging collector)

Por defecto se envían los logs a stderr (si tenemos systemd, los captura journald).

log_destination = stderr
  entiendo que con systemd, poner stderr o syslog no cambia mucho (en ambos casos llegan a journald)

CUIDADO! Configurado con stderr y systemd al reiniciar systemd-journald se perdió el socket por el que postgres enviaba los logs.
Lo pude ver con sysdig:
sysdig proc.name=postmaster and fd.num=2
1723250 06:09:06.563304790 4 postmaster (9716) < write res=-32(EPIPE) data=2019-07-19 08:09:06 CEST LOG:  parameter "log_destination" changed to "stderr".
Ese error EPIPE indica que la otra parte del socket ha dejado de escuchar.

Un reload, con la misma config, no lo arregla.
Lo he podido solventar cambiando el log_destination a syslog



Si queremos enviarlo a fichero deberemos configurar:
logging_collector = on  # (change requires restart)
log_directory = 'pg_log'  # Enviar logs a otro disco distinto para evitar problemas de performance?
log_filename = 'postgresql-%a.log'

The logging collector is designed to never lose messages. This means that in case of extremely high load, server processes could be blocked while trying to send additional log messages when the collector has fallen behind. In contrast, syslog prefers to drop messages if it cannot write them, which means it may fail to log some messages in such cases but it will not block the rest of the system.



Tenemos también parámetros para los permisos y rotado:
log_file_mode = 0600
log_truncate_on_rotation = on
log_rotation_age = 1d
log_rotation_size = 0
log_line_prefix = '%m '

Si sacamos por syslog:
syslog_ident = 'postgres'
syslog_sequence_numbers = on
syslog_split_messages = on



Mensajes en ingles:
lc_messages = 'en_US.UTF-8'
lc_monetary = 'en_US.UTF-8'
lc_numeric = 'en_US.UTF-8'
lc_time = 'en_US.UTF-8'


Enviar logs a otro disco distinto para evitar problemas de performance?


Ejemplo configurando rsyslog para enviar los logs a un fichero:
/etc/rsyslog.d/postgres.conf
:programname, isequal, "postmaster" -/var/lib/pgsql/9.6/data/pg_log/postgres.log
:programname, isequal, "postmaster" stop


Si queremos sacar el log usando log_destination=syslog
/etc/rsyslog.d/postgres.conf
template(name="PostgresMsg" type="list") {
     property(outname="msg" name="msg")
     constant(value="\n")
}
:programname, isequal, "postgres" -/var/log/postgres.log;PostgresMsg
:programname, isequal, "postgres" stop




CUIDADO! si tenemos journald puede que postgres se pase del rate de mensajes y journald los descarte.
Buscar mensajes tipo:
systemd-journal[5887]: Suppressed 50034 messages from /system.slice/postgresql-9.6.service
