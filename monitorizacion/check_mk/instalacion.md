http://mathias-kettner.com/check_mk_download.html

(se da por hecho que icinga ya está instaldo)

Bajar: Complete tarball including all agents and MK Livestatus

tar zxvf *.tgz
cd check_mk*

yum install gcc-c++ mod_python httpd
usermod -a -G icingacmd apache
htpasswd -bc /etc/icinga/passwd icingaadmin icingaadmin

Si queremos evitar las preguntas de check_mk meteremos en
~/.check_mk_setup.conf
un fichero con las opciones.
Uno de ejemplo se encuentra en este directorio (check_mk_setup.conf)

./setup.sh --yes


Para una instalación con preguntas:
./setup.sh


Al terminar habrá dejado un par de ficheros de log (livestatus.log y mkeventd.log).
Tendremos ya el multisite configurado /etc/httpd/conf.d/zzz_check_mk.conf

service icinga restart
service httpd restart

/etc/check_mk/multisite.mk
  el user admin por defecto es nagiosadmin
  check_mk mete unas lineas al final de icinga.cfg para meter el livestatus
  # Load Livestatus Module
  broker_module=/usr/lib/check_mk/livestatus.o /var/spool/icinga/cmd/live
  event_broker_options=-1


  Creo que es equivalente (NEB = Nagios Event Broker) a poner el fichero /etc/icinga/modules/livestatus.cfg
  define module{
        module_name     mklivestatus
        module_type     neb
        path            /usr/lib/check_mk/livestatus.o
        args            /var/spool/icinga/cmd/live
  }

