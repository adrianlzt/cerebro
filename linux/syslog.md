http://swift.siphos.be/linux_sea/logfilemanagement.html

syslog escucha en /dev/log
en sistemas con systemd, será el journal quien escucha ahi
  para systemd podemos escribir mensajes con systemd-cat
/dev/log es un socket donde cualquiera puede escribir

Comando para enviar a /dev/log
logger mensaje que queremos poner

Escribiendo directamente al socket:
echo "<175>abcdefgh cosas y mas cosas" | socat unix-sendto:/dev/log STDIN
<175> es DEBUG y local5<F10>

Si tenemos puerto abierto (normalmente syslog)
echo ‘<14>sourcehost message text’ | nc -v -u -w 0 localhost 514

La codificación para seleccionar level y facility:
facility | priority
Los códigos: http://cvsweb.netbsd.org/bsdweb.cgi/src/sys/sys/syslog.h?rev=1.27&content-type=text/x-cvsweb-markup

La codificación se hace en binario:
ffff flll

Ejemplo: debug (7) + local5(21<<3)
7 = 111
21 = 10101
21<<3 = 10101000

debug | local5 = 10101111 = 175


# rsyslogd
http://www.rsyslog.com/doc/manual.html

En la config de rsyslog se puede usar el formato antiguo de syslog (facility.level) o la configuración avanzada. La performance es la misma (dice la doc)
El formato antiguo es con selectors ejemplo:
  local2.error

El formato avanzado es con propiedades, siguiendo el formato:
:property, [!]compare-operation, "value"


## condicionales
https://www.rsyslog.com/doc/v8-stable/configuration/filters.html#examples
https://askubuntu.com/a/186642

:programname, isequal, "appname" /var/log/custom_app.log

Otra forma

if $msg contains 'error' then /var/log/errlog
if $syslogfacility-text == 'local0' and $msg startswith 'DEVNAME' and ($msg contains 'error1' or $msg contains 'error0') then /var/log/somelog

programname es la string que se pasa a la syscall openlog()
/etc/rsyslog.d/puppet-master.conf
if $programname == 'puppet-master' then -/var/log/puppet/puppetmaster.log



## Enviar a un fichero
Enviar la facility local7, en cualquier nivel, al fichero /var/log/boot.log
local7.*                                                /var/log/boot.log

Si ponemos el fichero como "-/var/log/boot.log" quiere decir que no se haga la sincronización a disco en cada escritura.
Por defecto esa opción esta deshabilitada, pero esto lo fuerza aunque estuviese habilitada.

La opción parece bastante peligrosa para el disco:
File syncing capability is disabled by default. This feature is usually not required, not useful and an extreme performance hit
#$ActionFileEnableSync on



## logrorate
Ejemplo de config (creo que para versiones nuevas se puede poner "reload" en vez del todo kill HUP etc):
/var/log/spooler
{
    missingok
    sharedscripts
    postrotate
        /bin/kill -HUP `cat /var/run/syslogd.pid 2> /dev/null` 2> /dev/null || true
    endscript
}


## formato especial para un log
https://www.rsyslog.com/doc/master/configuration/property_replacer.html#property-options
https://www.rsyslog.com/doc/v8-stable/configuration/templates.html

template(name="ZabbixTemplate" type="list") {
     constant(value=" ")
     property(name="procid")
     constant(value=":")
     property(name="timereported" dateFormat="year")
     property(name="timereported" dateFormat="month")
     property(name="timereported" dateFormat="day")
     constant(value=":")
     property(name="timereported" dateFormat="hour")
     property(name="timereported" dateFormat="minute")
     property(name="timereported" dateFormat="second")
     constant(value=".")
     property(name="timereported" dateFormat="subseconds")
     constant(value=" ")
     property(name="msg")
     constant(value="\n")
}
:programname, isequal, "zabbix_server" -/var/log/zabbix/zabbix_server.log;ZabbixTemplate

Se puede sacar en JSON, pero tengo que meter los "{}," a mano, porque no me los mete. Cosa de la versión?

template(name="ZabbixTemplate" type="list" option.jsonf="on") {
     constant(value="{")
     property(outname="proc" name="procid" format="jsonf")
     constant(value=",")
     property(outname="date" name="timereported" dateFormat="rfc3339" format="jsonf")
     constant(value=",")
     property(outname="msg" name="msg" format="jsonf")
     constant(value=",")
     property(outname="severity" name="syslogseverity" caseConversion="upper" format="jsonf" datatype="number")
     constant(value="}\n")
}



## enviar a un comando
http://www.rsyslog.com/doc/omprog.html
Nos permite enviar el log a un programa determinado:
Tiene que venir compilado con la opción omprog?

Module (load="omprog")
*.* action(type="omprog"
           binary="/pathto/omprog.py --parm1=\"value 1\" --parm2=value2"
           template="RSYSLOG_TraditionalFileFormat")


## rate limit
De los mensajes que vienen del journal:
$ModLoad imjournal
$imjournalRatelimitInterval 600
$imjournalRatelimitBurst 20000


## limitar rate de mensajes iguales
last message repeated N times
The rsyslog package has a $RepeatedMsgReduction global directive which one can set to off to always log data and never log those annoying messages.



# /dev/log desaparece
https://unix.stackexchange.com/a/317066

Parece que bajo ciertas casuísticas entre systemd y rsyslog /dev/log puede desaparecer.
Reiniciar el socket de journald y rsyslogd
systemctl restart systemd-journald.socket
systemctl start rsyslogd

Chequear:
file /dev/log
