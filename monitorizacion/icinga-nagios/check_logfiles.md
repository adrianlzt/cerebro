http://labs.consol.de/lang/en/nagios/check_logfiles/

Ejemplo de uso:
[root@localhost libexec]# touch file.log
[root@localhost libexec]# ./check_logfiles --logfile=/usr/local/nagios/libexec/file.log --criticalpattern=ERROR
OK - no errors or warnings|default_lines=0 default_warnings=0 default_criticals=0 default_unknowns=0
[root@localhost libexec]# echo "blabla ERROR blabla" >> file.log 
[root@localhost libexec]# ./check_logfiles --logfile=/usr/local/nagios/libexec/file.log --criticalpattern=ERROR
CRITICAL - (1 errors in check_logfiles.protocol-2013-06-25-08-49-20) - blabla ERROR blabla |default_lines=1 default_warnings=0 default_criticals=1 default_unknowns=0

Varios check patterns:
--warningpattern=["WARN","PEPE"]


Ejemplo de uso con fichero de configuración:
[root@localhost libexec]# cat config.cfg 
@searches = (
  {
    tag => 'nombre',
    logfile => '/usr/local/nagios/libexec/error.log',
    criticalpatterns => [
        'ERROR',
    ],
  }
);

[root@localhost libexec]# ./check_logfiles -f config.cfg


Para usarlo con icinga/NRPE.
Deberemos definir el 'is_volatile' (http://nagios.sourceforge.net/docs/3_0/volatileservices.html)
define service {
  service_description   check_sanlogs
  host_name              oaschgeign.muc
  check_command       check_nrpe!check_logfiles
  is_volatile           1
  check_period          7x24
  max_check_attempts    1
  ...
}
 
define command {
  command_name          check_nrpe
  command_line          $USER1$/check_nrpe -H $HOSTADDRESS$ -c $ARG1$
}
 
command[check_logfiles]=/opt/nagios/libexec/check_logfiles --config logdefs.cfg


Cuando se ejecuta el check_logfiles se almacena información en /var/tmp/check_logfiles
Si la primera vez que se ejecuta se hace como root este directorio puede que no tenga permisos de escrita para otros usuarios, así que cuando nrpe intente ejecutar el check nos dirá:
cannot write status file /var/tmp/check_logfiles/...


Cuando se ejecuta el check por primera vez se genera un fichero en el directorio tmp.
En la primera ejecucción no se analiza el fichero.
Ejemplo: check_logfiles.messages.seek

$state = {
           'logfile' => 'messages',
           'logtime' => 0,
           'devino' => '2052:6688801', # dispositivo:inodo
           'runtime' => 1426154340,
           'serviceoutput' => '',
           'servicestateid' => 0,
           'tag' => 'default',
           'privatestate' => {
                               'logfile' => 'messages', # Nombre del fichero escaneado
                               'lastruntime' => 0, # 0 la primera vez, date +%s las siguientes ejecucciones
                               'runcount' => 1 # numero de veces que se ha ejecutado
                             },
           'logoffset' => 942570, # offset del fichero hasta donde se ha analizado
           'runcount' => 1 # numero de veces que se ha ejecutado 
         };


1;

Cada ejecucción mira el último trozo de log. Si hubo una ejecucción fallida y después no hay trazas erróneas, dara OK.

Cuando el check encuentra un error lo almacena en el dir de protocolsdir/ como
check_logfiles.protocol-2015-03-12-11-25-38
CRITICAL Errors in messages (tag default)
Mar  8 03:41:02 ESJC-DSMM-MS12S logrotate: ALERT exited abnormally with [1]


# Rotate
Ejemplo con los ficheros de message de centos

Tenemos que definir que tipo de rotado lleva (mirar rotation en http://labs.consol.de/lang/en/nagios/check_logfiles/)
Tambien podemos pasarle una expresión regular.
Por ejemplo, para los ficheros message, que son: message -> message-$(date +%Y%m%d) pondremos:
--rotation="messages-\d{8}"

Esto, si nota un cambio de inodo (creo), busca ficheros con el tipo que hayamos dicho (messages-YYYYMMDD) en busqueda del error.
No me queda muy claro como hace para no coger las alarmas de los archvies ya vistos.


rotation=loglog0log1gz
para delaycompress (nombre -> nombre.1 -> nombre.2.gz)

Ejemplo rotate para icinga:
check_logfiles.pl --logfile=icinga.log --criticalpattern="] Error:" --archivedir="archives" --rotation="icinga-\d{2}-\d{2}-\d{4}-\d{2}\.log"


$ echo "" > messages
$ ./check_logfiles.pl --seekfilesdir=tmp/seek --protocolsdir=tmp/proto/ --logfile=messages --criticalpattern="logrotate: ALERT" --rotation="messages-\d{8}"
OK - no errors or warnings|default_lines=0 default_warnings=0 default_criticals=0 default_unknowns=0

$ echo "Mar  8 03:41:02 ESJC-DSMM-MS12S logrotate: ALERT exited abnormally with [1]" >> messages
$ ./check_logfiles.pl --seekfilesdir=tmp/seek --protocolsdir=tmp/proto/ --logfile=messages --criticalpattern="logrotate: ALERT" --rotation="messages-\d{8}"
CRITICAL - (1 errors in check_logfiles.protocol-2015-03-12-11-28-50) - Mar  8 03:41:02 ESJC-DSMM-MS12S logrotate: ALERT exited abnormally with [1] |default_lines=1 default_warnings=0 default_criticals=1 default_unknowns=0

$ ./check_logfiles.pl --seekfilesdir=tmp/seek --protocolsdir=tmp/proto/ --logfile=messages --criticalpattern="logrotate: ALERT" --rotation="messages-\d{8}"
OK - no errors or warnings|default_lines=0 default_warnings=0 default_criticals=0 default_unknowns=0

$ echo "Mar  8 03:41:02 ESJC-DSMM-MS12S logrotate: ALERT exited abnormally with [1]" >> messages
$ mv messages messages-$(date +%Y%m%d)
$ echo "" > messages

$ ./check_logfiles.pl --seekfilesdir=tmp/seek --protocolsdir=tmp/proto/ --logfile=messages --criticalpattern="logrotate: ALERT" --rotation="messages-\d{8}"
CRITICAL - (1 errors in check_logfiles.protocol-2015-03-12-11-31-47) - Mar  8 03:41:02 ESJC-DSMM-MS12S logrotate: ALERT exited abnormally with [1] |default_lines=2 default_warnings=0 default_criticals=1 default_unknowns=0
