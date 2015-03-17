http://www.pool.ntp.org/es/zone/es

ntpdate 1.es.pool.ntp.org

ntpdate program is to be retired 


Usar ntpd:
/etc/ntp.conf
server 1.1.1.1
server 2.2.2.2


chkconfig ntpd on
service ntpd start


Comprobar que el servidor ya está en proceso de sincronización ejecutando la siguiente sentencia:
ntpq -n -c pe

Pueden suceder dos cosas:
El servidor ha alcanzado las referencias de tiempo y está sincronizando. Todo bien.
El servidor está en fase de inicialización o no llega (columna reach con valor de cero). El motivo puede ser que la máquina no llega al servidor de hora. En ese caso, comprobar en primer que el tráfico no está cortado en el servidor mediante algún tipo de firewall (iptables)
