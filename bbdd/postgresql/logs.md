https://www.postgresql.org/docs/12/logfile-maintenance.html
https://www.postgresql.org/docs/current/runtime-config-logging.html

mirar debug.md
mirar pgmetrics.md

https://github.com/kouber/pg_sqlog
para lanzar queries sobre los propios logs de postgres en formato csv

https://github.com/pierreforstmann/pg_log_statements
extensión que nos permite activar el logging de queries para ciertos PID.
También nos permite activarlo para ciertos users/ips/aplicaciones/dbs

https://www.endpoint.com/blog/2012/06/30/logstatement-postgres-all-full-logging
Artículo en favor de tener siempre log_statement='all'.
Escribir los logs a otro disco para no impactar en IO. Se puede probar a activar para ver como afecta al performance.
O enviarlos por rsyslog a otro lado.
Cuidado si el logging collector no da a basto y bloquea a la base de datos (leer más abajo sobre logging collector)
Se puede probar a activar para ver cuanto disco consume.
Tal vez mejor usar pgaudit para solo monitorizar ciertas operaciones/tablas.



Por defecto se envían los logs a stderr (si tenemos systemd, los captura journald).

log_destination = stderr
  entiendo que con systemd, poner stderr o syslog no cambia mucho (en ambos casos llegan a journald)

CUIDADO! Usar syslog + rsyslog genera un fichero donde se entrecruzan las líneas muy largas (la cabecera de la línea de log muesta el id y número de secuencia bien, pero la linea aparece sin fecha, ej.: [20989-18] 8405,391,1072693)
Parece que la única buena opción es usar el logging_collector (necesita reinicio)

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
https://postgresqlco.nf/en/doc/param/log_line_prefix/
Una opción:
"%m user=%u db=%d host=%r pid=%p sess=%c: "
  %m Time stamp with milliseconds
  %u User name
  %d Database name
  %r Remote host name or IP address, and remote port
  %p Process ID
  %c Session ID

Otra opción:
%h:%d:%u:%c %t
  %h Remote host name or IP address
  %t Time stamp without milliseconds

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



# CSV
https://www.postgresql.org/docs/current/runtime-config-logging.html#RUNTIME-CONFIG-LOGGING-CSVLOG

log_destination = 'csvlog'
logging_collector = on
log_directory = '/var/log/postgresql/'
log_filename = 'postgresql'
# Desactivamos el rotado y lo gestionamos con logrotate
log_rotation_age = 0
log_rotation_size = 0

/etc/logrotate.d/postgres
/var/log/postgresql/postgresql.csv {
  rotate 14
  daily
  compress
  maxsize 50M
  nodelaycompress
  create 0600 postgres postgres
  dateext
  # Con esto permitimos varios rotados en el mismo dia, sin que se pise el fichero
  dateformat -%Y-%m-%d-%H
  # Comando para decirle a postgres que cambie a un nuevo fichero
  postrotate
    sudo -u postgres /usr/pgsql-12/bin/pg_ctl logrotate -D /var/lib/pgsql/12/data
  endscript
}

Lo ejecutamos cada hora para poder rotar si llega al tamaño máximo:
/etc/cron.d/postgres
25 * * * * root /usr/sbin/logrotate --state=/var/lib/logrotate/postgres.status /etc/logrotate.d/postgres




Campos de las líneas:
1 - time stamp with milliseconds
2 - user name
3 - database name
4 - process ID
5 - client host:port number
6 - session ID
7 - per-session line number
8 - command tag
9 - session start time
10- virtual transaction ID
11- regular transaction ID
12- error severity
13- SQLSTATE code
14- error message
15- error message detail
16- hint
17- internal query that led to the error (if any)
18- character count of the error position therein
19- error context
20- user query that led to the error (if any and enabled by log_min_error_statement)
21- character count of the error position therein
22- location of the error in the PostgreSQL source code (if log_error_verbosity is set to verbose)
23- and application name


tail -n 10  postgresql.csv  | awk '{FPAT="([^,]*)|(\"[^\"]+\")" } { print "time="$1"\tuser="$2"\tdb="$3"\tPID="$4"\tclient="$5"\tSID="$6"\tSID-line="$7"\tcmd-tag="$8"\tsess-stime="$9"\tvTX="$10"\tTX="$11"\tseverity="$12"\tSQLSTATE="$13"\terror="$14"\terror-detail="$15"\thint="$16"\tinternal-query="$17"\tchr-count="$18"\terror-ctx="$19"\tquery="$20"\tchr-count="$21"\tsrc-code-error="$22"\tapp="$23}'

Formato tipo:
time=2020-03-10 12:09:56.338 CET        user="zabbix_server"    db="zabbix"     PID=12589       client="172.16.0.149:47742"     SID=5e677139.312d       SID-line=1      cmd-tag="idle"  sess-stime=2020-03-10 11:51:37 CET      vTX=28/0        TX=0    severity=FATAL  SQLSTATE=57P01  error="terminating connection due to administrator command"     error-detail="" hint=   internal-query= chr-count=      error-ctx=      query=  chr-count=      src-code-error= app=


## sqlog - csv fdw
Foreign data wrapper para poder consultar los logs desde el propio postgres
https://github.com/kouber/pg_sqlog

Para instalarlo:
cp pg_sqlog.control pg_sqlog--1.2.sql /usr/pgsql-12/share/extension

Para configurarlo en una db:
create schema sqlog;
create extension pg_sqlog schema sqlog cascade;

Parece que nos obliga a seguir su config. PR para mejorarlo?

/var/lib/pgsql/12/data/current_logfiles
aqui tenemos donde está el fichero de log (si tenemos stderr o csvlog)

Issue sobre poder gestionar otro esquema de nombrado y ficheros gzip
https://github.com/kouber/pg_sqlog/issues/1
