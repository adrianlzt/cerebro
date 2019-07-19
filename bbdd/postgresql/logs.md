mirar debug.md

https://www.endpoint.com/blog/2012/06/30/logstatement-postgres-all-full-logging
Artículo en favor de tener siempre log_statement='all'.
Escribir los logs a otro disco para no impactar en IO.
O enviarlos por rsyslog a otro lado.
Cuidado si el logging collector no da a basto y bloquea a la base de datos (leer más abajo sobre logging collector)

Por defecto se envían los logs a stderr (si tenemos systemd, los captura journald).

log_destination = stderr
  entiendo que con systemd, poner stderr o syslog no cambia mucho (en ambos casos llegan a journald)


Si queremos enviarlo a fichero deberemos configurar:
logging_collector = on  # (change requires restart)
log_directory = 'pg_log'  # Enviar logs a otro disco distinto para evitar problemas de performance?
log_filename = 'postgresql-%a.log'

The logging collector is designed to never lose messages. This means that in case of extremely high load, server processes could be blocked while trying to send additional log messages when the collector has fallen behind. In contrast, syslog prefers to drop messages if it cannot write them, which means it may fail to log some messages in such cases but it will not block the rest of the system.



Tenemos también parámetros para los permisos y rotado:
log_file_mode = 0600
log_truncate_on_rotation = on+
log_rotation_age = 1d
log_rotation_size = 0


Mensajes en ingles:
lc_messages = 'en_US.UTF-8'
lc_monetary = 'en_US.UTF-8'
lc_numeric = 'en_US.UTF-8'
lc_time = 'en_US.UTF-8'



Ejemplo configurando rsyslog para enviar los logs a un fichero:
/etc/rsyslog.d/postgres.conf
:programname, isequal, "postmaster" -/var/lib/pgsql/9.6/data/pg_log/postgres.log
:programname, isequal, "postmaster" stop

Enviar logs a otro disco distinto para evitar problemas de performance?


CUIDADO! si tenemos journald puede que postgres se pase del rate de mensajes y journald los descarte.
Buscar mensajes tipo:
systemd-journal[5887]: Suppressed 50034 messages from /system.slice/postgresql-9.6.service
