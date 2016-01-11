NRPE nos vale para ejcutar checks localmente en el servidor a monitorizar.

El nodo Icinga/Nagios ejecuta: check_nrpe -H HOSTNAME/IP -c COMANDO
En el nodo cliente estará corriendo el demonio nrpe, escuchando en el puerto 5666/TCP.

El fichero de configuración de nrpe está por defecto (RHEL) en /etc/nagios/nrpe.cfg
La buena práctica será hacer un include del directorio /etc/nrpe.d y en ese directorio generar los ficheros de configuración.
Ejemplo:
command[check_disk]=/usr/lib64/nagios/plugins/check_disk -w 20% -c 10% 

Se pueden usar comillas de ejecucción:
command[check_disk]=/usr/lib64/nagios/plugins/check_disk -w 20% -c 10% -XYZ `hostname`


Cuando el nodo Icinga ejecute el check_nrpe, el usuario nrpe (por defecto, se define en nrpe.cfg) ejecutará el comando asociado en el servidor, y devolverá la salida del comando al nodo icinga.

Si definimos dos veces el mismo comando nrpe no protestará. No queda muy claro que check ejecutará (no parece que lea en orden alfabético)

Es necesario reiniciar el servicio nrpe tras los cambios de configuración.


Para compilar nrpe en Ubuntu tuve que instalar el paquete libssl-dev y hacer el configure:
./configure --with-ssl-lib=/usr/lib/x86_64-linux-gnu/


Ejecutar todos los comandos de nrpe, si tenemos un comando por fichero:
cd /etc/nrpe.d
for i in `ls`; do echo $i; $(cat $i| cut -d "=" -f 2); echo "" ; done




NRPE tiene un límite de datos que acepta de un plugin:
http://docs.icinga.org/latest/en/nrpe.html

Por defecto el output que acepta nrpe es de 1024 caracteres.
Si queremos incrementarlo tendremos que recompilar el demonio nrpe y el plugin check_nrpe.
Lo haremos modifando el fichero nrpe-2.14/include/common.h
Pondremos por ejemplo
#define MAX_INPUT_BUFFER        4096
#define MAX_PACKETBUFFER_LENGTH 2048

Y recompilaremos el .src.rpm que nos generará los dos nuevos rpms (nrpe y nagios-plugins-nrpe)

Hay que tener cuidado porque distintas versiones de nrpe recompilados no son compatibles entre sí.
Solucion?
http://comments.gmane.org/gmane.network.nagios.devel/8291
http://www.opsview.com/whats-new/blog/enhancing-nrpe-large-output
https://web.archive.org/web/20120309192252/http://labs.opsview.com/2008/08/enhancing-nrpe-for-large-output

Note: during testing, we found that the limit for returned data from some linux kernels was 4K, even though nrpe was coded with 16K as the limit. This is due to kernel limitations in using pipe() for the interprocess communication."


# Ejecucción de una subshell
con comillas de ejecucción
command[check_tcp_riak_8087]=/usr/lib64/nagios/plugins/check_tcp -H `ip -4 -o addr show eth2|awk '{print $$4}'|cut -f1 -d/` -p 8087 -4

# Escapar dolar
Se debe usar doble dolar ($$)
command[check_tcp_riak_8087]=/usr/lib64/nagios/plugins/check_tcp -H `ip -4 -o addr show eth2|awk '{print $$4}'|cut -f1 -d/` -p 8087 -4


# Troubleshooting
== NRPE ==
Fallos típicos que pueden provocar que no funcione un check por NRPE
*Comprobar que el demonio NRPE se está ejecutando (service nrpe status)
*Reiniciar el servicio NRPE para que cargue la nueva configuración (service nrpe restart)
*Mirar si el usuario con el que corre el demonio NRPE (/etc/nagios/nrpe.cfg -> nrpe_user) tiene permisos para ejecutar los checks
*Ejecutar como usuario nrpe el comando que tenemos configurado en NRPE (plugins instalados?)
*El check debe devolver algo por stderr o stdout. Si no, dará el error NRPE: Unable to read output
*Desactivar (o configurar correctamente) SELinux (setenforce Permissive && vi /etc/sysconfig/selinux -> SELINUX=permissive). Puede producir el error NRPE: Unable to read output
*Mirar que las reglas de IPTables permiten el acceso al puerto 5666 por parte de los nagiosslave
*Comprobar que NRPE acepta conexiones de nuestros slaves (/etc/nagios/nrpe.cfg -> allowed_hosts)
**Un error que puede producir tener mal configurado esto: CHECK_NRPE: Error - Could not complete SSL handshake.
**Puede producirse por tener mal configurada la interfaz de acceso para Nrpe - Could not complete SSL handshake.
**O también: CHECK_NRPE: Received 0 bytes from daemon.  Check the remote server logs for error messages.
*Comprobar que existe el comando en la configuración de NRPE (/etc/nrpe.d/*.cfg)
**Nos debería dar el error: Command 'check_disk' not defined
**Si se están pasando parámetros por NRPE (no recomendable por seguridad), y el comando no está definido, nos dará el error: CHECK_NRPE: Received 0 bytes from daemon. Check the remote server logs for error messages.
*Comprobar que existe el script. Puede producir el error ''NRPE: Unable to read output''
*Si es necesario definir variables de entorno, hacerlo en /etc/sysconfig/nrpe
*Comprobar que tiene activado el SSL:
**Sin SSL check_nrpe nos devolverá ''CHECK_NRPE: Socket timeout after 10 seconds.''
**Para probar sin SSL: check_nrpe -n -H <ip>
*Error con chequeo Oracle:
''CRITICAL - cannot connect to (DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=haprodb-scan)(PORT=1521))(CONNECT_DATA=(SID=hhproes1)(SERVICE_NAME=hhproes.privateext.dsn.inet))). install_driver(Oracle) failed: Can't load '/usr/lib64/perl5/vendor_perl/auto/DBD/Oracle/Oracle.so' for module DBD::Oracle: libocci.so.11.1: cannot open shared object file: No such file or directory at /usr/lib64/perl5/DynaLoader.pm line 200.''

Meter en el /etc/sysconfig/nrpe:

 export ORACLE_HOME=/usr/lib/oracle/11.2/client64
 export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$ORACLE_HOME/lib
 export PATH=$ORACLE_HOME/bin:$PATH
 export ORACLE_SID=hhproes

*Error con chequeo jmx:
[aarbaizar@ESJC-DSMM-MS03S ~]$ /usr/lib64/nagios/plugins/check_nrpe -H 172.3.2.2 -c check_jmx_memoria
NRPE: Unable to read output

Meter en el /etc/sysconfig/nrpe (Versión de Java que queremos que ejecute):

 PATH=/usr/java/latest/bin:/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

*Error Connection refused by host
El problema es que estará mal configurado el server_address en /etc/nagios/nrpe.cfg

== NRPE WINDOWS ==

*CHECK_NRPE: Error - Could not complete SSL handshake.
Este error se produce al no añadir en el cliente el allowed_host necesario.
*CHECK_NRPE: Socket timeout after 10 seconds.
Este error se produce al no tener el servicio NRPE corriendo en el cliente o que no tiene activado SSL=1 en el fichero de configuración del nsclient.ini
