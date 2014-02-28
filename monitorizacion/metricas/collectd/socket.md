http://collectd.org/documentation/manpages/collectd-unixsock.5.shtml

Unix socket para preguntar a collectd por valores.

Ver que datos tenemos:
echo "LISTVAL" | nc -U /var/run/collectd.sock

echo "GETVAL cliente/load/load" | nc -U /var/run/collectd.sock
