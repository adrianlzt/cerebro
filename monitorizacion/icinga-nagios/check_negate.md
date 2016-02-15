./negate 
Usage:
negate [-t timeout] [-Towcu STATE] [-s] <definition of wrapped plugin>

Podemos convertir un estado CRITICAL a WARNING

negate /usr/local/nagios/libexec/check_ping -H host
  Run check_ping and invert result. Must use full path to plugin

negate -w OK -c UNKNOWN /usr/local/nagios/libexec/check_procs -a 'vi negate.c'
  This will return OK instead of WARNING and UNKNOWN instead of CRITICAL


/usr/lib64/nagios/plugins/check_uptime.pl -f -w 25 -c 999999; echo $?
CRITICAL: Linux pepe 3.10.0-327.4.4.el7.x86_64 - up 17 days 23 hours 45 minutes | type=1 uptime_minutes=25905.15
2

/usr/lib64/nagios/plugins/negate -c WARNING /usr/lib64/nagios/plugins/check_uptime.pl -f -w 25 -c 999999; echo $?
CRITICAL: Linux esah-ostt-uc01p 3.10.0-327.4.4.el7.x86_64 - up 17 days 23 hours 45 minutes | type=1 uptime_minutes=25905.5
1

Con -s tambien cambia la palabra:
/usr/lib64/nagios/plugins/negate -s -c WARNING /usr/lib64/nagios/plugins/check_uptime.pl -f -w 25 -c 999999; echo $?
WARNING: Linux esah-ostt-uc01p 3.10.0-327.4.4.el7.x86_64 - up 17 days 23 hours 45 minutes | type=1 uptime_minutes=25905.9833333333
1
