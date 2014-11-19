Usar la interfaz clasica de icinga1:

yum install icinga-gui icinga2-classicui-confi
Instala:
/etc/httpd/conf.d/icinga.conf
/etc/icinga
/etc/icinga/cgi.cfg
/etc/icinga/passwd

El fichero cgi.conf tendrá las configuraciones para apuntar a icinga2

Requisitos:
ln -s /etc/icinga2/features-available/statusdata.conf /etc/icinga2/features-enabled/
ln -s /etc/icinga2/features-available/compatlog.conf /etc/icinga2/features-enabled/
ln -s /etc/icinga2/features-available/command.conf /etc/icinga2/features-enabled/

Habilitar apache para que pueda escribir en el socket de los comandos:
usermod -a -G icingacmd apache

chkconfig httpd on
service httpd start
service icinga2 restart
