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


## rsyslogd ##
http://www.rsyslog.com/doc/manual.html

http://www.rsyslog.com/doc/omprog.html
Nos permite enviar el log a un programa determinado:
Tiene que venir compilado con la opción omprog?

Module (load="omprog")
*.* action(type="omprog" 
           binary="/pathto/omprog.py --parm1=\"value 1\" --parm2=value2"
	   template="RSYSLOG_TraditionalFileFormat")


/etc/rsyslog.d/puppet-master.conf
if $programname == 'puppet-master' then -/var/log/puppet/puppetmaster.log



last message repeated N times
The rsyslog package has a $RepeatedMsgReduction global directive which one can set to off to always log data and never log those annoying messages.



# Enviar un mensaje a syslog
echo ‘<14>sourcehost message text’ | nc -v -u -w 0 localhost 514
