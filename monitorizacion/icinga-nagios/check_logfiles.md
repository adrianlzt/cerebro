http://labs.consol.de/lang/en/nagios/check_logfiles/

Ejemplo de uso:
[root@localhost libexec]# touch file.log
[root@localhost libexec]# ./check_logfiles --logfile=/usr/local/nagios/libexec/file.log --criticalpattern=ERROR
OK - no errors or warnings|default_lines=0 default_warnings=0 default_criticals=0 default_unknowns=0
[root@localhost libexec]# echo "blabla ERROR blabla" >> file.log 
[root@localhost libexec]# ./check_logfiles --logfile=/usr/local/nagios/libexec/file.log --criticalpattern=ERROR
CRITICAL - (1 errors in check_logfiles.protocol-2013-06-25-08-49-20) - blabla ERROR blabla |default_lines=1 default_warnings=0 default_criticals=1 default_unknowns=0

Para hacer test:
mkdir tmp/
touch log
/usr/lib64/nagios/plugins/check_logfiles.pl --seekfilesdir=tmp/ --protocolsdir=tmp/ --logfile=log --criticalpattern="error" --sticky=30

Varios check patterns:
--warningpattern='WARN|PEPE'

Para poner ignore case:
--nocase

Poner un critical con excepciones:
--criticalpattern="error" --criticalexception="\[[0-9]*\] (SERVICE|HOST) ALERT.*

Solo se puede definir una vez el criticalpattern
Solo se puede poner una vez los exception.


Por defecto mete los seek files en /var/tmp/check_logiles/check_logfiles._var_log_fichero.log.seek
Y los protocol (trazas por las que ha saltado el regex) en /tmp/check_logfiles.protocol-YYYY-MM-DD-HH-MM-SS
  Esto genera bastante fichero. Podemos hacer que no genere los protocol con --noprotocol (no poner como último parámetro, falla)

--sticky
  si lo ponemos, la alarma no se irá hasta que no borremos el fichero seek, o ejecutemos con --unstick
  se le puede poner un lifetime, tiempo que estará en critical hasta que ella sola vuelva a ok si no ha encontrado más trazas
  lo solemos usar cuando tenemos okpattern
--sticky=100
  mantiene la alarma 100s
--unstick
  volver a poner un log que estaba en critical o warning a ok

--nologfilenocry
  no da UNKOWN si el fichero de lo no está, da OK.


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


# Multilinea
https://labs.consol.de/nagios/check_logfiles/#comment-413

# Rotate
Ejemplo con los ficheros de message de centos

Tenemos que definir que tipo de rotado lleva (mirar rotation en http://labs.consol.de/lang/en/nagios/check_logfiles/)
Hay mas tipos de rotado que los que pone en la web: https://gist.github.com/adrianlzt/c654b7323903a9a9b982

Tambien podemos pasarle una expresión regular.
Por ejemplo, para los ficheros message, que son: message -> message-$(date +%Y%m%d) pondremos:
--rotation="messages-\d{8}"

Esto, si nota un cambio de inodo (creo), busca ficheros con el tipo que hayamos dicho (messages-YYYYMMDD) en busqueda del error.
No me queda muy claro como hace para no coger las alarmas de los archvies ya vistos.


CUIDADO! esto busca primero nombre.0 y linux parece que rota a nombre.1
rotation=loglog0log1gz
para delaycompress (nombre -> -> nombre.0 -> nombre.2.gz)

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


# Journald
https://github.com/lausser/check_logfiles/pull/15
https://github.com/lausser/check_logfiles/pull/22
Metido en version 3.8.0 (el filtrado por unit metido en version ¿?)

Tiene correr como root o que el usuario este en el grupo systemd-journal: gpasswd -a USER systemd-journal


check_logfiles.pl --type journald:unit=atomic-openshift-master-api --warningpattern='W[0-9]{4}' --criticalpattern='E[0-9]{4}|F[0-9]{4}'

check_logfiles.pl --type journald:unit=etcd,priority=err --warningpattern='.*'

check_logfiles.pl --type journald:unit=etcd,priority=err..err --warningpattern='.*'
  solo usa el nivel "err". Si solo ponemos uno pilla de ese nivel para niveles más importantes.

$ ./check_logfiles.pl --type journald --warningpattern session --tag sudo
OK - no errors or warnings|'default_lines'=5 'default_warnings'=0 'default_criticals'=0 'default_unknowns'=0
$ sudo id
uid=0(root) gid=0(root) grupos=0(root),1(bin),2(daemon),3(sys),4(adm),6(disk),10(wheel),19(log)
$ ./check_logfiles.pl --type journald --warningpattern session --tag sudo
WARNING - (2 warnings in check_logfiles.protocol-2017-04-22-15-50-47) - abr 22 15:50:45 archer sudo[1209]: pam_unix(sudo:session): session closed for user root ...|'default_lines'=4 'default_warnings'=2 'default_criticals'=0 'default_unknowns'=0



# Build
Ejemplo de .src.rpm http://repos.op5.com/centos/7/x86_64/monitor/7/SRPMS/monitor-plugin-check_logfiles-3.6.2.1.2-op5.1.el7.centos.src.rpm


docker run -v "$PWD:/mnt" --rm -it centos:7
yum install -y git
git clone https://github.com/lausser/check_logfiles.git
cd check_logfiles
yum group install "Development Tools" -y
aclocal && \
automake && \
autoconf && \
./configure && \
make && \
make install
cp /usr/local/nagios/libexec/check_logfiles /mnt
