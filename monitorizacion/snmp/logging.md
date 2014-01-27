http://serverfault.com/questions/310640/reduce-snmpd-logging-verbosity
/etc/default/snmpd:
SNMPDOPTS='-Lsd -Lf /dev/null -u snmp -g snmp -I -smux -p /var/run/snmpd.pid'
lo cambiamos por:
SNMPDOPTS='-LSwd -Lf /dev/null -u snmp -g snmp -I -smux -p /var/run/snmpd.pid'
0 or ! for LOG_EMERG,
1 or a for LOG_ALERT,
2 or c for LOG_CRIT,
3 or e for LOG_ERR,
4 or w for LOG_WARNING,
5 or n for LOG_NOTICE,
6 or i for LOG_INFO, and
7 or d for LOG_DEBUG.
Which stands for:
S: syslog, priority comes next
w: (or 4) log only warnings and more relevant messages
d: use the LOG_DAEMON facility
