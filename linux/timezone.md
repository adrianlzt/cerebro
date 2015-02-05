Cambiar zona horaria en ubuntu:
sudo dpkg-reconfigure tzdata
service cron restart

Para ver nuestra zona horaria: cat /etc/timezone


# CentOS
rm -f /etc/localtime; ln -s /usr/share/zoneinfo/Europe/Madrid /etc/localtime 
