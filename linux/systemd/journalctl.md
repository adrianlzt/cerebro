<https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs>

Captura logs de:

- kernel log messages
- Simple system log messages, via the libc syslog(3) call
- Structured system log messages via the native Journal API, see sd_journal_print(4)
- Standard output and standard error of system services
- Audit records, via the audit subsystem
  Almacen binario de logs
  Indexado.
  Salida formateada:
- errores en rojo
- warnings en negrita
  Por defecto journal no es persistente (se escribe en /run/log/journald/MACHINEID)

MACHINEID es el valor de /etc/machine-id

# Configuracion

/etc/systemd/journald.conf

Si existe el directorio /var/log/journal/, se creará almacenamiento persistente, usando el directorio con el nombre del MACHINEID (en este caso no se usará /run/log/journal)

journalctl -f
como tail -f a los syslog

journalctl -n [X]
mostrar X ultimas lineas.
si no ponemos nada, muestra las 10 ultimas

# Boots

journalctl --list-boots
mostrar los arranques de la máquina

journalctl -b
mostrar logs desde el arranque
journalctl -b -1
logs del anterior arranque
journalctl -b ID
poner el ID que nos dio el --list-boots

# Filtros

## Fechas

--since=
--until=

journalctl --since "2015-01-10" --until "2015-01-11 03:00"
journalctl --since 09:00 --until "1 hour ago"

Date specifications should be of the format "2012-10-30 18:17:16".
If the time part is omitted, "00:00:00" is assumed.
If only the seconds component is omitted, ":00" is assumed.
If the date component is omitted, the current day is assumed.
yesterday, today, tomorrow

## Unidad

journalctl -u UNIDAD
muestra solo los logs de una unidad
-o verbose
muestra toda la información, pid, priority, hostname, code, etc
journalctl -u nginx.service -u php-fpm.service --since today

## Proceso / Exec

journalctl \_PID=8088

journalctl /usr/bin/bash
mostrar todas las trazas generadas por ese binario

Filtrar por el nombre que pone despues del host:
jun 10 09:36:04 archer nm-dispatcher[14263]: req:3 'up' [tun1]: new request (2 scripts)

journalctl -fn 100 \_COMM=nm-dispatcher
sacar las ultimas 100 lineas y seguir

## User / Group

journalctl \_UID=33 --since today

## Mensajes de kernel

journalctl -k
journalctl --dmesg

## Priority

journalctl -p err
journalctl -p warning..err
journalctl -p err..err

0: emerg
1: alert
2: crit
3: err
4: warning
5: notice
6: info
7: debug

## Más filtros

man systemd.journal-fields

Ver que grupos están usando journal
journalctl -F \_GID

# Output

Por defecto saca el output contra less
Si vemos lineas truncadas podemos movernos con las flechas de izquierda y derecha
Si no queremos pager: --no-pager

journalctl -a
saca todo, hasta caracteres no printables

journalctl -o json
journalctl -o json-pretty
sacar logs en json en una linea, o con cambios de lineas y tabulado

Tipos de output:
cat: Displays only the message field itself.
export: A binary format suitable for transferring or backing up.
json: Standard JSON with one entry per line.
json-pretty: JSON formatted for better human-readability
json-sse: JSON formatted output wrapped to make add server-sent event compatible
short: The default syslog style output
short-iso: The default format augmented to show ISO 8601 wallclock timestamps.
short-monotonic: The default format with monotonic timestamps.
short-precise: The default format with microsecond precision
verbose: Shows every journal field available for the entry, including those usually hidden internally.

# Storage / max sizes

journalctl --disk-usage
uso del disco
va creciendo en bloques de 8M

Journald automáticamente cuando supera un treshold

journalctl --vacuum-time=04222015
borrar ficheros más antiguos de 22/4/2015
journalctl --vacuum-time=1years
quedarnos con logs del ultimo año
journalctl --vacuum-size=1G
borrar logs hasta que solo ocupemos 1GB

Limitar el tamaño, /etc/systemd/journald.conf
System*para cuando se usa /var/log/journal (fs persistente)
Runtime* para cuando se usa /run/log/journal (memoria)

*MaxUse= espacio máximo usado por los ficheros de journal en total (default 10% del filesystem)
*KeepFree= espacio libre que debe dejarse en la partición, usando el available (se usará el más restrictivo entre este y el *MaxUse. Default 15%)
*MaxFileSize= tamaño máximo de un fichero de journal antes de rotarlo
Hay un límite máximo de 4GB
Specify values in bytes or use K, M, G, T, P, E

El límite se calculará en el arranque de journald, teniendo en cuenta el espacio libre en /run (que se crea con la mitad del tamaño de la memoria).
Si reiniciamos journald, tendrá en cuenta el espacio dispoible en ese momento (para el KeepFree)

Si queremos mirar que límites tiene podemos buscar su mensaje de arranque:
systemctl status systemd-journald.service
journalctl -u systemd-journald.service

SIGUSR1: obligar a journald a flushear hacia /var/log/journal (por ejemplo, si acabamos de montar /var)
SIGUSR2: obligar a un rotado de ficheros

SyncIntervalSec=5m, timeout antes de sincronizar los journals files al disco. Si un mensaje es CRIT, ALERT o EMERG la sincronización es inmediata

# Limites

Valores por defecto
RateLimitInterval=30s
RateLimitBurst=1000

Poner los dos a 0 para quitar el límite.
Si estamos usando por detrás rsyslog, mirar si también queremos quitar los límites de este.

Reinicio necesario si cambiamos los parámetros:
systemctl restart systemd-journald

Esto quiere decir que si se reciben más de 1000 mensajes, de un mismo servicio, en menos de 30", se escribará un mensaje de mensajes duplicados y se descartarán el resto.
Mensaje de ejemplo:
Oct 02 03:17:11 app6 systemd-journal[565]: Suppressed 25193 messages from /system.slice/docker.service

Podemos filtrar estos mensajes con:
journalctl -u systemd-journald

# Escribir al journald

systemd-cat -t MIAPP -p 3 echo "pepe"
echo "coso" | systemd-cat -t MIAPP -p 3

Con journalctl veremos:
jul 20 11:27:18 archer MIAPP[1234]: pepe

Podemos filtrar con -t MIAPP

Con -t estamos filtrando por el campo SYSLOG_IDENTIFIER

# Cursor

journalctl -n 5 --show-cursor
saca al final una línea con el cursor

Luego podemos pedir el log a partir de este punto:
journalctl -c "s=acde4146521c446880060487b61d044e;i=13c5c;b=a7be29acb68644c6a7e9ed471c97df79;m=376cd5dce;t=53f0f67c9d68d;x=7dab3c47de31848d"

# Permitir ejecutar a no root

gpasswd -a USER systemd-journal

# Leer del journal

Los grupos adm y wheel tienen permisos de lectura sobre /var/log/journal/ y /run/log/journal
En caso de no tenerlo podemos ponerlo asi:
setfacl -Rnm g:wheel:rx,d:g:wheel:rx,g:adm:rx,d:g:adm:rx /var/log/journal/

# Leer de un directorio no estandar

Por ejemplo, si nos queremos traer los ficheros binarios de un disco de un OS que no funciona y queremos ver los logs.
journalctl -D path/journal -n 10
