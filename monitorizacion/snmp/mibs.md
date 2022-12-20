http://www.circitor.fr/
  esta funciona bien

http://oidref.com/
  la navegación de esta muy bien, pero con un fortinet no me listaba justo la tabla que necesitaba (1.3.6.1.4.1.12356.101.3.2.1.1.5)
  aquí si se ven: http://www.circitor.fr/Mibs/Html/F/FORTINET-FORTIGATE-MIB.php#fgVdEntCpuUsage

http://www.oid-info.com/
http://www.net-snmp.org/wiki/index.php/TUT:Using_and_loading_MIBS


# OID, Object Identifier Registry

The Internet OID is 1.3.6.1
http://www.alvestrand.no/objectid/1.3.6.1.html

SNMPv2-MIB::sysDescr.0
SNMPv2-MIB::sysDescr.0 = STRING: Ethernet Routing Switch

Convierte un OID en su nombre (-m all para usar todas las mibs del sistema)
$ snmptranslate -m all .1.3.6.1.2.1.1.1.0
SNMPv2-MIB::sysDescr.0

$ snmptranslate -On SNMPv2-MIB::sysDescr.0
.1.3.6.1.2.1.1.1.0

$ snmptranslate -Td .1.3.6.1.2.1.1.1.0
Descripción del OID

Ver directorio donde están las mibs (mirar más abajo para como mostrar otras mibs):
snmptranslate -Dinit_mib .1.3 2>&1 |grep MIBDIR
o
net-snmp-config --default-mibdirs

Tenemos que poner los ficheros .mib directamente en ese directorio.


Lista de nombre y numero (-m all hace que se carguen todas las MIBS):
snmptranslate -m all -Tz -On

Si no ponemos "-m all" solo se cargan ciertas MIBS.
Para ver cuales: snmptranslate -M . .1


Leer un fichero MIB:
snmptranslate -Tz -m ./Sentry3.mib



Para convertir los MIBS numéricos, a nombres, en debían, instalamos snmp-mibs-downloader, y comentamos la línea “mibs :” en /etc/snmp/snmp.conf
Por defecto solo baja las mibs "rfc ianarfc iana"
Si queremos que baje más meterlas en /etc/snmp-mibs-downloader/snmp-mibs-downloader.conf AUTOLOAD=
Y ejecutar "download-mibs"

Parece que falla con las de cisco.
Cambiar el fichero /etc/snmp-mibs-downloader/cisco.conf:
HOST=ftp://ftp.netbsd.org
ARCHIVE=v2.tar.gz
ARCHTYPE=tgz
ARCHDIR=auto/mibs/v2
DIR=pub/pkgsrc/distfiles/cisco-mibs/
CONF=ciscolist
DEST=cisco


Directorios donde hay MIBS: /usr/share/mibs/netsnmp /var/lib/mibs /var/lib/snmp/mibs

Analizando donde busca snmptranslate las mibs
strace -fs 200 -e file snmptranslate .1 |& grep mib | cut -d '"' -f 2 | xargs file | grep -v -e "ASCII text" -e "Par archive"
/root/.snmp/mibs
/usr/share/mibs/iana
/usr/share/mibs/ietf
/usr/share/mibs/netsnmp
/usr/share/mibs/site
/usr/share/snmp/mibs
/usr/share/snmp/mibs/iana
/usr/share/snmp/mibs/ietf

/root/.snmp/mibs:/usr/share/mibs/iana:/usr/share/mibs/ietf:/usr/share/mibs/netsnmp:/usr/share/mibs/site:/usr/share/snmp/mibs:/usr/share/snmp/mibs/iana:/usr/share/snmp/mibs/ietf:/var/lib/snmp/mibs/cisco:/var/lib/snmp/mibs/iana:/var/lib/snmp/mibs/ietf

Listado de MIBS
snmptranslate -Dinit_mib .1.3 2>&1 |grep MIBDIR | cut -d "'" -f 2 | tr ':' ' ' | xargs ls



# Crear una mib
https://netbeez.net/blog/snmp/
