Enviar el stdout de systemd a un fichero.

Para versiones nuevas de systemd (>=236):
StandardOutput=file:YOUR_ABSPATH_FILENAME
StandardError=file:YOUR_ABSPATH_FILENAME


Para versiones antiguas, redirigir a syslog y de ahí con una regla a un fichero:
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=<your program identifier> # without any quote

/etc/rsyslog.d/<new_file>.conf
if $programname == '<your program identifier>' then /path/to/log/file.log
