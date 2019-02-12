# Chrony
Sustituto moderno de ntp

Comprobar como vamos de desfasados
chronyc tracking


Por defecto chrony va corrigiendo el tiempo modificando ligeramente la velocidad de los segundos para evitar saltos (que pueden afectar negativamente a cierto software).

Podemos poner esta configuración para hacer un salto grande en los tres primeros updates si el desfase es de mas de 1s
makestep 1.0 3



# NTP
http://www.pool.ntp.org/es/zone/es

ntpdate 1.es.pool.ntp.org

ntpdate program is to be retired 

Si esta corriendo ntpd podemos usar:
ntpdate -u server.com


Usar ntpd:
/etc/ntp.conf
server 1.1.1.1
server 2.2.2.2


chkconfig ntpd on
service ntpd start


Comprobar el estado
ntpstat

http://support.ntp.org/bin/view/Support/TroubleshootingNTP
Comprobar que el servidor ya está en proceso de sincronización ejecutando la siguiente sentencia:
ntpq -n -p
  -n, numeric host addresses

equivalente:
ntpq
> peers

Pueden suceder dos cosas:
El servidor ha alcanzado las referencias de tiempo y está sincronizando. Todo bien.
El servidor está en fase de inicialización o no llega (columna reach con valor de cero). El motivo puede ser que la máquina no llega al servidor de hora. En ese caso, comprobar en primer que el tráfico no está cortado en el servidor mediante algún tipo de firewall (iptables)

Campo "reach" de "ntpq -p".
Es un registro de como han ido las últimas 8 actualizaciones.
Es una representación octal: 377 = 11111111 (las últimas 8 actualizaciones han ido bien)
http://www.linuxjournal.com/article/6812



# Forzar update
systemctl stop ntpd
ntpdate 0.centos.pool.ntp.org
systemctl start ntpd



# Stratum / Uso como servidor
ntpdc -c sysinfo

El nivel de stratum es uno menos del que nos estamos conectando

Nivel 11 es que no esta bien sincronizada (se está sincronizando contra si misma)
