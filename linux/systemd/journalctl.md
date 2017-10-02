https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs

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
Por defecto journal no es persistente (se escribe en /run/log/journald/MACHINEID

MACHINEID es el valor de /etc/machine-id


# Configuracion
/etc/systemd/journald.conf

Si existe el directorio /var/log/journal/, se creará almacenamiento persistente, usando el directorio con el nombre del MACHINEID


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
journalctl _PID=8088

journalctl /usr/bin/bash
  mostrar todas las trazas generadas por ese binario

Filtrar por el nombre que pone despues del host:
jun 10 09:36:04 archer nm-dispatcher[14263]: req:3 'up' [tun1]: new request (2 scripts)

journalctl -fn 100 _COMM=nm-dispatcher
  sacar las ultimas 100 lineas y seguir


## User / Group
journalctl _UID=33 --since today

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
journalctl -F _GID



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


# Storage
journalctl --disk-usage
  uso del disco

journalctl --vacuum-time=04222015
  borrar ficheros más antiguos de 22/4/2015
journalctl --vacuum-time=1years
  quedarnos con logs del ultimo año
journalctl --vacuum-size=1G
  borrar logs hasta que solo ocupemos 1GB

Limitar el tamaño, /etc/systemd/journald.conf
SystemMaxUse=: Specifies the maximum disk space that can be used by the journal in persistent storage.
SystemKeepFree=: Specifies the amount of space that the journal should leave free when adding journal entries to persistent storage.
SystemMaxFileSize=: Controls how large individual journal files can grow to in persistent storage before being rotated.
RuntimeMaxUse=: Specifies the maximum disk space that can be used in volatile storage (within the /run filesystem).
RuntimeKeepFree=: Specifies the amount of space to be set aside for other uses when writing data to volatile storage (within the /run filesystem).
RuntimeMaxFileSize=: Specifies the amount of space that an individual journal file can take up in volatile storage (within the /run filesystem) before being rotated.



# Escribir al journald
systemd-cat -t MIAPP -p 3 echo "pepe"
echo "coso" | systemd-cat -t MIAPP -p 3

Con journalctl veremos:
jul 20 11:27:18 archer MIAPP[1234]: pepe

Podemos filtrar con -t MIAPP


# Cursor
journalctl -n 5 --show-cursor
  saca al final una línea con el cursor

Luego podemos pedir el log a partir de este punto:
journalctl -c "s=acde4146521c446880060487b61d044e;i=13c5c;b=a7be29acb68644c6a7e9ed471c97df79;m=376cd5dce;t=53f0f67c9d68d;x=7dab3c47de31848d"



# Permitir ejecutar a no root
gpasswd -a USER systemd-journal
