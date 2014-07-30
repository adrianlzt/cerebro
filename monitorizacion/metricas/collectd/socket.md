http://collectd.org/documentation/manpages/collectd-unixsock.5.shtml

Unix socket para preguntar a collectd por valores.

socket.conf
LoadPlugin unixsock
<Plugin unixsock>
  SocketFile "/var/run/collectd.sock"
  SocketGroup "root"
  SocketPerms "0770"
</Plugin>


Ver que datos tenemos:
nc -U /var/run/collectd.sock <<< "LISTVAL"

Leer valor:
nc -U /var/run/collectd.sock <<< "GETVAL cliente/load/load" 

Poner valor:
echo "PUTVAL testhost/interface/if_octets-test0 interval=10 1179574444:123:456" | nc -U /var/run/collectd.sock

Enviar notificación (capturada por NotificationExec):
echo 'PUTNOTIF type=temperature severity=warning time=1201094702 message="The cosa mala on fire"' | nc -U /var/run/collectd.sock
