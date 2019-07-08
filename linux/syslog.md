http://swift.siphos.be/linux_sea/logfilemanagement.html

syslog escucha en /dev/log
/dev/log es un socket donde cualquiera puede escribir

Escribiendo directamente al socket:
echo "<175>abcdefgh cosas y mas cosas" | socat unix-sendto:/dev/log STDIN
<175> es DEBUG y local5<F10>

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



## Enviar a un fichero
Enviar la facility local7, en cualquier nivel, al fichero /var/log/boot.log
local7.*                                                /var/log/boot.log

Si ponemos el fichero como "-/var/log/boot.log" quiere decir que no se haga la sincronización a disco en cada escritura.
Por defecto esa opción esta deshabilitada, pero esto lo fuerza aunque estuviese habilitada.

La opción parece bastante peligrosa para el disco:
File syncing capability is disabled by default. This feature is usually not required, not useful and an extreme performance hit
#$ActionFileEnableSync on


## filtrar por el program name
Es la string que se pasa a la syscall openlog()

/etc/rsyslog.d/puppet-master.conf
if $programname == 'puppet-master' then -/var/log/puppet/puppetmaster.log


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



## enviar a un comando
http://www.rsyslog.com/doc/omprog.html
Nos permite enviar el log a un programa determinado:
Tiene que venir compilado con la opción omprog?

Module (load="omprog")
*.* action(type="omprog"
           binary="/pathto/omprog.py --parm1=\"value 1\" --parm2=value2"
           template="RSYSLOG_TraditionalFileFormat")


## limitar rate de mensajes iguales
last message repeated N times
The rsyslog package has a $RepeatedMsgReduction global directive which one can set to off to always log data and never log those annoying messages.






# Enviar un mensaje a syslog
echo ‘<14>sourcehost message text’ | nc -v -u -w 0 localhost 514
