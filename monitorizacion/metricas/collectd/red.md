La documentación de cada plugin se encuentra en la man: http://collectd.org/documentation/manpages/collectd.conf.5.shtml

tcpconns
The TCPConns plugin counts the number of TCP connections to or from a specified port
https://collectd.org/wiki/index.php/Plugin:TCPConns
http://collectd.org/documentation/manpages/collectd.conf.5.shtml#plugin_tcpconns
Nos muestra el estado (LISTEN, CLOSING, TIME_WAIT, etc) de las conexiones a/o desde un puerto.

ethstat
The ethstat plugin collects information about network interface cards (NICs) by talking directly with the underlying kernel driver using ioctl(2)
http://collectd.org/documentation/manpages/collectd.conf.5.shtml#plugin_ethstat
Parece que en la versión 5.1.0 hay un bug, solucionado en 5.1.1 y 5.2.0

interface
The Interface plugin collects information about the traffic (octets per second), packets per second and errors of interfaces (of course number of errors during one second)
https://collectd.org/wiki/index.php/Plugin:Interface
http://collectd.org/documentation/manpages/collectd.conf.5.shtml#plugin_interface
Se puede seleccionar que interfaces. O elegir todas y excluir algunas.

network
http://collectd.org/documentation/manpages/collectd.conf.5.shtml#plugin_network
Este plugin no es para recolectar estadísticas. Sirve para comunicar instancias de collectd entre sí.

ping
The Ping plugin measures network latency using ICMP “echo requests”, usually known as “ping”. Network latency is measured as a round-trip time.
http://collectd.org/documentation/manpages/collectd.conf.5.shtml#plugin_ping
No viene compilado en el rpm de repoforge. Hago un rebuild para añadirlo
