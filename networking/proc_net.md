http://www.onlamp.com/pub/a/linux/2000/11/16/LinuxAdmin.html
https://www.kernel.org/doc/Documentation/filesystems/proc.txt 1.4
/proc/net


## tcp ##
st: status  http://git.kernel.org/cgit/linux/kernel/git/torvalds/linux.git/tree/include/net/tcp_states.h?id=HEAD
  TCP_ESTABLISHED = 01,
  TCP_SYN_SENT = 02,
  TCP_SYN_RECV = 03,
  TCP_FIN_WAIT1 = 04,
  TCP_FIN_WAIT2 = 05,
  TCP_TIME_WAIT = 06,
  TCP_CLOSE = 07,
  TCP_CLOSE_WAIT = 08,
  TCP_LAST_ACK = 09,
  TCP_LISTEN = 0A,
  TCP_CLOSING, = 0B,	
  TCP_MAX_STATES = 0C,

local_address: ip local en hexadecimal little indian, junto con el puerto
rem_address: ip remota en hexadecimal little indian, junto con el puerto

Para convertir estas direcciones http://lists.netisland.net/archives/plug/plug-2009-03/msg00016.html:
echo "2601A8C0:EDF4" | awk '{t="echo \"ibase=16;" substr($1,7,2)"\" |bc";  t | getline a; close(t); t="echo \"ibase=16;" substr($1,5,2)"\" |bc"; t  | getline b; close(t); t="echo \"ibase=16;" substr($1,3,2)"\" |bc"; t  | getline c; close(t); t="echo \"ibase=16;" substr($1,1,2)"\" |bc"; t  | getline d; close(t); t="echo \"ibase=16;" substr($1,10,4)"\" |bc"; t  | getline e; close(t);printf("%d.%d.%d.%d:%d",a,b,c,d,e)}'


Número de conexiones tcp totales:
cat /proc/net/tcp | tail -n +2 | wc -l
cat /proc/net/tcp | tail -1 | cut -d ':' -f 1 | tr -d ' '

Número de conexiones en TIME_WAIT
cat /proc/net/tcp | grep " 06 " | wc -l


## Estado del interfaz ##
https://www.kernel.org/doc/Documentation/networking/operstates.txt
https://git.kernel.org/cgit/linux/kernel/git/stable/linux-stable.git/tree/net/core/net-sysfs.c?id=refs/tags/v2.6.32.63#n144

/sys/class/net/<iface>/operstate

Indicates the interface RFC2863 operational state as a string.
Possible values are:
"unknown", "notpresent", "down", "lowerlayerdown", "testing", "dormant", "up".
