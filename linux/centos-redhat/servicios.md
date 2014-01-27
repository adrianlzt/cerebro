system-config-services
service <nombre> start/stop/restart/status
chkconfig --add/del /path/script
chkconfig --level 3 sssd off
chkconfig <nombreServicio> on/off
chkconfig --list sssd

Los servicios se instalan en /etc/rc.d/init.d
/etc/init.d es un enlace a /etc/rc.d/init.d
