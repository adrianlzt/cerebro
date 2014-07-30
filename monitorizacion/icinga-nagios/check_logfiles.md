http://labs.consol.de/lang/en/nagios/check_logfiles/

Ejemplo de uso:
[root@localhost libexec]# touch file.log
[root@localhost libexec]# ./check_logfiles --logfile=/usr/local/nagios/libexec/file.log --criticalpattern=ERROR
OK - no errors or warnings|default_lines=0 default_warnings=0 default_criticals=0 default_unknowns=0
[root@localhost libexec]# echo "blabla ERROR blabla" >> file.log 
[root@localhost libexec]# ./check_logfiles --logfile=/usr/local/nagios/libexec/file.log --criticalpattern=ERROR
CRITICAL - (1 errors in check_logfiles.protocol-2013-06-25-08-49-20) - blabla ERROR blabla |default_lines=1 default_warnings=0 default_criticals=1 default_unknowns=0


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
